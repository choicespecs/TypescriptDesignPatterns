// Adapter Pattern — Adaptee interface
// The incompatible interface that existing players (YouTubePlayer, Mp4Player) implement.

/**
 * Adaptee interface in the Adapter pattern.
 * Uses separate playVid/playMusic methods rather than the unified play() method
 * expected by the MediaPlayer Target interface. MediaAdapter bridges this incompatibility.
 */
export interface AdvancedMediaPlayer {
  /** Plays a video file; relevant for YouTubePlayer but a no-op for Mp4Player. */
  playVid(fileName: string): void;
  /** Plays a music/audio file; relevant for Mp4Player but a no-op for YouTubePlayer. */
  playMusic(fileName: string): void;
}
