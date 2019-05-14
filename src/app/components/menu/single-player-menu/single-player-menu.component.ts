import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/shared/song/song.model';
import { SceneOrchestratorService } from 'src/app/services/scene-orchestrator.service';
import { Scene } from 'src/app/shared/scene/scene.enum';
import { SongService } from 'src/app/services/song.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'a-single-player-menu',
  templateUrl: './single-player-menu.component.html',
  styleUrls: ['./single-player-menu.component.css']
})
export class SinglePlayerMenuComponent implements OnInit {

  constructor(private _sceneOrchestratorSrv: SceneOrchestratorService,
    private _songSrv: SongService) { }

  private _songs: Song[];
  private _songsToBeShown: Song[];
  private _selectedSong: Song;
  private _songSrvSubscription: Subscription;

  ngOnInit() {
    this.obtainSongsToBeShown();
  }

  public get songsToBeShown(): Song[] {
    return this._songsToBeShown;
  }
  public set songsToBeShown(value: Song[]) {
    this._songsToBeShown = value;
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

  public obtainSongsToBeShown() {
    this._songSrvSubscription = this._songSrv.getTopRaitedSongsList().subscribe(
      (result: Song[]) => {
        this._songs = result;
        if (result.length >= 5) {
          this._songsToBeShown = result.slice(0, 5);
        } else {
          this._songsToBeShown = result;
        }
      });
  }
}
