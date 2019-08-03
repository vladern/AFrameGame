import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'a-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class ControllerComponent implements OnInit, AfterViewInit {

  @Input('hand') hand: string;
  private _controllerGeometry: string;
  private _motionControlls: string;
  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.setControllerGeometry();
    this.setMotionControls();
  }

  getControllerGeometry(): string {
     return this._controllerGeometry;
  }

  setControllerGeometry() {
    switch (this.hand) {
      case 'left':
        this._controllerGeometry = 'primitive: box; width: 0.025; height: 0.025; depth: 0.15; color: blue';
      case 'right':
        this._controllerGeometry = 'primitive: box; width: 0.025; height: 0.025; depth: 0.15; color: blue';
      default:
        break;
    }
  }

  getMotionControls(): string {
    return this._motionControlls;
  }

  setMotionControls() {
    switch (this.hand) {
      case 'left':
        this._motionControlls = 'hand: left; model: false'
        break;
      case 'right':
        this._motionControlls = 'hand: right; model: false'
        break;
      default:
        break;
    }
  }

}
