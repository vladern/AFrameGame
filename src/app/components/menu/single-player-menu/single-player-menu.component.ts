import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/shared/song/song.model';
import { SongLevels } from 'src/app/shared/song/song-levels.enum';
import { SceneOrchestratorService } from 'src/app/services/scene-orchestrator.service';
import { Scene } from 'src/app/shared/scene/scene.enum';

@Component({
  selector: 'a-single-player-menu',
  templateUrl: './single-player-menu.component.html',
  styleUrls: ['./single-player-menu.component.css']
})
export class SinglePlayerMenuComponent implements OnInit {

  constructor(private _sceneOrchestratorSrv: SceneOrchestratorService) { }

  private _songs: Song[];
  private _selectedSong: Song;

  ngOnInit() {
    this._songs = [
      {name: 'Random song number 1', levels: [SongLevels.easy, SongLevels.normal, SongLevels.hard], timeInSeconds: 90},
      {name: 'Random song number 2', levels: [SongLevels.easy, SongLevels.normal, SongLevels.hard], timeInSeconds: 90},
      {name: 'Random song number 3', levels: [SongLevels.easy, SongLevels.normal, SongLevels.hard], timeInSeconds: 90},
      {name: 'Random song number 4', levels: [SongLevels.easy, SongLevels.normal, SongLevels.hard], timeInSeconds: 90},
    ];

    this._selectedSong = {name: 'Random song number 1', levels: [SongLevels.easy, SongLevels.normal, SongLevels.hard], timeInSeconds: 90};
  }

  get songs(): Song[] {
    return this._songs;
  }

  set songs(songs: Song[]) {
    this._songs = songs;
  }

  get selectedSong() {
    return this._selectedSong;
  }

  set selectedSong(songSelected: Song) {
    this._selectedSong = songSelected;
  }

  selectTheSong(song: Song) {
    this._selectedSong = song;
  }

  goToInitialMenu() {
    this._sceneOrchestratorSrv.actualScene = Scene.initialMenu;
  }
}
