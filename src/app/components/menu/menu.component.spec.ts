import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SceneOrchestratorService } from 'src/app/services/scene-orchestrator.service'
import { MenuComponent } from './menu.component';
import { Scene } from 'src/app/shared/scene/scene.enum';

fdescribe('MenuComponent', () => {
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

  it('should change current scene to singlePlayerMenu on call goToSinglePlayerMenu()', ()=> {
    component.goToSinglePlayerMenu();
    const result = TestBed.get(SceneOrchestratorService).actualScene;
    expect(result).toBe(Scene.singlePlayerMenu);
  });

  it('should change current scene to partyMenu on call goToParty()', ()=> {
    component.goToParty();
    const result = TestBed.get(SceneOrchestratorService).actualScene;
    expect(result).toBe(Scene.partyMenu);
  });

  it('should change current scene to howToPlay on call goHowToPlay()', ()=> {
    component.goHowToPlay();
    const result = TestBed.get(SceneOrchestratorService).actualScene;
    expect(result).toBe(Scene.howToPlay);
  });

  it('should call goHowToPlay() on click "How to play" button', () => {
    spyOn(component, 'goHowToPlay');

    let button = fixture.debugElement.nativeElement.querySelector('#howToPlayBtn');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.goHowToPlay).toHaveBeenCalled();
    });
  });

  it('should change current scene to howToPlay on click "How to play" button', ()=> {
    let button = fixture.debugElement.nativeElement.querySelector('#howToPlayBtn');
    button.click();

    const result = TestBed.get(SceneOrchestratorService).actualScene;
    expect(result).toBe(Scene.howToPlay);
  });

  it('should change current scene to credits on click "Credits" button (Test1)', ()=> {
    let button = fixture.debugElement.nativeElement.querySelector('#creditsBtn');
    button.click();

    const result = TestBed.get(SceneOrchestratorService).actualScene;
    expect(result).toBe(Scene.credits);
  });
});
