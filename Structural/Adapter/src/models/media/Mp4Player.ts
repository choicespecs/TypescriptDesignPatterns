// Adapter Pattern — ConcreteAdaptee (MP4 audio player)
// Implements the AdvancedMediaPlayer interface; only playMusic() is meaningful for MP4 files.

import { AdvancedMediaPlayer } from "../../interfaces/media/AdvancedMediaPlayer";

/**
 * ConcreteAdaptee for MP4 playback.
 * MediaAdapter wraps this to expose it through the MediaPlayer.play() Target interface.
 * playVid() is intentionally a no-op — Mp4Player here represents audio-only media.
 */
export class Mp4Player implements AdvancedMediaPlayer {
  playVid(fileName: string): string {
    return ""; // No-op: Mp4Player handles audio, not video
  }

  playMusic(fileName: string): string {
    return `Mp4Player.playMusic("${fileName}") — playing audio`;
  }
}
