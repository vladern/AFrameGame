import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Scene } from 'src/app/shared/scene/scene.enum';
import { GameService } from 'src/app/services/game.service';
import { SceneOrchestratorService } from 'src/app/services/scene-orchestrator.service';

@Component({
  selector: 'a-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class ControllerComponent implements OnInit {

  @Input('hand') hand: string;
  public gameStartedPlayTheSong = false;
  @ViewChild('saver') saver: ElementRef;
  constructor(private _gameSrv: GameService, private _sceneOrchestratorService: SceneOrchestratorService) { }

  ngOnInit() {
    this._gameSrv.gameStarted().subscribe(function() {
      if (this._sceneOrchestratorService.actualScene === Scene.game) {
        this.gameStartedPlayTheSong = true;
      }
    }.bind(this));
  }


  getControllerGeometry(): string {
    return 'primitive: box; width: 0.035; height: 0.035; depth: 0.2;';
  }

  getMotionControls(): string {
    switch (this.hand) {
      case 'left':
        return 'hand: left; model: false';
      case 'right':
        return 'hand: right; model: false';
      default:
        console.error('hand input should be: left or right');
        break;
    }
  }

  getAABBColider(): string {
    switch (this.hand) {
      case 'left':
        return 'objects: .leftBox; interval: 5';
      case 'right':
        return  'objects: .rightBox; interval: 5';
      default:
        console.error('hand input should be: left or right');
        break;
    }
  }

  getControllerCursor(): string {
    return `radius: 0.018; color: ${this.hand === 'right'? 'blue': 'red'}`;
  }
}
