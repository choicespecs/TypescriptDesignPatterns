// Adapter Pattern — Adapter
// Implements the Target interface (MediaPlayer) by wrapping an AdvancedMediaPlayer Adaptee.

import { MediaPlayer } from "../../interfaces/media/MediaPlayer";
import { AdvancedMediaPlayer } from "../../interfaces/media/AdvancedMediaPlayer";
import { YouTubePlayer } from "./YouTubePlayer";
import { Mp4Player } from "./Mp4Player";

/**
 * Adapter in the Adapter pattern.
 * Implements MediaPlayer (Target) by selecting and wrapping the appropriate
 * AdvancedMediaPlayer (Adaptee) based on mediaType, then translating play()
 * into the correct Adaptee method (playVid or playMusic).
 */
export class MediaAdapter implements MediaPlayer {
  private advancedMediaPlayer: AdvancedMediaPlayer;

  constructor(mediaType: string) {
    // Choose the Adaptee based on the requested media type
    if (mediaType === "youtube") {
      this.advancedMediaPlayer = new YouTubePlayer();
    } else if (mediaType === "mp4") {
      this.advancedMediaPlayer = new Mp4Player();
    }
  }

  /** Translates the unified play() call into the Adaptee's specific method. */
  play(mediaType: string, fileName: string) {
    if (mediaType === "youtube") {
      this.advancedMediaPlayer.playVid(fileName); // Adapt: play() → playVid()
    } else if (mediaType === "mp4") {
      this.advancedMediaPlayer.playMusic(fileName); // Adapt: play() → playMusic()
    }
  }
}
