import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SinglePlayerMenuComponent } from './single-player-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { Song } from 'src/app/shared/song/song.model';
import { SongService } from 'src/app/services/song.service';
import { SceneOrchestratorService } from 'src/app/services/scene-orchestrator.service';
import { of, Observable, defer } from 'rxjs';
import { Difficulties } from 'src/app/shared/difficulty/difficulties.model';
import { Scene } from 'src/app/shared/scene/scene.enum';

describe('SinglePlayerMenuComponent', () => {
  let component: SinglePlayerMenuComponent;
  let fixture: ComponentFixture<SinglePlayerMenuComponent>;
  let songService: SongService;
  let songs: Song[];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SinglePlayerMenuComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [SinglePlayerMenuComponent],
      imports: [HttpClientModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePlayerMenuComponent);
    component = fixture.componentInstance;
    songService = TestBed.get(SongService);
    fixture.detectChanges();
    songs = JSON.parse('[{"id":"5cff620c48229f7d88fc60e9","key":"b","songName":"Believer","songSubName":"Imagine Dragons","authorName":"Rustic","bpm":125,"difficulties":{"easy":false,"normal":false,"hard":false,"expert":true,"expertPlus":false},"downloadUrl":"/api/download/key/b","coverUrl":"/cdn/b/19f2879d11a91b51a5c090d63471c3e8d9b7aee3.jpg"},{"id":"5cff620c48229f7d88fc63dd","key":"32e","songName":"Harder Better Faster Stronger","songSubName":"Daft Punk","authorName":"RunRockGame","bpm":123,"difficulties":{"easy":false,"normal":false,"hard":true,"expert":true,"expertPlus":false},"downloadUrl":"/api/download/key/32e","coverUrl":"/cdn/32e/7c7f38d467bb43fe11a142581e63e324622ecc71.jpg"},{"id":"5cff620c48229f7d88fc620d","key":"141","songName":"Gangnam Style","songSubName":"PSY","authorName":"GreatYazer","bpm":132,"difficulties":{"easy":false,"normal":true,"hard":true,"expert":true,"expertPlus":false},"downloadUrl":"/api/download/key/141","coverUrl":"/cdn/141/8e7e553099436af31564adf1977a5ec42a61cfff.jpg"},{"id":"5cff620c48229f7d88fc62d6","key":"217","songName":"Beat it","songSubName":"Michael Jackson","authorName":"Freeek","bpm":139,"difficulties":{"easy":true,"normal":true,"hard":true,"expert":true,"expertPlus":false},"downloadUrl":"/api/download/key/217","coverUrl":"/cdn/217/4b2da842b687ec4cfbc948c583c21c79d4120de0.jpg"},{"id":"5cff620c48229f7d88fc60e7","key":"9","songName":"Take On Me","songSubName":"","authorName":"a-ha","bpm":168,"difficulties":{"easy":false,"normal":false,"hard":false,"expert":true,"expertPlus":false},"downloadUrl":"/api/download/key/9","coverUrl":"/cdn/9/2aa1f5192828e075c30dd015b1e132bba912eb86.jpg"},{"id":"5cff620c48229f7d88fc60e7","key":"9","songName":"Take On Me","songSubName":"","authorName":"a-ha","bpm":168,"difficulties":{"easy":false,"normal":false,"hard":false,"expert":true,"expertPlus":false},"downloadUrl":"/api/download/key/9","coverUrl":"/cdn/9/2aa1f5192828e075c30dd015b1e132bba912eb86.jpg"}]');
    songs.forEach(element => {
      element.difficulties = new Difficulties(element.difficulties.easy, element.difficulties.normal, element.difficulties.hard, element.difficulties.expert, element.difficulties.expertPlus);
    });
    spyOn(songService, 'getTopRaitedSongsList').and.returnValue(new Observable((observer) => observer.next(songs)));
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('On init the component shold get the songs', fakeAsync(() => {
    expect(component.songsToBeShown.length).toBeGreaterThan(0);
  }));

  it('When a song is selected, the panel with dificulties should apear', fakeAsync(() => {
    const selectedSong: Song = component.songsToBeShown[0];
    component.selectTheSong(selectedSong);
    fixture.detectChanges();
    const dificultiesPanel = fixture.debugElement.nativeElement.querySelector('#levelSelectionPanel');
    expect(dificultiesPanel).toBeTruthy();
  }));

  it('While a song is no selected the panel with dificulties should not apear', () => {
    const dificultiesPanel = fixture.debugElement.nativeElement.querySelector('#levelSelectionPanel');
    expect(dificultiesPanel).toBeNull();
  });

  it('Level selection panel should have slected song dificulties', () => {
    const selectedSong: Song = component.songsToBeShown[1];
    component.selectTheSong(selectedSong);
    fixture.detectChanges();
    const dificulties = fixture.debugElement.nativeElement.querySelectorAll('#difficultyBtn');
    expect(dificulties.length).toBe(selectedSong.difficulties.length);
  });

  it('While a difficulty is no selected song information panel should not apear', () => {
    const selectedSong: Song = component.songsToBeShown[1];
    component.selectTheSong(selectedSong);
    fixture.detectChanges();
    const songInfoPanel = fixture.debugElement.nativeElement.querySelector('#songInformationAndPlayPanel');
    expect(songInfoPanel).toBeNull();
  });

  it('When you click on a dificulty button should apear information panel', () => {
    const selectedSong: Song = component.songsToBeShown[1];
    component.selectTheSong(selectedSong);
    fixture.detectChanges();
    const dificulties = fixture.debugElement.nativeElement.querySelectorAll('#difficultyBtn');
    dificulties[0].click();
    fixture.detectChanges();
    const songInfoPanel = fixture.debugElement.nativeElement.querySelector('#songInformationAndPlayPanel');
    expect(songInfoPanel).toBeTruthy();
  });

  it('Information of song information panel should be coherent', () => {
    const selectedSong: Song = component.songsToBeShown[0];
    component.selectTheSong(selectedSong);
    fixture.detectChanges();
    const dificulties = fixture.debugElement.nativeElement.querySelectorAll('#difficultyBtn');
    dificulties[0].click();
    fixture.detectChanges();
    const songName = fixture.debugElement.nativeElement.querySelector('#songName');
    expect(songName.getAttribute('value')).toBe('Believer', 'songs name should be Beliver');
    const authorName = fixture.debugElement.nativeElement.querySelector('#authorName');
    expect(authorName.getAttribute('value')).toBe('Rustic', 'author name should be Rustic');
    const songSubName = fixture.debugElement.nativeElement.querySelector('#songSubName');
    expect(songSubName.getAttribute('value')).toBe('Imagine Dragons', 'song subname should be Imagine Dragons');
    const bpm = fixture.debugElement.nativeElement.querySelector('#bpm');
    expect(bpm.getAttribute('value')).toBe('Beats per minute: 125', 'beats per minute should be 125');
  });

  it('When you click on scroll down button, list of song should change', () => {
    const oldShownSongs: Song[] = component.songsToBeShown.map(x => Object.assign({}, x));
    const scrollDownBtn = fixture.debugElement.nativeElement.querySelector('#scrollDownBtn');
    scrollDownBtn.click();
    fixture.detectChanges();
    expect(component.songsToBeShown[0].id).not.toBe(oldShownSongs[0].id);
  });

  it('When list of songs shown is under 5, down button should not to be shown', () => {
    let scrollDownBtn = fixture.debugElement.nativeElement.querySelector('#scrollDownBtn');
    scrollDownBtn.click();
    fixture.detectChanges();
    scrollDownBtn = fixture.debugElement.nativeElement.querySelector('#scrollDownBtn');
    expect(scrollDownBtn).toBeNull();
  });

  it('When you click on scroll up button, list of song should change', () => {
    const scrollDownBtn = fixture.debugElement.nativeElement.querySelector('#scrollDownBtn');
    scrollDownBtn.click();
    fixture.detectChanges();
    const oldShownSongs: Song[] = component.songsToBeShown.map(x => Object.assign({}, x));
    const scrollUpBtn = fixture.debugElement.nativeElement.querySelector('#scrollUpBtn');
    scrollUpBtn.click();
    fixture.detectChanges();
    expect(component.songsToBeShown[0].id).not.toBe(oldShownSongs[0].id);
  });

  it('At the begining, up button should not apear', () => {
    const scrollUpBtn = fixture.debugElement.nativeElement.querySelector('#scrollUpBtn');
    expect(scrollUpBtn).toBeNull();
  });

  it('When you return to the top of disponible songs, up button should disapear', () => {
    const scrollDownBtn = fixture.debugElement.nativeElement.querySelector('#scrollDownBtn');
    scrollDownBtn.click();
    fixture.detectChanges();
    let scrollUpBtn = fixture.debugElement.nativeElement.querySelector('#scrollUpBtn');
    scrollUpBtn.click();
    fixture.detectChanges();
    scrollUpBtn = fixture.debugElement.nativeElement.querySelector('#scrollUpBtn');
    expect(scrollUpBtn).toBeNull();
  });

  it('When you return to the top of disponible songs, this songs should be the same as at the begining', () => {
    const oldShownSongs: Song[] = component.songsToBeShown.map(x => Object.assign({}, x));
    const scrollDownBtn = fixture.debugElement.nativeElement.querySelector('#scrollDownBtn');
    scrollDownBtn.click();
    fixture.detectChanges();
    expect(component.songsToBeShown.length).toBe(1);
    const scrollUpBtn = fixture.debugElement.nativeElement.querySelector('#scrollUpBtn');
    scrollUpBtn.click();
    fixture.detectChanges();
    expect(component.songsToBeShown.length).toBe(oldShownSongs.length);
    expect(component.songsToBeShown[0].id).toBe(oldShownSongs[0].id, '0');
    expect(component.songsToBeShown[1].id).toBe(oldShownSongs[1].id, '1');
    expect(component.songsToBeShown[2].id).toBe(oldShownSongs[2].id, '2');
    expect(component.songsToBeShown[3].id).toBe(oldShownSongs[3].id, '3');
    expect(component.songsToBeShown[4].id).toBe(oldShownSongs[4].id, '4');
  });

  it('When play button is clicked should go to game area', () => {
    const selectedSong: Song = component.songsToBeShown[0];
    component.selectTheSong(selectedSong);
    fixture.detectChanges();
    const dificulties = fixture.debugElement.nativeElement.querySelectorAll('#difficultyBtn');
    dificulties[0].click();
    fixture.detectChanges();
    spyOn(component, 'goToGame');
    const playBtn = fixture.debugElement.nativeElement.querySelector('#playBtn');
    playBtn.click();
    expect(component.goToGame).toHaveBeenCalled();
  });

});