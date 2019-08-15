import { Injectable, EventEmitter } from '@angular/core';
import { SubjectSubscriber, Subject } from 'rxjs/internal/Subject';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  private _switchControllerMode: Subject<void> = new Subject();

  public switchControllerModeEvent(): Observable<void> {
    return this._switchControllerMode.asObservable();
  }

  public switchControllerMode(): void {
    this._switchControllerMode.next();
  }

  constructor() { }
}
