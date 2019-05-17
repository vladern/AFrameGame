import { Injectable } from '@angular/core';
import { Song } from '../shared/song/song.model';
import { BeatsaverAPIService } from 'src/app/services/beatsaverAPI.service';
import { Observable } from 'rxjs';
import { FormatHelper } from '../helpers/format-helper';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private _beatsaverAPIsrv: BeatsaverAPIService) { }

  public getSongByKey(key: string): Observable<Song> {
    return new Observable((observer) => {
      this._beatsaverAPIsrv.getSongInformationJSON(key).subscribe((response: any) => {
        if (response != undefined && response != null) {
          const song: Song = FormatHelper.formatFromSongInformationJSONToSong(response.song);
          observer.next(song);
        }
      });
    });
  }

  public getTopRaitedSongsList(): Observable<Song[]> {
    return new Observable((observer) => {
      this._beatsaverAPIsrv.getTOPAllSongsJSON().subscribe((response: any) => {
        let songsList: Song[] = [];
        if (response != undefined && response != null) {
          response.songs.forEach(element => {
            const song: Song = FormatHelper.formatFromSongInformationJSONToSong(element);
            songsList.push(song);
          });
          observer.next(songsList);
        }
      });
    });
  }
}
