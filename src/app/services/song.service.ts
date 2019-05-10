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
      this._beatsaverAPIsrv.getSongInformationJSON(key).subscribe((response) => {
        if (response != undefined || response != null) {
          const song: Song = FormatHelper.formatFromSongInformationJSONToSong(response);
          observer.next(song);
        }
    });
    });
  }
}
