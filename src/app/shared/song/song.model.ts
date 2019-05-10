import { Difficulty } from 'src/app/shared/difficulty/difficulty.model';
export class Song {
    id: number;
    key: string;
    songName: string;
    songSubName: string;
    authorName: string;
    bpm: number;
    difficulties: Difficulty[];
    downloadUrl: string;
    coverUrl: string;
  }
