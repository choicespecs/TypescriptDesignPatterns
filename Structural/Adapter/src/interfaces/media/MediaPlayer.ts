// Adapter Pattern — Target interface
// The interface the client (AudioTextReader) expects; MediaAdapter translates to this.

/**
 * Target interface in the Adapter pattern.
 * The client works only with play(mediaType, fileName); it never calls
 * playVid() or playMusic() directly — those are the Adaptee's incompatible methods.
 */
export interface MediaPlayer {
  /** Unified play method: the target API that the client code depends on. */
  play(mediaType: string, fileName: string): void;
}
