import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BeatsaverService {

  constructor(private _http: HttpClient) { }

  public getTOP25SongsJSON() {
    const top25URL: string = 'https://beatsaber-songs.herokuapp.com/top/all/playlist/25';
    return this._http.get(top25URL);
  }

  public getSongInformationJSON(key: string) {
    const songInfoURL: string = 'https://beatsaver.com/api/songs/detail/' + key;
    return this._http.get(songInfoURL);
  }

  public getSongCoverImageURL(key: string) {
    const songCoverBaseURL: string = 'https://beatsaver.com/storage/songs';
    const id: string = key.split('-')[0];
    return songCoverBaseURL + '/' + id + '/' + key + '.png'
  }

  public getZipFileToPlayTheSong(key: string) {
    const songZipFileBaseURL: string = 'https://beatsaver.com/storage/songs/';
    const id: string = key.split('-')[0];
    return this._http.get(songZipFileBaseURL + '/' + id + '/' + key + '.zip');
  }
}
