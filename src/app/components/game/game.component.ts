import { Component, OnInit, ElementRef, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { BeatComponent } from './beat/beat.component';

@Component({
  selector: 'a-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild('beatContainer', { read: ViewContainerRef }) beatContainer: ViewContainerRef;
  
  constructor(private _resolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  getNewBoxes() {
    const factory = this._resolver.resolveComponentFactory(BeatComponent);
    this.beatContainer.createComponent(factory);
  }

  onClick($event) {
    event.srcElement.setAttribute('animation', "property: position; dur: 1000; to: 0 1.5 -0.3;");
  }

  onIntersected($event) {
    event.srcElement.setAttribute('animation__2', 'property: position; dur: 1000; to: 5 5 -5;');
  }
}
