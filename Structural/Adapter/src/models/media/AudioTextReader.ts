// Adapter Pattern — Client-facing class
// Implements MediaPlayer directly for .txt files and uses MediaAdapter for youtube/mp4.

import { MediaPlayer } from "../../interfaces/media/MediaPlayer";
import { MediaAdapter } from "./MediaAdapter";

export interface PlayResult {
  message: string;
  usedAdapter: boolean;
  adapteeClass?: string;
  adapterMethod?: string;
}

/**
 * Client-facing class that implements the Target interface (MediaPlayer).
 * Handles .txt files natively and delegates youtube/mp4 to a MediaAdapter,
 * so the caller always uses the same play() signature regardless of media type.
 */
export class AudioTextReader implements MediaPlayer {
  private lastAdapter: MediaAdapter | null = null;

  play(audioType: string, fileName: string): string {
    if (audioType === "txt") {
      this.lastAdapter = null;
      return `AudioTextReader reads "${fileName}" directly — no adapter needed`;
    } else {
      // Create an Adapter for incompatible media types and delegate through it
      this.lastAdapter = new MediaAdapter(audioType);
      return this.lastAdapter.play(audioType, fileName);
    }
  }

  getLastAdapter(): MediaAdapter | null {
    return this.lastAdapter;
  }
}
