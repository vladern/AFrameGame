import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneOrchestratorService } from 'src/app/services/scene-orchestrator.service'
import { MenuComponent } from './menu.component';
import { Scene } from 'src/app/shared/scene/scene.enum';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let sceneOrchestratorSrv: SceneOrchestratorService;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    sceneOrchestratorSrv = new SceneOrchestratorService();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('goToSinglePlayerTest', () => {
    component.goToSinglePlayer();
    expect(sceneOrchestratorSrv.actualScene).toBe(Scene.singlePlayerMenu);
  });

  it('goToPartyTest', () => {
    component.goToParty();
    expect(sceneOrchestratorSrv.actualScene).toBe(Scene.partyMenu);
  });
});
