import { SampleNotification } from "../interfaces/SampleNotification";

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
