import { Injectable, ComponentFactory, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { BeatComponent } from '../components/game/beat/beat.component';
import { Song } from '../shared/song/song.model';
import { HorizontalPositions } from '../shared/beat/horizontalPositions.enum';
import { VerticalPositions } from '../shared/beat/verticalPositions.enum';

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
export class BeatService {

  private _currentSong: Song;
  constructor(private _resolver: ComponentFactoryResolver) { }

  setCurrentSong(song: Song) {
    this._currentSong = song;
  }

  getCurrentSong(): Song {
    return this._currentSong;
  }

  notesMockList: Note[] = [
    {time:5,lineIndex:2,lineLayer:0,type:1,cutDirection:1},
    {time:5,lineIndex:1,lineLayer:0,type:0,cutDirection:1},
    {time:7,lineIndex:3,lineLayer:1,type:1,cutDirection:3},
    {time:9,lineIndex:1,lineLayer:0,type:0,cutDirection:0}
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
    setInterval(()=> {
      this.notesMockList.forEach(note => {
        if (beatList.length === 0) {
          return;
        }
        if (note.time === time) {
          const componentRef: ComponentRef<BeatComponent> = viewContainer.createComponent(beatList.pop());
          componentRef.instance.beatPosition = { 
              horizontalPosition: note.lineIndex,
              verticalPosition: note.lineLayer
          };
          componentRef.instance.beatType = note.type;
        }
      });
      time++;
    }, 250)
  }
}
