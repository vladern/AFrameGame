import { Component } from '@angular/core';
import { SceneOrchestratorService } from '../services/scene-orchestrator.service';
import { Scene } from '../shared/scene/scene.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public cubo = [ { position: '-0.5 1   -3', height: '0.4' },
                  { position: '0    1   -3', height: '0.4' },
                  { position: '0.5  1   -3', height: '0.4' },
                  { position: '-0.5 1.5 -3', height: '0.4' },
                  { position: '0    1.5 -3', height: '0.4' },
                  { position: '0.5  1.5 -3', height: '0.4' },
                  { position: '-0.5 2.0 -3', height: '0.4' },
                  { position: '0    2.0 -3', height: '0.4' },
                  { position: '0.5  2.0 -3', height: '0.4' }
                ];
          

  constructor(private _sceneOrchestrationsrv: SceneOrchestratorService) { }

  ngOnInit() {
    this._sceneOrchestrationsrv.actualScene = Scene.initialMenu;

    
  }

  ngAfterViewInit() {
  }

  get actualScene() {
    return this._sceneOrchestrationsrv.actualScene;
  }
}
