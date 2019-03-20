import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralScreenComponent } from './central-screen.component';

describe('CentralScreenComponent', () => {
  let component: CentralScreenComponent;
  let fixture: ComponentFixture<CentralScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentralScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
