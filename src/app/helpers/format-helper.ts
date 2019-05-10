import { Song } from '../shared/song/song.model';
import { Difficulty } from '../shared/difficulty/difficulty.model';
import { Stats } from '../shared/difficulty/difficulty.model';

export class FormatHelper {
    public static formatFromSongInformationJSONToSong(songInfoJSON): Song {
        return {
            id: songInfoJSON.song.id,
            key: songInfoJSON.song.key,
            songName: songInfoJSON.song.songName,
            songSubName: songInfoJSON.song.songSubName,
            authorName: songInfoJSON.song.authorName,
            bpm: songInfoJSON.song.bpm,
            difficulties: this._formatFromSongDifficultyInformationJSONToDifficultyArray(songInfoJSON.song.difficulties),
            downloadUrl: songInfoJSON.song.downloadUrl,
            coverUrl: songInfoJSON.song.coverUrl
        };
    }

    private static _formatFromSongDifficultyInformationJSONToDifficultyArray(songDifficultiesJSON) : Difficulty[] {
        let songDifficulties: Difficulty[] = [];
        if (songDifficultiesJSON.Easy != undefined) {
            console.log('Easy')
            songDifficulties.push({
                difficulty: songDifficultiesJSON.Easy.difficulty,
                audioPath: songDifficultiesJSON.Easy.audioPath,
                jsonPath: songDifficultiesJSON.Easy.jsonPath,
                rank: songDifficultiesJSON.Easy.rank,
                stats: this._formatFromStatsInformationJSONToStats(songDifficultiesJSON.Easy.stats)
            });
        }
        if (songDifficultiesJSON.Normal != undefined) {
            console.log('Normal')
            songDifficulties.push({
                difficulty: songDifficultiesJSON.Normal.difficulty,
                audioPath: songDifficultiesJSON.Normal.audioPath,
                jsonPath: songDifficultiesJSON.Normal.jsonPath,
                rank: songDifficultiesJSON.Normal.rank,
                stats: this._formatFromStatsInformationJSONToStats(songDifficultiesJSON.Normal.stats)
            });
        }
        if (songDifficultiesJSON.Hard != undefined) {
            console.log('Hard')
            songDifficulties.push({
                difficulty: songDifficultiesJSON.Hard.difficulty,
                audioPath: songDifficultiesJSON.Hard.audioPath,
                jsonPath: songDifficultiesJSON.Hard.jsonPath,
                rank: songDifficultiesJSON.Hard.rank,
                stats: this._formatFromStatsInformationJSONToStats(songDifficultiesJSON.Hard.stats)
            });
        }
        if (songDifficultiesJSON.Expert != undefined) {
            console.log('Expert')
            songDifficulties.push({
                difficulty: songDifficultiesJSON.Expert.difficulty,
                audioPath: songDifficultiesJSON.Expert.audioPath,
                jsonPath: songDifficultiesJSON.Expert.jsonPath,
                rank: songDifficultiesJSON.Expert.rank,
                stats: this._formatFromStatsInformationJSONToStats(songDifficultiesJSON.Expert.stats)
            });
        }
        if (songDifficultiesJSON.ExpertPlus != undefined) {
            console.log('ExpertPlus')
            songDifficulties.push({
                difficulty: songDifficultiesJSON.ExpertPlus.difficulty,
                audioPath: songDifficultiesJSON.ExpertPlus.audioPath,
                jsonPath: songDifficultiesJSON.ExpertPlus.jsonPath,
                rank: songDifficultiesJSON.ExpertPlus.rank,
                stats: this._formatFromStatsInformationJSONToStats(songDifficultiesJSON.ExpertPlus.stats)
            });
        }
        return songDifficulties;
    }

    private static _formatFromStatsInformationJSONToStats(statsJSON): Stats {
        return {
            time: statsJSON.time,
            events: statsJSON.events,
            notes: statsJSON.notes,
            obstacles: statsJSON.obstacles
        }
    }
}
