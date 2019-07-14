import { TestBed } from '@angular/core/testing';

import { BeatService } from './beat.service';
import { ComponentFactory, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BeatComponent } from '../components/game/beat/beat.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Song } from '../shared/song/song.model';
import { Difficulties } from '../shared/difficulty/difficulties.model';

describe('BeatService', () => {
  let service: BeatService;
  let songs: Array<Song>;
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [ BeatComponent ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
  })
  .overrideModule(BrowserDynamicTestingModule, 
    {set: {entryComponents: [BeatComponent]}})
  .compileComponents()
  );

  beforeEach(() => {
    service = TestBed.get(BeatService);
    songs = JSON.parse('[{"id":"5cff620c48229f7d88fc60e9","key":"s","songName":"Believer","songSubName":"Imagine Dragons","authorName":"Rustic","bpm":125,"difficulties":{"easy":false,"normal":false,"hard":false,"expert":true,"expertPlus":false},"downloadUrl":"/api/download/key/b","coverUrl":"/cdn/b/19f2879d11a91b51a5c090d63471c3e8d9b7aee3.jpg"},{"id":"5cff620c48229f7d88fc63dd","key":"32e","songName":"Harder Better Faster Stronger","songSubName":"Daft Punk","authorName":"RunRockGame","bpm":123,"difficulties":{"easy":false,"normal":false,"hard":true,"expert":true,"expertPlus":false},"downloadUrl":"/api/download/key/32e","coverUrl":"/cdn/32e/7c7f38d467bb43fe11a142581e63e324622ecc71.jpg"},{"id":"5cff620c48229f7d88fc620d","key":"141","songName":"Gangnam Style","songSubName":"PSY","authorName":"GreatYazer","bpm":132,"difficulties":{"easy":false,"normal":true,"hard":true,"expert":true,"expertPlus":false},"downloadUrl":"/api/download/key/141","coverUrl":"/cdn/141/8e7e553099436af31564adf1977a5ec42a61cfff.jpg"},{"id":"5cff620c48229f7d88fc62d6","key":"217","songName":"Beat it","songSubName":"Michael Jackson","authorName":"Freeek","bpm":139,"difficulties":{"easy":true,"normal":true,"hard":true,"expert":true,"expertPlus":false},"downloadUrl":"/api/download/key/217","coverUrl":"/cdn/217/4b2da842b687ec4cfbc948c583c21c79d4120de0.jpg"},{"id":"5cff620c48229f7d88fc60e7","key":"9","songName":"Take On Me","songSubName":"","authorName":"a-ha","bpm":168,"difficulties":{"easy":false,"normal":false,"hard":false,"expert":true,"expertPlus":false},"downloadUrl":"/api/download/key/9","coverUrl":"/cdn/9/2aa1f5192828e075c30dd015b1e132bba912eb86.jpg"},{"id":"5cff620c48229f7d88fc60e7","key":"9","songName":"Take On Me","songSubName":"","authorName":"a-ha","bpm":168,"difficulties":{"easy":false,"normal":false,"hard":false,"expert":true,"expertPlus":false},"downloadUrl":"/api/download/key/9","coverUrl":"/cdn/9/2aa1f5192828e075c30dd015b1e132bba912eb86.jpg"}]');
    songs.forEach(element => {
      element.difficulties = new Difficulties(element.difficulties.easy, element.difficulties.normal, element.difficulties.hard, element.difficulties.expert, element.difficulties.expertPlus);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('On call getBeats() should return Array of beatComponents with number of element of the current song beat', () => {
    service.setCurrentSong(songs[0]);
    const beats: Array<ComponentFactory<BeatComponent>> =  (service as any).getBeats();
    expect(beats.length).toEqual(2);
  });
});
