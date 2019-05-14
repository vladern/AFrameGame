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
  private _selectedDifficulty: number = -1;
  private _songSrvSubscription: Subscription;
  private _showSongDifficulties: boolean = false;
  private _showSongInfo: boolean = false; 
  
  ngOnInit() {
    this.obtainSongsToBeShown();
  }

  public get showSongInfo(): boolean {
    return this._showSongInfo;
  }
  public set showSongInfo(value: boolean) {
    this._showSongInfo = value;
  }

  public get showSongDifficulties(): boolean {
    return this._showSongDifficulties;
  }
  public set showSongDifficulties(value: boolean) {
    this._showSongDifficulties = value;
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
    this.showSongDifficulties = true;
    this.showSongInfo = false;
  }

  selectTheDifficulty(index: number) {
    this._selectedDifficulty = index;
    this.showSongInfo = true;
  }

  getSongNameToShow() {
    return  this._selectedSong.songName;
  }

  getAuthorNameToShow() {
    return this._selectedSong.authorName;
  }

  getSongSubnameToShow() {
    return this._selectedSong.songSubName;
  }

  getBPMToShow() {
    return 'Beats per minute: ' + this._selectedSong.bpm;
  }

  getDurationToShow() {
    const min: number = Math.round(this.selectedSong.difficulties[0].stats.time / this.selectedSong.bpm);
    const seg: number = Math.round((this.selectedSong.difficulties[0].stats.time / this.selectedSong.bpm - min)*100); 
    return 'Duration: ' + min + 'm' + seg + 's';
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
