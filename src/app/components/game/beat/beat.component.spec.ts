import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatComponent } from './beat.component';
import { Position } from 'src/app/shared/position/position.model';
import { BeatPosition } from 'src/app/shared/position/beatPosition.model';
import { HorizontalPositions } from 'src/app/shared/position/horizontalPositions.enum';
import { VerticalPositions } from 'src/app/shared/position/verticalPositions.enum';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('BeatComponent', () => {
  let component: BeatComponent;
  let fixture: ComponentFixture<BeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  BeatComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .overrideModule(BrowserDynamicTestingModule, 
      {set: {entryComponents: [BeatComponent]}})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The component recive position', () => {
    const resEsperado = {horizontalPosition: HorizontalPositions.left, verticalPosition: VerticalPositions.middle};
    component.beatPosition = resEsperado;
    expect(component.getBeatInitialPosition().horizontalPosition).toBe(resEsperado.horizontalPosition);
    expect(component.getBeatInitialPosition().verticalPosition).toBe(resEsperado.verticalPosition);
  });

  it('The component set box position', () => {
    const resEsperado = {horizontalPosition: HorizontalPositions.left, verticalPosition: VerticalPositions.middle};
    component.beatPosition = resEsperado;
    const boxElement = fixture.debugElement.nativeElement.querySelector('#beatComponent');

    expect(boxElement.object3D.position.x).toBe(-0.75);
    expect(boxElement.object3D.position.y).toBe(1.2);
    expect(boxElement.object3D.position.z).toBe(-5);
  });
});
