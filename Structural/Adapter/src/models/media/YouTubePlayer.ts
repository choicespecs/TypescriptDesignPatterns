// Adapter Pattern — ConcreteAdaptee (YouTube video player)
// Implements the AdvancedMediaPlayer interface; only playVid() is meaningful for YouTube.

import { AdvancedMediaPlayer } from "../../interfaces/media/AdvancedMediaPlayer";

/**
 * ConcreteAdaptee for YouTube video playback.
 * MediaAdapter wraps this to expose it through the MediaPlayer.play() Target interface.
 * playMusic() is intentionally a no-op — YouTubePlayer handles video, not audio.
 */
export class YouTubePlayer implements AdvancedMediaPlayer {
  playVid(fileName: string) {
    console.log(`opened youtube video: ${fileName}`);
  }

  playMusic(fileName: string): void {} // No-op: YouTubePlayer handles video, not audio
}
