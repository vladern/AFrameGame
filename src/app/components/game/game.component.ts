import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BeatService } from 'src/app/services/beat.service';

@Component({
  selector: 'a-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild('beatContainer', { read: ViewContainerRef }) beatContainer: ViewContainerRef;
  
  constructor(private _beatSrv: BeatService) {  }

  ngOnInit() {
    this.startBeatCreation();
    this._beatSrv.beatContainer = this.beatContainer;
  }

  startBeatCreation() {
    this._beatSrv.startBeatsCreation(this.beatContainer);
  }
}
