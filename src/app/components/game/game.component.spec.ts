import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { GameComponent } from './game.component';
import { BeatComponent } from './beat/beat.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

fdescribe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent, BeatComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .overrideModule(BrowserDynamicTestingModule, 
      {set: {entryComponents: [BeatComponent]}})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('On call getNewBoxes() should apear new boxes', () => {
    component.getNewBoxes();
    const box = fixture.debugElement.nativeElement.querySelector('#beatComponent');
    expect(box).not.toBeNull();
  });
});
