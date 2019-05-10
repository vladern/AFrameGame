import { TestBed } from '@angular/core/testing';
import { BeatsaverService } from './beatsaver.service';
import { HttpClientModule } from '@angular/common/http';
describe('BeatsaverService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [BeatsaverService],
    imports: [ HttpClientModule ],
  }));

  it('should be created', () => {
    const service: BeatsaverService = TestBed.get(BeatsaverService);
    expect(service).toBeTruthy();
  });

  it('should return a JSON with TOP 25 songs', ()=> {
    const service: BeatsaverService = TestBed.get(BeatsaverService);
    service.getTOP25SongsJSON()
      .subscribe((response) => {
        expect(response).toBeTruthy();
    });
  });
});
