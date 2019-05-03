import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should exist a camara on center', () => {
    const camara = fixture.debugElement.nativeElement.querySelector('#camera');
    expect(camara).toBeTruthy();
  });

  it('default camara position should be 0 1.7 0', () => {
    expect(component.cameraPosition).toContain('0 1.7 0');
  });

  it('when player is in the play area, warning is not showing', () => {
    component.playerPosition = '0 0 0';
    expect(component.showPositionWarning).toBe(false);
  });

  it('when player is not in the play area, warning is showing', () => {
    component.playerPosition = '4 0 0';
    expect(component.showPositionWarning).toBe(true);
  });
});
