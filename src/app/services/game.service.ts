import { Injectable, ComponentFactory, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { BeatComponent } from '../components/game/beat/beat.component';
import { Song } from '../shared/song/song.model';
import { BehaviorSubject, Observable } from 'rxjs';

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
  
  constructor(private _resolver: ComponentFactoryResolver) { }

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

  notesMockList: Note[] = [
    {time:5,lineIndex:2,lineLayer:0,type:1,cutDirection:8},
    {time:5,lineIndex:1,lineLayer:0,type:0,cutDirection:1},
    {time:7,lineIndex:3,lineLayer:1,type:1,cutDirection:3},
    {time:9,lineIndex:1,lineLayer:0,type:0,cutDirection:0},
    {time:10,lineIndex:0,lineLayer:1,type:1,cutDirection:2},{time:11,lineIndex:2,lineLayer:0,type:0,cutDirection:1},{time:6,lineIndex:0,lineLayer:0,type:0,cutDirection:0},{time:6,lineIndex:3,lineLayer:0,type:1,cutDirection:0},{time:8.333333015441895,lineIndex:1,lineLayer:0,type:0,cutDirection:1},{time:8.666666030883789,lineIndex:2,lineLayer:0,type:1,cutDirection:0},{time:12,lineIndex:1,lineLayer:0,type:1,cutDirection:1},{time:13,lineIndex:0,lineLayer:0,type:0,cutDirection:0},{time:12.329999923706055,lineIndex:0,lineLayer:0,type:0,cutDirection:1},{time:12.65999984741211,lineIndex:1,lineLayer:0,type:1,cutDirection:0},{time:14,lineIndex:2,lineLayer:1,type:1,cutDirection:5},{time:16,lineIndex:3,lineLayer:0,type:1,cutDirection:0},{time:15,lineIndex:0,lineLayer:0,type:1,cutDirection:2},{time:16.329999923706055,lineIndex:2,lineLayer:0,type:0,cutDirection:0},{time:16.65999984741211,lineIndex:3,lineLayer:0,type:1,cutDirection:1},{time:17,lineIndex:1,lineLayer:0,type:0,cutDirection:1},{time:19,lineIndex:2,lineLayer:2,type:1,cutDirection:0},{time:18,lineIndex:0,lineLayer:1,type:0,cutDirection:2},{time:20,lineIndex:3,lineLayer:0,type:1,cutDirection:1},{time:21,lineIndex:1,lineLayer:0,type:1,cutDirection:1},{time:22,lineIndex:3,lineLayer:1,type:1,cutDirection:3},{time:23,lineIndex:1,lineLayer:1,type:0,cutDirection:2},{time:24,lineIndex:3,lineLayer:0,type:1,cutDirection:0},{time:25,lineIndex:1,lineLayer:0,type:1,cutDirection:2},{time:26,lineIndex:1,lineLayer:0,type:0,cutDirection:1},{time:27,lineIndex:0,lineLayer:1,type:0,cutDirection:0},{time:28,lineIndex:3,lineLayer:0,type:1,cutDirection:1},{time:29,lineIndex:2,lineLayer:0,type:0,cutDirection:0},{time:28.333330154418945,lineIndex:2,lineLayer:0,type:0,cutDirection:1},{time:28.66666030883789,lineIndex:3,lineLayer:0,type:1,cutDirection:0},{time:30,lineIndex:3,lineLayer:1,type:1,cutDirection:3},{time:31,lineIndex:1,lineLayer:0,type:1,cutDirection:1}
  ];

  private getBeats(): Array<ComponentFactory<BeatComponent>> {
    let arrayToReturn: Array<ComponentFactory<BeatComponent>> = new Array<ComponentFactory<BeatComponent>>();
    this.notesMockList.forEach(() => {
      arrayToReturn.push(this._resolver.resolveComponentFactory(BeatComponent));
    });
    
    return arrayToReturn;
  }

  startBeatsCreation(viewContainer: ViewContainerRef) {
    const beatList: Array<ComponentFactory<BeatComponent>> = this.getBeats();
    let time: number = 0;
    let index: number = 0;
    setInterval(()=> {
      this.notesMockList.forEach(note => {
        if (beatList.length === 0) {
          return;
        }
        if (note.time === time) {
          const componentRef: ComponentRef<BeatComponent> = viewContainer.createComponent(beatList.pop());
          this._componentReferenceList.push(componentRef);
          componentRef.instance.beatPosition = { 
              horizontalPosition: note.lineIndex,
              verticalPosition: note.lineLayer
          };
          componentRef.instance.beatType = note.type;
          componentRef.instance.beatCutDirection = note.cutDirection;
          componentRef.instance.index = ++index;
          componentRef.instance.removeElement.subscribe((index)=> {
            this.remove(index);
          });
          componentRef.instance.playerScored.subscribe((scored: boolean) => {
            this._manageScore(scored);
          });
          this.notesMockList.shift();
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

  private _manageScore(scored: boolean): void {
    if (scored) {
      this.destroyedBeats++;
    } else {
      this.failedBeats++;
    }
  }
}
