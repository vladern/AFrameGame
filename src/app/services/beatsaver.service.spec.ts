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

  it('should return a JSON with information about a song', () => {
    const service: BeatsaverService = TestBed.get(BeatsaverService);
    const songKey = '2811-8516';
    service.getSongInformationJSON(songKey)
      .subscribe((response) => {
        const song = response['song'];
        const resultKey = song['key'];
        console.log(resultKey);
        expect(resultKey).toEqual(songKey);
    });
  });

  it('should return URL of the song cover image', () => {
    const service: BeatsaverService = TestBed.get(BeatsaverService);
    const songKey = '2811-8516';
    const expectedSongCoverImageURL: string = 'https://beatsaver.com/storage/songs/2811/2811-8516.png';
    const result = service.getSongCoverImageURL(songKey);
    expect(result).toEqual(expectedSongCoverImageURL);
  });
});
