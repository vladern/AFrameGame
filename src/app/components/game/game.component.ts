import { Component, OnInit, ViewChild, ViewContainerRef, ViewChildren, AfterViewInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { timeout } from 'q';

@Component({
  selector: 'a-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {

  @ViewChild('beatContainer', { read: ViewContainerRef }) beatContainer: ViewContainerRef;
  @ViewChild('playButton') playButton;
  @ViewChildren('scenarioBox') scenarioBoxList;
  
  constructor(private _gameSrv: GameService) {  }

  

  ngOnInit() {
    this._gameSrv.beatContainer = this.beatContainer;
  }

  ngAfterViewInit() {
    this._setAnimationToSecenariosBoxeList();
    setTimeout(() => {
      this.playButton.nativeElement.setAttribute('visible', 'true');
    }, 7000);
  }

  public playTheSong() {
    this.playButton.nativeElement.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 1000');
    this._gameSrv.playTheSong().subscribe( () => {
      this.playButton.nativeElement.setAttribute('visible', 'false');
    });
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
