import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SinglePlayerMenuComponent } from './single-player-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { Song } from 'src/app/shared/song/song.model';
import { SongService } from 'src/app/services/song.service';
import { SceneOrchestratorService } from 'src/app/services/scene-orchestrator.service';
import { of, Observable, defer } from 'rxjs';

fdescribe('SinglePlayerMenuComponent', () => {
  let component: SinglePlayerMenuComponent;
  let fixture: ComponentFixture<SinglePlayerMenuComponent>;
  let songService: SongService;


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
    let songs: Song[] = JSON.parse('[{"id":31,"key":"31-11","songName":"Believer","songSubName":"Imagine Dragons","authorName":"Rustic","bpm":125,"difficulties":[{"difficulty":"Expert","audioPath":"song.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":418,"events":551,"notes":546,"obstacles":10}}],"downloadUrl":"https://beatsaver.com/download/31-11","coverUrl":"https://beatsaver.com/storage/songs/31/31-11.jpg"},{"id":1183,"key":"1183-814","songName":"Harder Better Faster Stronger","songSubName":"Daft Punk","authorName":"RunRockGame","bpm":123,"difficulties":[{"difficulty":"Hard","audioPath":"Daft Punk - Harder Better Faster Stronger.ogg","jsonPath":"Hard.json","rank":4,"stats":{"time":640.7428588867187,"events":1618,"notes":480,"obstacles":33}},{"difficulty":"Expert","audioPath":"Daft Punk - Harder Better Faster Stronger.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":640.7428588867187,"events":1618,"notes":684,"obstacles":33}}],"downloadUrl":"https://beatsaver.com/download/1183-814","coverUrl":"https://beatsaver.com/storage/songs/1183/1183-814.jpg"},{"id":811,"key":"811-535","songName":"Beat it","songSubName":"Michael Jackson","authorName":"Freeek","bpm":139,"difficulties":[{"difficulty":"Easy","audioPath":"Beat it.ogg","jsonPath":"Easy.json","rank":4,"stats":{"time":328.556396484375,"events":878,"notes":188,"obstacles":84}},{"difficulty":"Normal","audioPath":"Beat it.ogg","jsonPath":"Normal.json","rank":4,"stats":{"time":328.681396484375,"events":878,"notes":259,"obstacles":70}},{"difficulty":"Hard","audioPath":"Beat it.ogg","jsonPath":"Hard.json","rank":4,"stats":{"time":328.681396484375,"events":878,"notes":428,"obstacles":72}},{"difficulty":"Expert","audioPath":"Beat it.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":328.681396484375,"events":878,"notes":669,"obstacles":69}}],"downloadUrl":"https://beatsaver.com/download/811-535","coverUrl":"https://beatsaver.com/storage/songs/811/811-535.jpg"},{"id":517,"key":"517-321","songName":"Gangnam Style","songSubName":"PSY","authorName":"GreatYazer","bpm":132,"difficulties":[{"difficulty":"Normal","audioPath":"song.ogg","jsonPath":"Normal.json","rank":4,"stats":{"time":468,"events":735,"notes":419,"obstacles":42}},{"difficulty":"Hard","audioPath":"song.ogg","jsonPath":"Hard.json","rank":4,"stats":{"time":468,"events":735,"notes":735,"obstacles":94}},{"difficulty":"Expert","audioPath":"Song.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":468,"events":735,"notes":982,"obstacles":103}}],"downloadUrl":"https://beatsaver.com/download/517-321","coverUrl":"https://beatsaver.com/storage/songs/517/517-321.jpg"},{"id":27,"key":"27-9","songName":"Take On Me","songSubName":"","authorName":"a-ha","bpm":168,"difficulties":[{"difficulty":"Expert","audioPath":"song.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":384,"events":1,"notes":505,"obstacles":52}}],"downloadUrl":"https://beatsaver.com/download/27-9","coverUrl":"https://beatsaver.com/storage/songs/27/27-9.jpg"},{"id":28,"key":"28-9","songName":"Take On Me 28","songSubName":"","authorName":"a-ha","bpm":168,"difficulties":[{"difficulty":"Expert","audioPath":"song.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":384,"events":1,"notes":505,"obstacles":52}}],"downloadUrl":"https://beatsaver.com/download/27-9","coverUrl":"https://beatsaver.com/storage/songs/27/27-9.jpg"}]');
    spyOn(songService, 'getTopRaitedSongsList').and.returnValue(new Observable((observer) => observer.next(songs)));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('On init the component shold get the songs', fakeAsync(() => {
    component.ngOnInit();
    expect(component.songsToBeShown.length).toBeGreaterThan(0);
  }));

  it('When a song is selected, the panel with dificulties should apear', fakeAsync(() => {
    component.ngOnInit();
    const selectedSong: Song = component.songsToBeShown[0];
    component.selectTheSong(selectedSong);
    fixture.detectChanges();
    let dificultiesPanel = fixture.debugElement.nativeElement.querySelector('#levelSelectionPanel');
    expect(dificultiesPanel).toBeTruthy();
  }));

  it('While a song is no selected the panel with dificulties should not apear', () => {
    let dificultiesPanel = fixture.debugElement.nativeElement.querySelector('#levelSelectionPanel');
    expect(dificultiesPanel).toBeNull();
  });

  it('Level selection panel should have slected song dificulties', () => {
    component.ngOnInit();
    const selectedSong: Song = component.songsToBeShown[1];
    component.selectTheSong(selectedSong);
    fixture.detectChanges();
    let dificulties = fixture.debugElement.nativeElement.querySelectorAll('#difficultyBtn');
    expect(dificulties.length).toBe(selectedSong.difficulties.length);
  });

  it('The name of the level button should be coherent', () => {
    component.ngOnInit();
    const selectedSong: Song = component.songsToBeShown[1];
    component.selectTheSong(selectedSong);
    fixture.detectChanges();
    let dificulties = fixture.debugElement.nativeElement.querySelectorAll('#difficultyBtn');
    expect(dificulties[0].getAttribute('value')).toBe(selectedSong.difficulties[0].difficulty, 'first button should be Hard');
    expect(dificulties[1].getAttribute('value')).toBe(selectedSong.difficulties[1].difficulty, 'second button should be Expert');
  });

  it('While a difficulty is no selected song information panel should not apear', () => {
    component.ngOnInit();
    const selectedSong: Song = component.songsToBeShown[1];
    component.selectTheSong(selectedSong);
    fixture.detectChanges();
    let songInfoPanel = fixture.debugElement.nativeElement.querySelector('#songInformationAndPlayPanel');
    expect(songInfoPanel).toBeNull();
  });

  it('When you click on a dificulty button should apear information panel', () => {
    component.ngOnInit();
    const selectedSong: Song = component.songsToBeShown[1];
    component.selectTheSong(selectedSong);
    fixture.detectChanges();
    let dificulties = fixture.debugElement.nativeElement.querySelectorAll('#difficultyBtn');
    dificulties[0].click();
    fixture.detectChanges();
    let songInfoPanel = fixture.debugElement.nativeElement.querySelector('#songInformationAndPlayPanel');
    expect(songInfoPanel).toBeTruthy();
  });

  it('Information of song information panel should be coherent', () => {
    component.ngOnInit();
    const selectedSong: Song = component.songsToBeShown[0];
    component.selectTheSong(selectedSong);
    fixture.detectChanges();
    let dificulties = fixture.debugElement.nativeElement.querySelectorAll('#difficultyBtn');
    dificulties[0].click();
    fixture.detectChanges();
    let songName = fixture.debugElement.nativeElement.querySelector('#songName');
    expect(songName.getAttribute('value')).toBe('Believer', 'songs name should be Beliver');
    let authorName = fixture.debugElement.nativeElement.querySelector('#authorName');
    expect(authorName.getAttribute('value')).toBe('Rustic', 'author name should be Rustic');
    let songSubName = fixture.debugElement.nativeElement.querySelector('#songSubName');
    expect(songSubName.getAttribute('value')).toBe('Imagine Dragons', 'song subname should be Imagine Dragons');
    let bpm = fixture.debugElement.nativeElement.querySelector('#bpm');
    expect(bpm.getAttribute('value')).toBe('Beats per minute: 125', 'beats per minute should be 125');
    let duration = fixture.debugElement.nativeElement.querySelector('#duration');
    const min: number = Math.round(selectedSong.difficulties[0].stats.time / selectedSong.bpm);
    const seg: number = Math.round((selectedSong.difficulties[0].stats.time / selectedSong.bpm - min)*100); 
    expect(duration.getAttribute('value')).toBe('Duration: ' + min + 'm' + seg + 's', 'duration of the song');
  });

  it('When you click on scroll down button, list of song should change', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const oldShownSongs: Song[] = component.songsToBeShown.map(x => Object.assign({}, x));
    let scrollDownBtn = fixture.debugElement.nativeElement.querySelector('#scrollDownBtn');
    scrollDownBtn.click();
    fixture.detectChanges();
    expect(component.songsToBeShown[0].id).not.toBe(oldShownSongs[0].id);
  });

  it('When list of songs shown is under 5 down button should not to be shown', () => {
    component.ngOnInit();
    fixture.detectChanges();
    let scrollDownBtn = fixture.debugElement.nativeElement.querySelector('#scrollDownBtn');
    scrollDownBtn.click();
    fixture.detectChanges();
    scrollDownBtn = fixture.debugElement.nativeElement.querySelector('#scrollDownBtn');
    expect(scrollDownBtn).toBeNull();
  });

});
