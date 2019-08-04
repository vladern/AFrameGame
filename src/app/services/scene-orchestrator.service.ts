import { Injectable } from '@angular/core';
import { Scene } from '../shared/scene/scene.enum';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SceneOrchestratorService {

  private _actualScene: Scene;
  private _sceneChanged = new BehaviorSubject(true);

  constructor() { }

  public sceneChanged(): Observable<boolean> {
    return this._sceneChanged.asObservable();
  }

  public get actualScene(): Scene {
    return this._actualScene;
  }
  public set actualScene(value: Scene) {
    this._actualScene = value;
    this._sceneChanged.next(true);
  }
  
}
