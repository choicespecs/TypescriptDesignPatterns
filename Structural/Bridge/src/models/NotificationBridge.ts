// Bridge Pattern — Bridge (composes Abstraction + Implementation)
// Holds one SampleNotification and one NotificationDisplay, calling both in sendAndDisplay().

import { SampleNotification } from "../interfaces/SampleNotification";
import { NotificationDisplay } from "../interfaces/NotificationDisplay";

/**
 * Bridge in the Bridge pattern.
 * Composes a SampleNotification (Abstraction) with a NotificationDisplay (Implementation).
 * sendAndDisplay() invokes both independently, so either side can vary without affecting the other.
 * 2 notification types × 2 display types = 4 combinations with no subclass explosion.
 */
export class NotificationBridge {
  constructor(
    private notification: SampleNotification, // Abstraction side of the bridge
    private display: NotificationDisplay       // Implementation side of the bridge
  ) {}

  /** Calls send() on the Abstraction side and display() on the Implementation side — the bridge in action.
   *  The channel from the Abstraction is forwarded to display() so the Implementation can style itself accordingly. */
  sendAndDisplay(message: string): void {
    this.notification.send(message);
    this.display.display(message, this.notification.channel);
  }
}
