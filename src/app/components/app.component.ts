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
    console.log(`WrapperSceneComponent.toggleSubScenes: entered`);
    let ssa = document.querySelector('a-game');
    let ssb = document.querySelector('a-menu');
    let ssaVisible : any= ssa.getAttribute('visible');
    let ssbVisible : any= ssb.getAttribute('visible');

    ssa.setAttribute('visible', ssaVisible ? 'false' : 'true');
    ssb.setAttribute('visible', ssbVisible ? 'false' : 'true');
  }

  get actualScene() {
    return this._sceneOrchestrationsrv.actualScene;
  }
}
