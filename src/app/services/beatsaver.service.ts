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
}
