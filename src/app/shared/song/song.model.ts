import { SongLevels } from './song-levels.enum';

export class Song {
    name: string;
    levels: SongLevels[];
    timeInSeconds: number;
}
