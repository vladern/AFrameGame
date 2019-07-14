import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { BeatPosition } from 'src/app/shared/position/beatPosition.model';
import { HorizontalPositions } from 'src/app/shared/position/horizontalPositions.enum';
import { VerticalPositions } from 'src/app/shared/position/verticalPositions.enum';

@Component({
  selector: 'a-beat',
  templateUrl: './beat.component.html',
  styleUrls: ['./beat.component.css']
})
export class BeatComponent implements OnInit, AfterViewInit {

  @Input() beatPosition: BeatPosition;
  @ViewChild('boxElement') boxElement;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if ( this.beatPosition !== undefined ) {
      this.setElementPosition(this.beatPosition);
    } else {
      this.setElementPosition({horizontalPosition: HorizontalPositions.left, verticalPosition: VerticalPositions.middle});
    }
  }

  getBeatInitialPosition(): BeatPosition {
    return this.beatPosition;
  }

  setElementPosition(position: BeatPosition) {
    switch (position.horizontalPosition) {
      case HorizontalPositions.left:
        this.boxElement.nativeElement.object3D.position.x = -0.75;
        break;
      case HorizontalPositions.middleLeft:
        this.boxElement.nativeElement.object3D.position.x = -0.25;
        break;
      case HorizontalPositions.middleRight:
        this.boxElement.nativeElement.object3D.position.x = 0.25;
        break;
      case HorizontalPositions.right:
        this.boxElement.nativeElement.object3D.position.x = 0.75;
        break;
      default:
        break;
    }

    switch (position.verticalPosition) {
      case VerticalPositions.bottom:
        this.boxElement.nativeElement.object3D.position.y = 0.7;
        break;
      case VerticalPositions.middle:
        this.boxElement.nativeElement.object3D.position.y = 1.2;
        break;
      case VerticalPositions.top:
        this.boxElement.nativeElement.object3D.position.y = 1.7;
        break;
      default:
        break;
    }

    this.boxElement.nativeElement.object3D.position.z = -5;

  }

}
