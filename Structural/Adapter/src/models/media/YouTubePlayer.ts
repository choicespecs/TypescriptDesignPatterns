import { AdvancedMediaPlayer } from "../../interfaces/media/AdvancedMediaPlayer";

export class YouTubePlayer implements AdvancedMediaPlayer {
  playVid(fileName: string) {
    console.log(`opened youtube video: ${fileName}`);
  }

  playMusic(fileName: string): void {}
}
