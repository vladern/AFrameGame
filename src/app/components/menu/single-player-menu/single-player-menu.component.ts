import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/shared/song/song.model';
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
