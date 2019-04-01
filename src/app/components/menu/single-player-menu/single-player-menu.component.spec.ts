import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlayerMenuComponent } from './single-player-menu.component';

describe('SinglePlayerMenuComponent', () => {
  let component: SinglePlayerMenuComponent;
  let fixture: ComponentFixture<SinglePlayerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePlayerMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePlayerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
