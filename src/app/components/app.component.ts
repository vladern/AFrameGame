import { Component } from '@angular/core';
import { SceneOrchestratorService } from '../services/scene-orchestrator.service';
import { Scene } from '../shared/scene/scene.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  private _playerPosition: string;
  private _showPositionWarning: boolean;
  private _cameraPosition: string;

  constructor(private _sceneOrchestrationsrv: SceneOrchestratorService) { }

  ngOnInit() {
    this._sceneOrchestrationsrv.actualScene = Scene.initialMenu;
    this._playerPosition="0 0 0";
    this._showPositionWarning=false;
    this._cameraPosition="0 1.7 0"
  }
  public get actualScene() {
    return this._sceneOrchestrationsrv.actualScene;
  }

  public get playerPosition(): string {
    return this._playerPosition;
  }

  public set playerPosition(value: string) {
    this._playerPosition = value;
  }

  public get showPositionWarning(): boolean {
    return this._showPositionWarning;
  }

  public set showPositionWarning(value: boolean) {
    this._showPositionWarning = value;
  }

  public get cameraPosition(): string {
    return this._cameraPosition;
  }
  public set cameraPosition(value: string) {
    this._cameraPosition = value;
  }
}
