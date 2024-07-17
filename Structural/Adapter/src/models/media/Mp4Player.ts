import { AdvancedMediaPlayer } from "../../interfaces/media/AdvancedMediaPlayer";

export class Mp4Player implements AdvancedMediaPlayer {
  playVid(fileName: string): void {}

  playMusic(fileName: string): void {
    console.log(`Play Music Player`);
  }
}
