import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Scene } from 'src/app/shared/scene/scene.enum';
import { GameService } from 'src/app/services/game.service';
import { SceneOrchestratorService } from 'src/app/services/scene-orchestrator.service';
import { ControllerService } from 'src/app/services/controller.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'a-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class ControllerComponent implements OnInit, OnDestroy {

  @Input('hand') hand: string;
  public showSaver = false;
  @ViewChild('saver') saver: ElementRef;
  constructor(private _controllerSrv: ControllerService) { }

  private _controllerModeSubscription: Subscription;

  ngOnInit() {
    this._controllerModeSubscription = this._controllerSrv.switchControllerModeEvent().subscribe(function(){
      this.showSaver = !this.showSaver;
    }.bind(this));
  }

  ngOnDestroy() {
    this._controllerModeSubscription.unsubscribe();
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
        return 'objects: .leftBox; interval: 10';
      case 'right':
        return  'objects: .rightBox; interval: 10';
      default:
        console.error('hand input should be: left or right');
        break;
    }
  }

  getControllerCursor(): string {
    return `radius: 0.018; color: ${this.hand === 'right'? '#75B305': '#8E17B3'}`;
  }
}
