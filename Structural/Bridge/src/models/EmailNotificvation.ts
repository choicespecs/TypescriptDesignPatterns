// Bridge Pattern — Refined Abstraction (email channel)
// Implements SampleNotification; send() logs an email to the console.

import { SampleNotification } from "../interfaces/SampleNotification";

/**
 * Refined Abstraction for email notifications.
 * Implements the Abstraction side of the bridge — handles the "how to send" concern
 * independently of how the message will be displayed by the Implementation side.
 */
export class EmailNotification implements SampleNotification {
  send(message: string): void {
    console.log(`-=Sending email notification=-`);
    console.log("");
    console.log(`To: Everyone`);
    console.log(`From: Your favorite developer`);
    console.log(`Subject: Got big news to tell you`);
    console.log(`Body: ${message}`);
    console.log("");
    console.log(`-=Email sent successfully=-`);
  }
}
