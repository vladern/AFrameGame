import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { BeatPosition } from 'src/app/shared/beat/beatPosition.model';
import { HorizontalPositions } from 'src/app/shared/beat/horizontalPositions.enum';
import { VerticalPositions } from 'src/app/shared/beat/verticalPositions.enum';
import { BeatType } from 'src/app/shared/beat/beatType.model';
import { BeatCutDirection } from 'src/app/shared/beat/beatCutDirection.enum';

@Component({
  selector: 'a-beat',
  templateUrl: './beat.component.html',
  styleUrls: ['./beat.component.css']
})
export class BeatComponent implements OnInit, AfterViewInit {

  @Input() beatPosition: BeatPosition;
  private duration: number = 3200;
  @Input() set durationOfAnimation (duration:number){
    if (!!duration) {
      this.duration = duration;
    }
  }
  @Input() beatType: BeatType;
  @Input() beatCutDirection: BeatCutDirection;
  @ViewChild('boxElement') boxElement;
  @Output() removeElement: EventEmitter<number> = new EventEmitter();
  @Output() playerScored: EventEmitter<boolean> = new EventEmitter();

  private x;
  private y;
  private z;
  private _firstPlaneColided: boolean = false;
  private _firstDotPlaneColided: boolean = false;
  public showBox: boolean = true;
  public index: number;
  public isDot = false;
  public isVisible = true;

  constructor() { }

  ngOnInit() {
    this._setElementPosition();
    this._setAnimationAtributes();
    this._setBoxColor();
    this._setBeatCutDirection();
    this._listenAnimationComplete();
  }

  ngAfterViewInit() { 
  }

  getBeatInitialPosition(): BeatPosition {
    return this.beatPosition;
  }

  firstPlaneColided(): void {
    console.log(`firstPlaneColided() of ${this.index}`);
    if (this.beatCutDirection === BeatCutDirection.DOT) {
      this.playerScored.emit(false);
      this._destroyAframeCompomponent();
    } else {
      this._firstPlaneColided = true;
    }
  }

  secondPlaneColided($event): void {
    console.log(`secondPlaneColided() of ${this.index}`);
    if (this._firstPlaneColided && this.beatCutDirection !== BeatCutDirection.DOT) {
      // OK
      this.playerScored.emit(true);
      this._destroyAframeCompomponent();
    } else {
      this.playerScored.emit(false);
      this._destroyAframeCompomponent();
    }
  }

  firstDotPlaneColided(): void {
    console.log(`firstDotPlaneColided() of ${this.index}`);
    this._firstDotPlaneColided = true;
  }

  secondDotPlaneColided(): void {
    console.log(`secondDotPlaneColided() of ${this.index}`);
    if (this._firstDotPlaneColided) {
      // OK
      this.playerScored.emit(true);
      this._destroyAframeCompomponent();
    } else {
      // fail
      this.playerScored.emit(false);
      this._destroyAframeCompomponent();
    }
  }

  className() {
    if (this._getColor() === 'red' && this.boxElement.nativeElement.object3D.position.y < 2) {
      return 'leftBox';
    } else if (this._getColor() === 'blue' && this.boxElement.nativeElement.object3D.position.y < 2) {
      return 'rightBox';
    }
  }

  private _destroyAframeCompomponent() {
    this.boxElement.nativeElement.setAttribute('visible', 'false');
    // this.boxElement.nativeElement.parentNode.removeChild(this.boxElement.nativeElement);
    this.removeElement.emit(this.index);
    this.boxElement.nativeElement.remove();
  }

  private _listenAnimationComplete(): void {
    this.boxElement.nativeElement.addEventListener('animationcomplete', ()=> {
      this._destroyAframeCompomponent();
      if (this.beatType !== BeatType.BOMB) {
        this.playerScored.emit(false);
      }
    });
  }

  private _setElementPosition() {
    switch (this.beatPosition.horizontalPosition) {
      case HorizontalPositions.left:
        this.x = -0.75;
        break;
      case HorizontalPositions.middleLeft:
        this.x = -0.25;
        break;
      case HorizontalPositions.middleRight:
        this.x = 0.25;
        break;
      case HorizontalPositions.right:
        this.x = 0.75;
        break;
      default:
        this.x = 0;
        break;
    }

    switch (this.beatPosition.verticalPosition) {
      case VerticalPositions.bottom:
        this.y = 0.9;
        break;
      case VerticalPositions.middle:
        this.y = 1.4;
        break;
      case VerticalPositions.top:
        this.y = 1.9;
        break;
      default:
        this.y = 0;
        break;
    }

    if (!!this.beatPosition) {
          this.z = -15;
    } else {
         this.z = 0;
    }
    this.boxElement.nativeElement.object3D.position.x = this.x;
    this.boxElement.nativeElement.object3D.position.y = this.y;
    this.boxElement.nativeElement.object3D.position.z = this.z;
  }

  private _setAnimationAtributes() {
    this.boxElement.nativeElement
        .setAttribute('animation',
                      "property: position;"+
                      "dur: "+ this.duration + ";"+
                      "to:  "+ this.x +
                      " "+ this.y +
                      " 1;");
  }

  private _setBoxColor() {
    this.boxElement.nativeElement
      .setAttribute('material',
                    'color', this._getColor());
  }

  private _getColor(): string {
    switch (this.beatType) {
      case BeatType.RIGHT:
        return 'blue';
      case BeatType.LEFT:
        return 'red';
      default:
        return 'white';
    }
  }

  private _setBeatCutDirection() {
    switch (this.beatCutDirection) {
      case BeatCutDirection.UP:
        this._setRotationAtribute(180);
      break;
      case BeatCutDirection.DOWN:
        this._setRotationAtribute(0);
      break;
      case BeatCutDirection.LEFT:
        this._setRotationAtribute(270);
      break;
      case BeatCutDirection.RIGHT:
        this._setRotationAtribute(90);
      break;
      case BeatCutDirection.UPLEFT:
        this._setRotationAtribute(225);
      break;
      case BeatCutDirection.UPRIGHT:
        this._setRotationAtribute(135);
      break;
      case BeatCutDirection.DOWNLEFT:
        this._setRotationAtribute(315);
      break;
      case BeatCutDirection.DOWNRIGHT:
        this._setRotationAtribute(45);
      break;
      case BeatCutDirection.DOT:
        this.isDot = true;
      break;
      default:
        this._setRotationAtribute(0);
        break;
    }
  }

  private _setRotationAtribute(rotation: number) {
    this.boxElement.nativeElement.setAttribute('rotation', {x: 0, y: 0, z: rotation});
  }

  // onIntersected($event) {
  //   event.srcElement.setAttribute('animation__2', 'property: position; dur: 1000; to: 5 5 -5;');
  // }

}
