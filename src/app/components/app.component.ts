import { Component, ElementRef, ViewChild } from '@angular/core';
import { SceneOrchestratorService } from '../services/scene-orchestrator.service';
import { Scene } from '../shared/scene/scene.enum';
import { Position } from '../shared/position/position.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private _showPositionWarning: boolean;
  private _cameraPosition: Position;
  @ViewChild('camera') input: ElementRef;
  constructor(private _sceneOrchestrationsrv: SceneOrchestratorService) { }

  ngOnInit() {
    this._sceneOrchestrationsrv.actualScene = Scene.initialMenu;
    this._showPositionWarning=false;
    this._cameraPosition = {x: 0, y: 1.7, z: 0};

    setInterval(()=> {
      const cameraPosition = this.input.nativeElement.getAttribute('position');
      this.setCameraPosition(cameraPosition);
    },50);
  }
  public get actualScene() {
    return this._sceneOrchestrationsrv.actualScene;
  }

  public get showPositionWarning(): boolean {
    return this._showPositionWarning;
  }

  public set showPositionWarning(value: boolean) {
    this._showPositionWarning = value;
  }

  public getCameraPosition(): string {
    return this._cameraPosition.x + ' ' + this._cameraPosition.y + ' ' + this._cameraPosition.z;
  }
  public setCameraPosition(value: Position) {
    this._cameraPosition = value;
    this._checkThatCameraPositionIsInThePlayArea();
  }

  private _checkThatCameraPositionIsInThePlayArea() {
    const frontLimit = 1;
    const backLimit = -1;
    const leftLimit = -1;
    const rightLimit = 1;

    if(this._cameraPosition.x <= leftLimit ||  this._cameraPosition.x >= rightLimit || 
      this._cameraPosition.z >= frontLimit || this._cameraPosition.z <= backLimit) {
      this.showPositionWarning = true;
    } else {
      this.showPositionWarning = false;
    }
  }
}
