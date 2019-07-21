import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'a-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild('beatContainer', { read: ViewContainerRef }) beatContainer: ViewContainerRef;
  
  constructor(private _gameSrv: GameService) {  }

  

  ngOnInit() {
    this._gameSrv.beatContainer = this.beatContainer;
    this._playSong();
  }

  startBeatCreation() {
    this._gameSrv.startBeatsCreation(this.beatContainer);
  }

  get scoreText(): string {
    return 'font: mozillavr; width: 3; value: Cuted beats: '+ this._gameSrv.destroyedBeats;
  }
  get failedText(): string {
    return 'font: mozillavr; width: 3; value: Failed beats: '+ this._gameSrv.failedBeats;
  }

  private _playSong() {
    let audio = new Audio();
    audio.src = "assets/audio/song.egg"
    audio.load();
    audio.play().then(()=>{
      this.startBeatCreation();
    });
  }

  

}
