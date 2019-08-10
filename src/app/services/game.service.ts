import { Injectable, ComponentFactory, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { BeatComponent } from '../components/game/beat/beat.component';
import { Song } from '../shared/song/song.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { BeatsaverAPIService, DificultieJSONContainer } from './beatsaverAPI.service';
import { Difficulties } from '../shared/difficulty/difficulties.enum';

export interface Note {
  time: number,
  lineIndex: number,
  lineLayer: number,
  type: number,
  cutDirection: number
}
@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _currentSong: Song;
  private _currentDifficultie: Difficulties;
  private _componentReferenceList  = [];
  private _playerScored: BehaviorSubject<boolean>;
  private _gameStarted: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _indexOfTheBeatComponentToDestroy: BehaviorSubject<number>;
  private _beatContainer: ViewContainerRef;
  private _audio: HTMLAudioElement;
  public destroyedBeats: number = 0;
  public failedBeats: number = 0;
  public combo: number = 0;
  public score: number = 0;
  public multiplier: number = 1;
  
  constructor(private _resolver: ComponentFactoryResolver,
              private _beatsaverAPI: BeatsaverAPIService) { }

  setCurrentSong(song: Song) {
    this._currentSong = song;
  }

  getCurrentSong(): Song {
    return this._currentSong;
  }

  setCurrentDifficultie(dif: Difficulties) {
    this._currentDifficultie = dif;
  }

  getCurrentDifficultie(): Difficulties {
    return this._currentDifficultie;
  }

  gameStarted(): Observable<boolean> {
    return this._gameStarted.asObservable();
  }

  public set beatContainer(value: ViewContainerRef) {
    this._beatContainer = value;
  }

  getIfThePlayerScored(): Observable<boolean> {
    return this._playerScored.asObservable();
  }

  getIndexOfTheBeatComponentToDestroy(): Observable<number> {
    return this._indexOfTheBeatComponentToDestroy.asObservable();
  }

  playerScored(scored: boolean) {
    this._playerScored.next(scored);
  }

  destroyBeatComponent(index: number) {
    this._indexOfTheBeatComponentToDestroy.next(index);
  }

  private getBeats(dificultieJSON: DificultieJSONContainer): Array<ComponentFactory<BeatComponent>> {
    let arrayToReturn: Array<ComponentFactory<BeatComponent>> = new Array<ComponentFactory<BeatComponent>>();
    dificultieJSON.json._notes.forEach(() => {
      arrayToReturn.push(this._resolver.resolveComponentFactory(BeatComponent));
    });
    
    return arrayToReturn;
  }

  startBeatsCreation(dificultie: Difficulties, dificultieJSONContainerList: DificultieJSONContainer[], audio: HTMLAudioElement) {
    this._gameStarted.next(true);
    let dificultieJSON = dificultieJSONContainerList.find((difficultie)=>{
      return difficultie.dificulty === dificultie;
    });
    const beatList: Array<ComponentFactory<BeatComponent>> = this.getBeats(dificultieJSON);
    let index: number = 0;
    const notes = JSON.parse(JSON.stringify(dificultieJSON.json._notes));
    notes.sort((a, b) => {
      if (a !== undefined && b !== undefined && a._time > b._time) {
        return 1;
      } else if (a !== undefined && b !== undefined && a._time < b._time) {
        return -1;
      } else {
        return 0
      }
    });
    setInterval(()=> {
        const note0 = notes[0];
        const note1 = notes[1];
        const note2 = notes[2];
        const note3 = notes[3];
        if (beatList.length === 0) {
          return;
        }
        const time0  = this._calculateNoteTimeInSeconds(note0._time);
        const time1  = this._calculateNoteTimeInSeconds(note1._time);
        const time2  = this._calculateNoteTimeInSeconds(note2._time);
        const time3  = this._calculateNoteTimeInSeconds(note3._time);
        const audioCurrentTime = audio.currentTime;
        if (time0 <= audioCurrentTime) {
          this._instantiateBeatComponent(note0, beatList, index);
          notes.shift();
          index++;
          if (time1 <= audioCurrentTime) {
            this._instantiateBeatComponent(note1, beatList, index);
            notes.shift();
            index++;
            if (time2 <= audioCurrentTime) {
              this._instantiateBeatComponent(note2, beatList, index);
              notes.shift();
              index++;
              if (time3 <= audioCurrentTime) {
                this._instantiateBeatComponent(note3, beatList, index);
                notes.shift();
                index++;
              }
            }
          }
        }
    }, 50)
  }

  remove(index: number) {
    if (!this._beatContainer && this._beatContainer.length < 1)
        return;

    let componentRef = this._componentReferenceList.filter(x => x.instance.index == index)[0];

    let vcrIndex: number = this._beatContainer.indexOf(componentRef);

    // removing component from container
    this._beatContainer.remove(vcrIndex);

    this._componentReferenceList = this._componentReferenceList.filter(x => x.instance.index !== index);
  }

  public playTheSong(): Observable<void> {
    return new Observable(observer => {
      this._beatsaverAPI.getSongResources(this._currentSong).subscribe((resources) => {
        observer.next();
        this._audio = new Audio(resources.audioBlobUrl);
        this._audio.load();
        this._audio.play().then(() => {
          this.startBeatsCreation(this._currentDifficultie, resources.dificulties, this._audio);
        });
      });
    });
  }

  private _instantiateBeatComponent(note, beatList, index): void {
    const componentRef: ComponentRef<BeatComponent> = this._beatContainer.createComponent(beatList.pop());
    this._componentReferenceList.push(componentRef);
    componentRef.instance.beatPosition = { 
        horizontalPosition: note._lineIndex,
        verticalPosition: note._lineLayer
    };
    componentRef.instance.beatType = note._type;
    componentRef.instance.beatCutDirection = note._cutDirection;
    componentRef.instance.index = ++index;
    componentRef.instance.removeElement.subscribe((index)=> {
      this.remove(index);
    });
    componentRef.instance.playerScored.subscribe((scored: boolean) => {
      this._manageStats(scored);
      this._manageTheSoundOfScore(scored);
    });
  }

  private _calculateNoteTimeInSeconds(time: number) {
    const msPerBeat = 60 / this._currentSong.bpm;
    return time * msPerBeat;
  }

  private _manageTheSoundOfScore(playerScored: boolean) {
    if (playerScored) {
      this._audio = new Audio(`assets/sounds/hit2.ogg`);
      this._audio.load();
      this._audio.volume = 0.2;
      this._audio.play();
    }
  }

  private _manageStats(scored: boolean): void {
    if (scored) {
      this.destroyedBeats++;
      this.combo++;
      this._manageMultiplier(this.combo);
      this._manageScore(this.multiplier);
    } else {
      this.failedBeats++;
      this.combo = 0;
      this.multiplier = 1;
    }
  }

  private _manageMultiplier(combo: number) {
    switch (combo) {
      case 5:
        this.multiplier = 2;
      break;
      case 10:
        this.multiplier = 3;
      break;
      case 15:
        this.multiplier = 4;
      case 20:
          this.multiplier = 5;
      break;
      case 40:
        this.multiplier = 10;
      break;
      default:
        break;
    }
  }
  
  private _manageScore(multiplier: number): void {
    this.score += (multiplier * 100);
  }
}
