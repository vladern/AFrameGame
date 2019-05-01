import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SceneOrchestratorService } from 'src/app/services/scene-orchestrator.service'
import { MenuComponent } from './menu.component';
import { Scene } from 'src/app/shared/scene/scene.enum';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let sceneOrchestratorSrv: SceneOrchestratorService;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('will fail', () => {
    expect("3").toBe("3");
  });
});
