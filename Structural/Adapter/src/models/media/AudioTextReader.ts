// Adapter Pattern — Client-facing class
// Implements MediaPlayer directly for .txt files and uses MediaAdapter for youtube/mp4.

import { MediaPlayer } from "../../interfaces/media/MediaPlayer";
import { MediaAdapter } from "./MediaAdapter";

/**
 * Client-facing class that implements the Target interface (MediaPlayer).
 * Handles .txt files natively and delegates youtube/mp4 to a MediaAdapter,
 * so the caller always uses the same play() signature regardless of media type.
 */
export class AudioTextReader implements MediaPlayer {
  private mediaAdapter: MediaAdapter;

  play(audioType: string, fileName: string) {
    if (audioType === "txt") {
      console.log(`Reading txt ${fileName}`); // Handled directly — no adapter needed
    } else {
      // Create an Adapter for incompatible media types and delegate through it
      this.mediaAdapter = new MediaAdapter(audioType);
      this.mediaAdapter.play(audioType, fileName);
    }
  }
}
