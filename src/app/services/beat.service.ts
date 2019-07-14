import { Injectable, ComponentFactory, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { BeatComponent } from '../components/game/beat/beat.component';
import { Song } from '../shared/song/song.model';
import { HorizontalPositions } from '../shared/position/horizontalPositions.enum';
import { VerticalPositions } from '../shared/position/verticalPositions.enum';

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

  private getBeats(): Array<ComponentFactory<BeatComponent>> {
    let arrayToReturn: Array<ComponentFactory<BeatComponent>> = new Array<ComponentFactory<BeatComponent>>();
    arrayToReturn.push(this._resolver.resolveComponentFactory(BeatComponent));
    arrayToReturn.push(this._resolver.resolveComponentFactory(BeatComponent));
    return arrayToReturn;
  }

  startBeatsCreation(viewContainer: ViewContainerRef) {
    const beatList: Array<ComponentFactory<BeatComponent>> = this.getBeats();
    beatList.forEach(element => {
      let elementRef = viewContainer.createComponent(element);
      elementRef.instance.beatPosition = {horizontalPosition: HorizontalPositions.left, verticalPosition: VerticalPositions.middle};
    });
  }
}
