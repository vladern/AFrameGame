import { TestBed } from '@angular/core/testing';

import { SceneOrchestratorService } from './scene-orchestrator.service';

describe('SceneOrchestratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SceneOrchestratorService = TestBed.get(SceneOrchestratorService);
    expect(service).toBeTruthy();
  });
});
