import { Component, OnInit, ElementRef, ViewChild, ComponentFactoryResolver, ViewContainerRef, ComponentFactory } from '@angular/core';
import { BeatComponent } from './beat/beat.component';
import { BeatService } from 'src/app/services/beat.service';

@Component({
  selector: 'a-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild('beatContainer', { read: ViewContainerRef }) beatContainer: ViewContainerRef;
  
  constructor(private _resolver: ComponentFactoryResolver,
              private _beatSrv: BeatService) {  }

  ngOnInit() {
    this.startBeatCreation();
  }

  startBeatCreation() {
    this._beatSrv.startBeatsCreation(this.beatContainer);
  }
}
