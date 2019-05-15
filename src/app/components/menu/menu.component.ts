import { Component, OnInit } from '@angular/core';
import { TextLine } from 'src/app/shared/text-line/text-line.model';
import { SceneOrchestratorService } from 'src/app/services/scene-orchestrator.service';
import { Scene } from 'src/app/shared/scene/scene.enum';
@Component({
  selector: 'a-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private _leftPanelLines: TextLine[];
  private _rightPanelLines: TextLine[];
  constructor(private _sceneOrchestratorSrv: SceneOrchestratorService) { }

  ngOnInit() {
    this._sceneOrchestratorSrv.actualScene = Scene.initialMenu;

    this._leftPanelLines = [
      { position: "0 0.8 0", text: "Warnign!!", fontSize: "80px" },
      { position: "0 0.6 0", text: "This is a alfa version of the game.", fontSize: "50px" },
      { position: "0 0.4 0", text: "Final version will containt important changes.", fontSize: "50px" },
      { position: "0 0.2 0", text: "The project is under development and undestand it as such.", fontSize: "50px" }
    ];
    this._rightPanelLines = [
      { position: "0 1.05 0", text: "PLAYER STATISTICS", fontSize: "60px" },
      { position: "-1.06 0.4 0", text: "Levels Played               79", fontSize: "40px" },
      { position: "-1.06 0.2 0", text: "Levels Cleared              20", fontSize: "40px" },
      { position: "1.06 0.4 0", text: "Good Cuts                 20005", fontSize: "40px" },
      { position: "1.06 0.2 0", text: "Bad Cuts                 20", fontSize: "40px" },
    ];
  }

  get leftPanelLines(): TextLine[] {
    return this._leftPanelLines;
  }

  set liftPanelLines(textLines: TextLine[]) {
    this._leftPanelLines = textLines;
  }

  get rightPanelLines(): TextLine[] {
    return this._rightPanelLines;
  }

  set rightPanelLines(textLines: TextLine[]) {
    this._rightPanelLines = textLines;
  }

  onPlay($event) {
    // event.srcElement.setAttribute('background-color', 'red');
  }

  goToSinglePlayerMenu() {
    this._sceneOrchestratorSrv.actualScene = Scene.singlePlayerMenu;
  }

  goToParty() {
    this._sceneOrchestratorSrv.actualScene = Scene.partyMenu;
  }

  goHowToPlay() {
    this._sceneOrchestratorSrv.actualScene = Scene.howToPlay;
  }

  goToCredits() {
    this._sceneOrchestratorSrv.actualScene = Scene.credits;
  }

}
