import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  private _switchControllerMode: EventEmitter<void> = new EventEmitter();

  public switchControllerModeEvent(): EventEmitter<void> {
    return this._switchControllerMode;
  }

  public switchControllerMode(): void {
    this._switchControllerMode.next();
  }

  constructor() { }
}
