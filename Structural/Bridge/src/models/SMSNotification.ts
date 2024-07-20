import { SampleNotification } from "../interfaces/SampleNotification";

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
