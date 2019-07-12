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
  private _selectedDifficulty: string = '';
  private _songSrvSubscription: Subscription;
  private _showSongDifficulties: boolean = false;
  private _showSongInfo: boolean = false;
  private _showScrollDownBtn: boolean = true;
  private _showScrollUpBtn: boolean = false;
  private _firstSongShownIndex: number = 0;
  private _lastSongShownIndex: number = 4;

  ngOnInit() {
    this.obtainSongsToBeShown();
  }

  public get showScrollUpBtn(): boolean {
    return this._showScrollUpBtn;
  }
  public set showScrollUpBtn(value: boolean) {
    this._showScrollUpBtn = value;
  }

  public get showScrollDownBtn(): boolean {
    return this._showScrollDownBtn;
  }
  public set showScrollDownBtn(value: boolean) {
    this._showScrollDownBtn = value;
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

  selectTheDifficulty(difficulty: string) {
    this._selectedDifficulty = difficulty;
    this.showSongInfo = true;
  }

  getSongNameToShow() {
    return this._selectedSong.songName;
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

  goToInitialMenu() {
    this._sceneOrchestratorSrv.actualScene = Scene.initialMenu;
  }

  goToGame() {
    this._sceneOrchestratorSrv.actualScene = Scene.game;
  }

  nextSongsToBeShown() {
    let nextIndex: number = this._lastSongShownIndex + 5;
    let ok = true;
    while (ok) {
      if (nextIndex > this._songs.length) {
        nextIndex--;
      } else {
        this._songsToBeShown = this._songs.slice(this._lastSongShownIndex + 1, nextIndex + 1);
        if (this._songsToBeShown.length < 5) {
          this.showScrollDownBtn = false;
        } else {
          this.showScrollDownBtn = true;
        }
        this._firstSongShownIndex = this._lastSongShownIndex;
        this._lastSongShownIndex = nextIndex;
        this.showScrollUpBtn = true;
        ok = false;
      }
    }
  }

  lastSongsToBeShown() {
    let a = this._firstSongShownIndex - 5;
    let b = this._firstSongShownIndex - 5;

    if (a < 0) {
      a = 0;
    }
    if (b < 4) {
      b = 4;
    }
    if (b - a < 4) {
      b = (this._songs.length - 1) - this.songsToBeShown.length;
    }
    this._firstSongShownIndex = a;
    this._lastSongShownIndex = b;
    if (this._firstSongShownIndex === 0) {
      this.showScrollUpBtn = false;
    }
    this._songsToBeShown = this._songs.slice(a, b + 1);
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
