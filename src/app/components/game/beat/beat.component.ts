import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { BeatPosition } from 'src/app/shared/beat/beatPosition.model';
import { HorizontalPositions } from 'src/app/shared/beat/horizontalPositions.enum';
import { VerticalPositions } from 'src/app/shared/beat/verticalPositions.enum';
import { BeatType } from 'src/app/shared/beat/beatType.model';

@Component({
  selector: 'a-beat',
  templateUrl: './beat.component.html',
  styleUrls: ['./beat.component.css']
})
export class BeatComponent implements OnInit, AfterViewInit {

  @Input() beatPosition: BeatPosition;
  private duration: number = 1000;
  @Input() set durationOfAnimation (duration:number){
    if (!!duration) {
      this.duration = duration;
    }
  }
  @Input() beatType: BeatType;
  @ViewChild('boxElement') boxElement;
  private x;
  private y;
  private z;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._setElementPosition();
    this._setAnimationAtributes();
    this._setBoxColor();
  }

  getBeatInitialPosition(): BeatPosition {
    return this.beatPosition;
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
        this.y = 0.7;
        break;
      case VerticalPositions.middle:
        this.y = 1.2;
        break;
      case VerticalPositions.top:
        this.y = 1.7;
        break;
      default:
        this.y = 0;
        break;
    }

    if (!!this.beatPosition) {
          this.z = -5;
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
                      "dur: "+ this.duration+ ";"+
                      "to:  "+ this.x +
                      " "+ this.y +
                      " 0;");
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

  // onIntersected($event) {
  //   event.srcElement.setAttribute('animation__2', 'property: position; dur: 1000; to: 5 5 -5;');
  // }

}
