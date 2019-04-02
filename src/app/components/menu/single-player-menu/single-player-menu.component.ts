import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/shared/song/song.model';
import { SongLevels } from 'src/app/shared/song/song-levels.enum';

@Component({
  selector: 'a-single-player-menu',
  templateUrl: './single-player-menu.component.html',
  styleUrls: ['./single-player-menu.component.css']
})
export class SinglePlayerMenuComponent implements OnInit {

  constructor() { }

  private _songs: Song[];
  private _selectedSong: Song;

  ngOnInit() {
    this._songs = [
      {name: 'Random song number 1', levels: [SongLevels.easy, SongLevels.normal, SongLevels.hard], timeInSeconds: 90},
      {name: 'Random song number 2', levels: [SongLevels.easy, SongLevels.normal, SongLevels.hard], timeInSeconds: 90},
      {name: 'Random song number 3', levels: [SongLevels.easy, SongLevels.normal, SongLevels.hard], timeInSeconds: 90},
      {name: 'Random song number 4', levels: [SongLevels.easy, SongLevels.normal, SongLevels.hard], timeInSeconds: 90},
    ];
  }

  get songs(): Song[] {
    return this._songs;
  }

  set songs(songs: Song[]) {
    this._songs = songs;
  }

  get songSelected() {
    return this._selectedSong;
  }

  set songSelected(songSelected: Song) {
    this._selectedSong = songSelected;
  }

  selectTheSong(song: Song) {
    this.songSelected = song;
  }
}
