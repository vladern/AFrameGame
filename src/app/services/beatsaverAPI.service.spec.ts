import { TestBed } from '@angular/core/testing';
import { BeatsaverAPIService } from './beatsaverAPI.service';
import { HttpClientModule } from '@angular/common/http';
import { doesNotThrow } from 'assert';
describe('BeatsaverAPIService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [BeatsaverAPIService],
    imports: [ HttpClientModule ],
  }));

  it('should be created', () => {
    const service: BeatsaverAPIService = TestBed.get(BeatsaverAPIService);
    expect(service).toBeTruthy();
  });

  it('should return a JSON with TOP 25 songs', (done: DoneFn)=> {
    const service: BeatsaverAPIService = TestBed.get(BeatsaverAPIService);
    service.getTOPAllSongsJSON()
      .subscribe((response) => {
        expect(response).toBeTruthy();
        done();
    });
  });

  it('should return a JSON with information about a song', (done: DoneFn) => {
    const service: BeatsaverAPIService = TestBed.get(BeatsaverAPIService);
    const songKey = '2811';
    service.getSongInformationJSON(songKey)
      .subscribe((response) => {
        const resultSongKey = response['key'];
        expect(resultSongKey).toEqual(songKey);
        done();
    });
  });

  it('should return URL of the song cover image', () => {
    const service: BeatsaverAPIService = TestBed.get(BeatsaverAPIService);
    const songKey = '2811-8516';
    const expectedSongCoverImageURL: string = 'https://beatsaver.com/storage/songs/2811/2811-8516.png';
    const result = service.getSongCoverImageURL(songKey);
    expect(result).toEqual(expectedSongCoverImageURL);
  });

  it('should return a zip file with all information about the song', (done: DoneFn) => {
    const service: BeatsaverAPIService = TestBed.get(BeatsaverAPIService);
    const songKey = '2811-8516';
    const file = service.getZipFileToPlayTheSong(songKey);
    expect(file).toBeTruthy();
    done();
  });
});
