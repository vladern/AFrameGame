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
  private _componentReferenceList  = [];
  private _playerScored: BehaviorSubject<boolean>;
  private _indexOfTheBeatComponentToDestroy: BehaviorSubject<number>;
  private _beatContainer: ViewContainerRef;
  public destroyedBeats: number = 0;
  public failedBeats: number = 0;
  
  constructor(private _resolver: ComponentFactoryResolver,
              private _beatsaverAPI: BeatsaverAPIService) { }

  setCurrentSong(song: Song) {
    this._currentSong = song;
  }

  getCurrentSong(): Song {
    return this._currentSong;
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

  startBeatsCreation(dificultie: Difficulties, dificultieJSONContainerList: DificultieJSONContainer[]) {
    let dificultieJSON = dificultieJSONContainerList.find((difficultie)=>{
      return difficultie.dificulty === dificultie;
    });
    const beatList: Array<ComponentFactory<BeatComponent>> = this.getBeats(dificultieJSON);
    let time: number = 0;
    let index: number = 0;
    setInterval(()=> {
      dificultieJSON.json._notes.forEach(note => {
        if (beatList.length === 0) {
          return;
        }
        if (note._time === time) {
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
            this._manageScore(scored);
          });
          dificultieJSON.json._notes.shift();
        }
      });
      time++;
    }, 250)
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

  public playTheSong(dificultie: Difficulties): void {
    this._beatsaverAPI.getSongResources(this._currentSong).subscribe((resources) => {
      let audio = new Audio(resources.audioBlobUrl);
      audio.load();
      audio.play().then(()=>{
        this.startBeatsCreation(dificultie, resources.dificulties);
      })
    });
  }

  private _manageScore(scored: boolean): void {
    if (scored) {
      this.destroyedBeats++;
    } else {
      this.failedBeats++;
    }
  }
}