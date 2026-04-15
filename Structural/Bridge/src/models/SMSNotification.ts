// Bridge Pattern — Refined Abstraction (SMS channel)
// Implements SampleNotification; send() logs an SMS message to the console.

import { SampleNotification } from "../interfaces/SampleNotification";

/**
 * Refined Abstraction for SMS notifications.
 * Implements the Abstraction side of the bridge — its send() is entirely independent
 * of which NotificationDisplay will render the message on the other side.
 */
export class SMSNotification implements SampleNotification {
  send(message: string): void {
    console.log(`-=Sending SMS notification=-`);
    console.log("");
    console.log(`To: 555-555-555`);
    console.log(`From: 000-000-000`);
    console.log(`Message: ${message}`);
    console.log("");
    console.log("-=SMS sent successfully!=-");
  }
}
