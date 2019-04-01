import { Injectable } from '@angular/core';
import { Scene } from '../shared/scene/scene.enum';

@Injectable({
  providedIn: 'root'
})
export class SceneOrchestratorService {

  private _actualScene: Scene;

  constructor() { }

  public get actualScene(): Scene {
    return this._actualScene;
  }
  public set actualScene(value: Scene) {
    this._actualScene = value;
  }
  
}
