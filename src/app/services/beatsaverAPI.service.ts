import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ZipLoader from 'zip-loader';
import { Song } from '../shared/song/song.model';
import { Difficulties } from '../shared/difficulty/difficulties.enum';

export interface Resources {
  audioBlobUrl?: string,
  dificulties?: DificultieJSONContainer[]
}
export interface DificultieJSONContainer {
  dificulty: Difficulties, 
  json: any
}
@Injectable({
  providedIn: 'root'
})
export class BeatsaverAPIService {

  constructor(private _http: HttpClient) { }

  private readonly _baseURL: string = 'https://beatsaver.com';

  public getTOPAllSongsJSON(): Observable<Object> {
    const topAllURL: string = this._baseURL + '/api/maps/downloads/0';
    return this._http.get(topAllURL);
  }

  public getSongInformationJSON(key: string): Observable<Object> {
    const songInfoURL: string = this._baseURL + '/api/maps/detail/' + key;
    return this._http.get(songInfoURL);
  }

  public getSongCoverImageURL(key: string): string {
    const songCoverBaseURL: string = this._baseURL + '/storage/songs';
    const id: string = this._getSongIdFromTheKey(key);
    return songCoverBaseURL + '/' + id + '/' + key + '.png'
  }

  public getZipFileToPlayTheSong(downloadURL: string): ZipLoader {    
    const loader = new ZipLoader(this._baseURL + downloadURL);
    return loader;
  }

  public getSongResources(song: Song): Observable<Resources> {
    return new Observable((observer)=> {
      let resources: Resources = {audioBlobUrl: '', dificulties: []};
      let loader = this.getZipFileToPlayTheSong(song.downloadUrl);
      loader.on('load', () => {
        Object.keys(loader.files).forEach(filename => {
          if (filename.endsWith('egg') || filename.endsWith('ogg')) {
            resources.audioBlobUrl = loader.extractAsBlobUrl(filename, 'audio/ogg');
          }
          if (song.difficulties.easy && filename.endsWith(`Easy.dat`)) {
            resources.dificulties.push({dificulty: Difficulties.easy, json: loader.extractAsJSON(filename)});
          }
          if (song.difficulties.normal && filename.endsWith(`Normal.dat`)) {
            resources.dificulties.push({dificulty: Difficulties.normal, json: loader.extractAsJSON(filename)});
          }
          if (song.difficulties.hard && filename.endsWith(`Hard.dat`)) {
            resources.dificulties.push({dificulty: Difficulties.hard, json: loader.extractAsJSON(filename)});
          }
          if (song.difficulties.expert && filename.endsWith(`Expert.dat`)) {
            resources.dificulties.push({dificulty: Difficulties.expert, json: loader.extractAsJSON(filename)});
          }
          if (song.difficulties.expertPlus && filename.endsWith(`ExpertPlus.dat`)) {
            resources.dificulties.push({dificulty: Difficulties.expertPlus, json: loader.extractAsJSON(filename)});
          }
        });
        observer.next(resources);
      });
      loader.load();
    });
  }

  private _getSongIdFromTheKey(key: string): string {
    return key.split('-')[0];
  }
}
