import { SampleNotification } from "../interfaces/SampleNotification";
import { NotificationDisplay } from "../interfaces/NotificationDisplay";

export class NotificationBridge {
  constructor(
    private notification: SampleNotification,
    private display: NotificationDisplay
  ) {}

  sendAndDisplay(message: string): void {
    this.notification.send(message);
    this.display.display(message);
  }
}
