import { Song } from '../shared/song/song.model';
import { Difficulty } from '../shared/difficulty/difficulty.model';
import { Stats } from '../shared/difficulty/difficulty.model';
import { Difficulties } from '../shared/difficulty/difficulties.model';

export class FormatHelper {
    public static formatFromSongInformationJSONToSong(songInfoJSON): Song {
        return {
            id: songInfoJSON._id,
            key: songInfoJSON.key,
            songName: songInfoJSON.metadata.songName,
            songSubName: songInfoJSON.metadata.songSubName,
            authorName: songInfoJSON.metadata.songAuthorName,
            bpm: songInfoJSON.metadata.bpm,
            difficulties: this._formatFromSongDifficultyInformationJSONToDifficultyArray(songInfoJSON.metadata.difficulties),
            downloadUrl: songInfoJSON.downloadURL,
            coverUrl: songInfoJSON.coverURL
        };
    }

    private static _formatFromSongDifficultyInformationJSONToDifficultyArray(songDifficultiesJSON) : Difficulties {
        return new Difficulties(songDifficultiesJSON.easy, songDifficultiesJSON.normal, songDifficultiesJSON.hard, songDifficultiesJSON.expert, songDifficultiesJSON.expertPlus)
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
