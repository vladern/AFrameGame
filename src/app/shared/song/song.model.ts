import { Difficulties } from '../difficulty/difficulties.model';
export class Song {
    id: number;
    key: string;
    songName: string;
    songSubName: string;
    authorName: string;
    bpm: number;
    difficulties: Difficulties;
    downloadUrl: string;
    coverUrl: string;
  }
