import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BeatsaverService {

  constructor(private _http: HttpClient) { }

  private readonly _baseURL: string = 'https://beatsaver.com';

  public getTOP25SongsJSON() {
    const top25URL: string = 'https://beatsaber-songs.herokuapp.com/top/all/playlist/25';
    return this._http.get(top25URL);
  }

  public getSongInformationJSON(key: string) {
    const songInfoURL: string = this._baseURL + '/api/songs/detail/' + key;
    return this._http.get(songInfoURL);
  }

  public getSongCoverImageURL(key: string) {
    const songCoverBaseURL: string = this._baseURL + '/storage/songs';
    const id: string = this._getSongIdFromTheKey(key);
    return songCoverBaseURL + '/' + id + '/' + key + '.png'
  }

  public getZipFileToPlayTheSong(key: string) {
    const songZipFileBaseURL: string = this._baseURL + '/storage/songs';
    const id: string = this._getSongIdFromTheKey(key);
    return this._http.get(songZipFileBaseURL + '/' + id + '/' + key + '.zip');
  }

  private _getSongIdFromTheKey(key: string): string {
    return key.split('-')[0];
  }
}
