// Bridge Pattern — Abstraction interface
// One side of the bridge: defines the notification sending contract.

/**
 * Abstraction interface in the Bridge pattern.
 * EmailNotification and SMSNotification are Refined Abstractions implementing this.
 * The Bridge (NotificationBridge) holds one of these alongside a NotificationDisplay,
 * decoupling the "how to send" dimension from the "how to display" dimension.
 */
export interface SampleNotification {
  /** Which channel this abstraction represents — passed to the display side via the bridge. */
  readonly channel: 'email' | 'sms';
  /** Sends the notification and renders a visible send-log entry in the UI. */
  send(message: string): void;
}
