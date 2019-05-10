import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SongService } from './song.service';

fdescribe('SongService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [SongService],
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: SongService = TestBed.get(SongService);
    expect(service).toBeTruthy();
  });

  it('should return a song', (done: DoneFn) => {
    const service: SongService = TestBed.get(SongService);
    const songKey: string = '2811-8516';
    service.getSongByKey(songKey).subscribe((result) => {
      expect(result.id).toBe(2811);
      done();
    });
  });
});
