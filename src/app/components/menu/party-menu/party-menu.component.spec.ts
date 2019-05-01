import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyMenuComponent } from './party-menu.component';

describe('PartyMenuComponent', () => {
  let component: PartyMenuComponent;
  let fixture: ComponentFixture<PartyMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
