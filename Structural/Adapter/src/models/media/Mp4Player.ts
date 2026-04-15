// Adapter Pattern — ConcreteAdaptee (MP4 audio player)
// Implements the AdvancedMediaPlayer interface; only playMusic() is meaningful for MP4 files.

import { AdvancedMediaPlayer } from "../../interfaces/media/AdvancedMediaPlayer";

/**
 * ConcreteAdaptee for MP4 playback.
 * MediaAdapter wraps this to expose it through the MediaPlayer.play() Target interface.
 * playVid() is intentionally a no-op — MP4 here represents audio-only media.
 */
export class Mp4Player implements AdvancedMediaPlayer {
  playVid(fileName: string): void {} // No-op: MP4Player handles audio, not video

  playMusic(fileName: string): void {
    console.log(`Play Music Player`);
  }
}
