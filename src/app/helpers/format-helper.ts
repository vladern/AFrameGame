import { Song } from '../shared/song/song.model';
import { Difficulty } from '../shared/difficulty/difficulty.model';
import { Stats } from '../shared/difficulty/difficulty.model';

export class FormatHelper {
    public static formatFromSongInformationJSONToSong(songInfoJSON): Song {
        return {
            id: songInfoJSON.id,
            key: songInfoJSON.key,
            songName: songInfoJSON.songName,
            songSubName: songInfoJSON.songSubName,
            authorName: songInfoJSON.authorName,
            bpm: songInfoJSON.bpm,
            difficulties: this._formatFromSongDifficultyInformationJSONToDifficultyArray(songInfoJSON.difficulties),
            downloadUrl: songInfoJSON.downloadUrl,
            coverUrl: songInfoJSON.coverUrl
        };
    }

    private static _formatFromSongDifficultyInformationJSONToDifficultyArray(songDifficultiesJSON) : Difficulty[] {
        let songDifficulties: Difficulty[] = [];
        if (songDifficultiesJSON.Easy != undefined) {
            songDifficulties.push({
                difficulty: songDifficultiesJSON.Easy.difficulty,
                audioPath: songDifficultiesJSON.Easy.audioPath,
                jsonPath: songDifficultiesJSON.Easy.jsonPath,
                rank: songDifficultiesJSON.Easy.rank,
                stats: this._formatFromStatsInformationJSONToStats(songDifficultiesJSON.Easy.stats)
            });
        }
        if (songDifficultiesJSON.Normal != undefined) {
            songDifficulties.push({
                difficulty: songDifficultiesJSON.Normal.difficulty,
                audioPath: songDifficultiesJSON.Normal.audioPath,
                jsonPath: songDifficultiesJSON.Normal.jsonPath,
                rank: songDifficultiesJSON.Normal.rank,
                stats: this._formatFromStatsInformationJSONToStats(songDifficultiesJSON.Normal.stats)
            });
        }
        if (songDifficultiesJSON.Hard != undefined) {
            songDifficulties.push({
                difficulty: songDifficultiesJSON.Hard.difficulty,
                audioPath: songDifficultiesJSON.Hard.audioPath,
                jsonPath: songDifficultiesJSON.Hard.jsonPath,
                rank: songDifficultiesJSON.Hard.rank,
                stats: this._formatFromStatsInformationJSONToStats(songDifficultiesJSON.Hard.stats)
            });
        }
        if (songDifficultiesJSON.Expert != undefined) {
            songDifficulties.push({
                difficulty: songDifficultiesJSON.Expert.difficulty,
                audioPath: songDifficultiesJSON.Expert.audioPath,
                jsonPath: songDifficultiesJSON.Expert.jsonPath,
                rank: songDifficultiesJSON.Expert.rank,
                stats: this._formatFromStatsInformationJSONToStats(songDifficultiesJSON.Expert.stats)
            });
        }
        if (songDifficultiesJSON.ExpertPlus != undefined) {
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
