import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should exist a camara on center', ()=> {
    const fixture = TestBed.createComponent(AppComponent);
    const camara = fixture.debugElement.nativeElement.querySelector('#camara');
    expect(camara).toBeTruthy();
  });

  it('defauld camara position should be 0 1.7 0', ()=> {
    const fixture = TestBed.createComponent(AppComponent);
    const position = fixture.debugElement.nativeElement.querySelector('#camara').getAttribute('position');
    expect(position).toBe('0 1.7 0');
  });
});
