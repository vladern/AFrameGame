import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SinglePlayerMenuComponent } from './single-player-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { Song } from 'src/app/shared/song/song.model';
import { SongService } from 'src/app/services/song.service';
import { SceneOrchestratorService } from 'src/app/services/scene-orchestrator.service';
import { of, Observable, defer } from 'rxjs';

export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

const songServiceStub = {
  getTopRaitedSongsList() {
    let songs: Song[] = JSON.parse('[{"id":31,"key":"31-11","songName":"Believer","songSubName":"Imagine Dragons","authorName":"Rustic","bpm":125,"difficulties":[{"difficulty":"Expert","audioPath":"song.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":418,"events":551,"notes":546,"obstacles":10}}],"downloadUrl":"https://beatsaver.com/download/31-11","coverUrl":"https://beatsaver.com/storage/songs/31/31-11.jpg"},{"id":1183,"key":"1183-814","songName":"Harder Better Faster Stronger","songSubName":"Daft Punk","authorName":"RunRockGame","bpm":123,"difficulties":[{"difficulty":"Hard","audioPath":"Daft Punk - Harder Better Faster Stronger.ogg","jsonPath":"Hard.json","rank":4,"stats":{"time":640.7428588867187,"events":1618,"notes":480,"obstacles":33}},{"difficulty":"Expert","audioPath":"Daft Punk - Harder Better Faster Stronger.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":640.7428588867187,"events":1618,"notes":684,"obstacles":33}}],"downloadUrl":"https://beatsaver.com/download/1183-814","coverUrl":"https://beatsaver.com/storage/songs/1183/1183-814.jpg"},{"id":811,"key":"811-535","songName":"Beat it","songSubName":"Michael Jackson","authorName":"Freeek","bpm":139,"difficulties":[{"difficulty":"Easy","audioPath":"Beat it.ogg","jsonPath":"Easy.json","rank":4,"stats":{"time":328.556396484375,"events":878,"notes":188,"obstacles":84}},{"difficulty":"Normal","audioPath":"Beat it.ogg","jsonPath":"Normal.json","rank":4,"stats":{"time":328.681396484375,"events":878,"notes":259,"obstacles":70}},{"difficulty":"Hard","audioPath":"Beat it.ogg","jsonPath":"Hard.json","rank":4,"stats":{"time":328.681396484375,"events":878,"notes":428,"obstacles":72}},{"difficulty":"Expert","audioPath":"Beat it.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":328.681396484375,"events":878,"notes":669,"obstacles":69}}],"downloadUrl":"https://beatsaver.com/download/811-535","coverUrl":"https://beatsaver.com/storage/songs/811/811-535.jpg"},{"id":517,"key":"517-321","songName":"Gangnam Style","songSubName":"PSY","authorName":"GreatYazer","bpm":132,"difficulties":[{"difficulty":"Normal","audioPath":"song.ogg","jsonPath":"Normal.json","rank":4,"stats":{"time":468,"events":735,"notes":419,"obstacles":42}},{"difficulty":"Hard","audioPath":"song.ogg","jsonPath":"Hard.json","rank":4,"stats":{"time":468,"events":735,"notes":735,"obstacles":94}},{"difficulty":"Expert","audioPath":"Song.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":468,"events":735,"notes":982,"obstacles":103}}],"downloadUrl":"https://beatsaver.com/download/517-321","coverUrl":"https://beatsaver.com/storage/songs/517/517-321.jpg"},{"id":27,"key":"27-9","songName":"Take On Me","songSubName":"","authorName":"a-ha","bpm":168,"difficulties":[{"difficulty":"Expert","audioPath":"song.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":384,"events":1,"notes":505,"obstacles":52}}],"downloadUrl":"https://beatsaver.com/download/27-9","coverUrl":"https://beatsaver.com/storage/songs/27/27-9.jpg"}]');
    return fakeAsyncResponse(songs);
  }
};

fdescribe('SinglePlayerMenuComponent', () => {
  let component: SinglePlayerMenuComponent;
  let fixture: ComponentFixture<SinglePlayerMenuComponent>;
  let songService: SongService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePlayerMenuComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [SinglePlayerMenuComponent],
      imports: [ HttpClientModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePlayerMenuComponent);
    component = fixture.componentInstance;
    songService = TestBed.get(SongService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('On init the component shold get the songs', fakeAsync(() => {
    let songs: Song[] = JSON.parse('[{"id":31,"key":"31-11","songName":"Believer","songSubName":"Imagine Dragons","authorName":"Rustic","bpm":125,"difficulties":[{"difficulty":"Expert","audioPath":"song.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":418,"events":551,"notes":546,"obstacles":10}}],"downloadUrl":"https://beatsaver.com/download/31-11","coverUrl":"https://beatsaver.com/storage/songs/31/31-11.jpg"},{"id":1183,"key":"1183-814","songName":"Harder Better Faster Stronger","songSubName":"Daft Punk","authorName":"RunRockGame","bpm":123,"difficulties":[{"difficulty":"Hard","audioPath":"Daft Punk - Harder Better Faster Stronger.ogg","jsonPath":"Hard.json","rank":4,"stats":{"time":640.7428588867187,"events":1618,"notes":480,"obstacles":33}},{"difficulty":"Expert","audioPath":"Daft Punk - Harder Better Faster Stronger.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":640.7428588867187,"events":1618,"notes":684,"obstacles":33}}],"downloadUrl":"https://beatsaver.com/download/1183-814","coverUrl":"https://beatsaver.com/storage/songs/1183/1183-814.jpg"},{"id":811,"key":"811-535","songName":"Beat it","songSubName":"Michael Jackson","authorName":"Freeek","bpm":139,"difficulties":[{"difficulty":"Easy","audioPath":"Beat it.ogg","jsonPath":"Easy.json","rank":4,"stats":{"time":328.556396484375,"events":878,"notes":188,"obstacles":84}},{"difficulty":"Normal","audioPath":"Beat it.ogg","jsonPath":"Normal.json","rank":4,"stats":{"time":328.681396484375,"events":878,"notes":259,"obstacles":70}},{"difficulty":"Hard","audioPath":"Beat it.ogg","jsonPath":"Hard.json","rank":4,"stats":{"time":328.681396484375,"events":878,"notes":428,"obstacles":72}},{"difficulty":"Expert","audioPath":"Beat it.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":328.681396484375,"events":878,"notes":669,"obstacles":69}}],"downloadUrl":"https://beatsaver.com/download/811-535","coverUrl":"https://beatsaver.com/storage/songs/811/811-535.jpg"},{"id":517,"key":"517-321","songName":"Gangnam Style","songSubName":"PSY","authorName":"GreatYazer","bpm":132,"difficulties":[{"difficulty":"Normal","audioPath":"song.ogg","jsonPath":"Normal.json","rank":4,"stats":{"time":468,"events":735,"notes":419,"obstacles":42}},{"difficulty":"Hard","audioPath":"song.ogg","jsonPath":"Hard.json","rank":4,"stats":{"time":468,"events":735,"notes":735,"obstacles":94}},{"difficulty":"Expert","audioPath":"Song.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":468,"events":735,"notes":982,"obstacles":103}}],"downloadUrl":"https://beatsaver.com/download/517-321","coverUrl":"https://beatsaver.com/storage/songs/517/517-321.jpg"},{"id":27,"key":"27-9","songName":"Take On Me","songSubName":"","authorName":"a-ha","bpm":168,"difficulties":[{"difficulty":"Expert","audioPath":"song.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":384,"events":1,"notes":505,"obstacles":52}}],"downloadUrl":"https://beatsaver.com/download/27-9","coverUrl":"https://beatsaver.com/storage/songs/27/27-9.jpg"}]');
    spyOn(songService, 'getTopRaitedSongsList').and.returnValue(new Observable((observer)=> observer.next(songs)));
    component.ngOnInit();
    expect(component.songsToBeShown.length).toBeGreaterThan(0);
  }));
  
  it('When a song is selected, the panel with dificulties should apear', fakeAsync(() => {
      let songs: Song[] = JSON.parse('[{"id":31,"key":"31-11","songName":"Believer","songSubName":"Imagine Dragons","authorName":"Rustic","bpm":125,"difficulties":[{"difficulty":"Expert","audioPath":"song.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":418,"events":551,"notes":546,"obstacles":10}}],"downloadUrl":"https://beatsaver.com/download/31-11","coverUrl":"https://beatsaver.com/storage/songs/31/31-11.jpg"},{"id":1183,"key":"1183-814","songName":"Harder Better Faster Stronger","songSubName":"Daft Punk","authorName":"RunRockGame","bpm":123,"difficulties":[{"difficulty":"Hard","audioPath":"Daft Punk - Harder Better Faster Stronger.ogg","jsonPath":"Hard.json","rank":4,"stats":{"time":640.7428588867187,"events":1618,"notes":480,"obstacles":33}},{"difficulty":"Expert","audioPath":"Daft Punk - Harder Better Faster Stronger.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":640.7428588867187,"events":1618,"notes":684,"obstacles":33}}],"downloadUrl":"https://beatsaver.com/download/1183-814","coverUrl":"https://beatsaver.com/storage/songs/1183/1183-814.jpg"},{"id":811,"key":"811-535","songName":"Beat it","songSubName":"Michael Jackson","authorName":"Freeek","bpm":139,"difficulties":[{"difficulty":"Easy","audioPath":"Beat it.ogg","jsonPath":"Easy.json","rank":4,"stats":{"time":328.556396484375,"events":878,"notes":188,"obstacles":84}},{"difficulty":"Normal","audioPath":"Beat it.ogg","jsonPath":"Normal.json","rank":4,"stats":{"time":328.681396484375,"events":878,"notes":259,"obstacles":70}},{"difficulty":"Hard","audioPath":"Beat it.ogg","jsonPath":"Hard.json","rank":4,"stats":{"time":328.681396484375,"events":878,"notes":428,"obstacles":72}},{"difficulty":"Expert","audioPath":"Beat it.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":328.681396484375,"events":878,"notes":669,"obstacles":69}}],"downloadUrl":"https://beatsaver.com/download/811-535","coverUrl":"https://beatsaver.com/storage/songs/811/811-535.jpg"},{"id":517,"key":"517-321","songName":"Gangnam Style","songSubName":"PSY","authorName":"GreatYazer","bpm":132,"difficulties":[{"difficulty":"Normal","audioPath":"song.ogg","jsonPath":"Normal.json","rank":4,"stats":{"time":468,"events":735,"notes":419,"obstacles":42}},{"difficulty":"Hard","audioPath":"song.ogg","jsonPath":"Hard.json","rank":4,"stats":{"time":468,"events":735,"notes":735,"obstacles":94}},{"difficulty":"Expert","audioPath":"Song.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":468,"events":735,"notes":982,"obstacles":103}}],"downloadUrl":"https://beatsaver.com/download/517-321","coverUrl":"https://beatsaver.com/storage/songs/517/517-321.jpg"},{"id":27,"key":"27-9","songName":"Take On Me","songSubName":"","authorName":"a-ha","bpm":168,"difficulties":[{"difficulty":"Expert","audioPath":"song.ogg","jsonPath":"Expert.json","rank":4,"stats":{"time":384,"events":1,"notes":505,"obstacles":52}}],"downloadUrl":"https://beatsaver.com/download/27-9","coverUrl":"https://beatsaver.com/storage/songs/27/27-9.jpg"}]');
      spyOn(songService, 'getTopRaitedSongsList').and.returnValue(new Observable((observer)=> observer.next(songs)));
      component.ngOnInit();
      const selectedSong: Song = component.songsToBeShown[0];
      component.selectTheSong(selectedSong);
      let dificultiesPanel = fixture.debugElement.nativeElement.querySelector('#levelSelectionPanel');
      expect(dificultiesPanel).toBeTruthy();
  }));

  // it('While a song is no selected the panel with dificulties should not apear', () => {
  //   let dificultiesPanel = fixture.debugElement.nativeElement.querySelector('#levelSelectionPanel');
  //   expect(dificultiesPanel).toBeNull();
  // });
});
