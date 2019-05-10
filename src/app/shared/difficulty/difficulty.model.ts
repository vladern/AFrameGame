export class Difficulty {
    difficulty: string;
    rank: number;
    audioPath: string;
    jsonPath: string;
    stats: Stats;
}
export interface Stats {
    time: number;
    events: number;
    notes: number;
    obstacles: number;
}
