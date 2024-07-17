import { MediaPlayer } from "../../interfaces/media/MediaPlayer";
import { AdvancedMediaPlayer } from "../../interfaces/media/AdvancedMediaPlayer";
import { YouTubePlayer } from "./YouTubePlayer";
import { Mp4Player } from "./Mp4Player";

export class MediaAdapter implements MediaPlayer {
  private advancedMediaPlayer: AdvancedMediaPlayer;

  constructor(mediaType: string) {
    if (mediaType === "youtube") {
      this.advancedMediaPlayer = new YouTubePlayer();
    } else if (mediaType === "mp4") {
      this.advancedMediaPlayer = new Mp4Player();
    }
  }

  play(mediaType: string, fileName: string) {
    if (mediaType === "youtube") {
      this.advancedMediaPlayer.playVid(fileName);
    } else if (mediaType === "mp4") {
      this.advancedMediaPlayer.playMusic(fileName);
    }
  }
}
