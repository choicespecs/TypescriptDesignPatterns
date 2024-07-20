import { MediaPlayer } from "../../interfaces/media/MediaPlayer";
import { MediaAdapter } from "./MediaAdapter";

export class AudioTextReader implements MediaPlayer {
  private mediaAdapter: MediaAdapter;

  play(audioType: string, fileName: string) {
    if (audioType === "txt") {
      console.log(`Reading txt ${fileName}`);
    } else {
      this.mediaAdapter = new MediaAdapter(audioType);
      this.mediaAdapter.play(audioType, fileName);
    }
  }
}
