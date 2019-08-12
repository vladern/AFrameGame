import { Component, OnInit, ViewChild, ViewContainerRef, ViewChildren, AfterViewInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { SceneOrchestratorService } from 'src/app/services/scene-orchestrator.service';
import { Scene } from 'src/app/shared/scene/scene.enum';
import { ControllerService } from 'src/app/services/controller.service';

@Component({
  selector: 'a-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {

  public levelFailed: boolean = false;
  public songEnded: boolean = false;

  @ViewChild('beatContainer', { read: ViewContainerRef }) beatContainer: ViewContainerRef;
  @ViewChild('playButton') playButton;
  @ViewChildren('scenarioBox') scenarioBoxList;
  
  constructor(private _gameSrv: GameService, private _scenarioSrv: SceneOrchestratorService, private _controllerSrv: ControllerService) {  }

  

  ngOnInit() {
    this._gameSrv.beatContainer = this.beatContainer;
    this._gameSrv.levelFailed().subscribe(function() {
      setTimeout(()=> {
        this.levelFailed = true;
        this._controllerSrv.switchControllerMode();
      }, 1000);
    }.bind(this));
  }

  ngAfterViewInit() {
    this._setAnimationToSecenariosBoxeList();
    setTimeout(() => {
      this.playButton.nativeElement.setAttribute('visible', 'true');
    }, 7000);
  }

  public playTheSong() {
    this._controllerSrv.switchControllerMode();
    if (this.playButton !== undefined) {
      this.playButton.nativeElement.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 1000');
    }
    this._gameSrv.playTheSong().subscribe( () => {
      this.playButton.nativeElement.setAttribute('visible', 'false');
      this._gameSrv.songEnded().subscribe(()=>{
        this.songEnded = true;
        this._controllerSrv.switchControllerMode();
      });
    });
  }

  public goBackToTheMenu() {
    this._scenarioSrv.actualScene = Scene.singlePlayerMenu;
    this._gameSrv.resesAllServiceData();
  }

  public resetLevel() {
    this._gameSrv.resetStats();
    this.levelFailed = false;
    this.playTheSong();
  }

  get scoreText(): string {
    return `font: mozillavr; width: 4; value: ${this._gameSrv.score}`;
  }
  get comboText(): string {
    return `font: mozillavr; width: 4; value: ${this._gameSrv.combo}`;
  }
  get multiplierText(): string {
    return `font: mozillavr; width: 6; value: X ${this._gameSrv.multiplier}`;
  }

  get boxPositionList(): string[] {
    let x = -5;
    let y = 0;
    let boxPositionList = [];
    for (let index = 0; index < 10; index++) {
      for (let index = 0; index < 4; index++) {
        boxPositionList.push(`${x} ${y} 2`);
        x = x + 2.1;
      }
      y = y + 0.5;
      x = -5;    
    }
    return boxPositionList;
  }
  private _setAnimationToSecenariosBoxeList() {
    const numOfBoxes = 35
    let x = 0;
    let y = 0.5;
    let z = -15;
    let boxListIndex = 0;
    let boxList = this.scenarioBoxList.toArray().slice(0, numOfBoxes);
    let delay = 0;
    for (let index = 0; index < numOfBoxes; index++) {
      const box = boxList[boxListIndex];
      box.nativeElement.setAttribute('animation',
      `property: position; dur: 1000; to: ${x} ${y} ${z}; delay: ${delay}`
      );
      z = (Math.round(z * 100)/100) + 0.3;
      boxListIndex++;
      delay += 200;
    }
  }
}
