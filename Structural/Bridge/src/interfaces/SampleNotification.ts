// Bridge Pattern — Abstraction interface
// One side of the bridge: defines the notification sending contract.

/**
 * Abstraction interface in the Bridge pattern.
 * EmailNotification and SMSNotification are Refined Abstractions implementing this.
 * The Bridge (NotificationBridge) holds one of these alongside a NotificationDisplay,
 * decoupling the "how to send" dimension from the "how to display" dimension.
 */
export interface SampleNotification {
  /** Sends the notification via this implementation's channel (email, SMS, etc.). */
  send(message: string): void;
}
