import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-central-screen',
  templateUrl: './central-screen.component.html',
  styleUrls: ['./central-screen.component.css']
})
export class CentralScreenComponent implements OnInit {

  private _isFreePlay: boolean = false;
  private _isPartyPlay: boolean = false;
  aframe = (window as any).AFRAME;
  constructor() { }

  ngOnInit() {
    this.aframe.registerComponent('app-central-screen', {
      init: function () {
          const el = this.el;
          el.addEventListener('click', function (evt) {
              console.log('Hi!')
          });
      }
  });
  this.aframe.registerPrimitive('app-config-panel', { defaultComponents: {}, mappings: {} })
  }

  freePlay() {
    this._isFreePlay = !this._isPartyPlay;
  }

  partyPlay() {
    this._isPartyPlay = !this._isPartyPlay;
  }

  get isFreePlay(): boolean {
    return this._isFreePlay;
  }

  get isPartyPlay(): boolean {
    return this._isPartyPlay;
  }

}
