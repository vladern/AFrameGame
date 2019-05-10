import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ZipLoader from 'zip-loader';

@Injectable({
  providedIn: 'root'
})
export class BeatsaverAPIService {

  constructor(private _http: HttpClient) { }

  private readonly _baseURL: string = 'https://beatsaver.com';

  public getTOPAllSongsJSON(): Observable<Object> {
    const top25URL: string = this._baseURL + '/api/songs/top/?time=all';
    return this._http.get(top25URL);
  }

  public getSongInformationJSON(key: string): Observable<Object> {
    const songInfoURL: string = this._baseURL + '/api/songs/detail/' + key;
    console.log(songInfoURL);
    return this._http.get(songInfoURL);
  }

  public getSongCoverImageURL(key: string): string {
    const songCoverBaseURL: string = this._baseURL + '/storage/songs';
    const id: string = this._getSongIdFromTheKey(key);
    return songCoverBaseURL + '/' + id + '/' + key + '.png'
  }

  public getZipFileToPlayTheSong(key: string) {
    
    const songZipFileBaseURL: string = this._baseURL + '/storage/songs';
    const id: string = this._getSongIdFromTheKey(key);
    const url: string = songZipFileBaseURL + '/' + id + '/' + key + '.zip';
    const loader = new ZipLoader(url);
    return loader;
  }

  private _getSongIdFromTheKey(key: string): string {
    return key.split('-')[0];
  }
}
