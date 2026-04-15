// Bridge Pattern — Refined Abstraction (SMS channel)
// send() renders a styled SMS send-log entry in the UI instead of console.log.

import { SampleNotification } from "../interfaces/SampleNotification";

export class SMSNotification implements SampleNotification {
  readonly channel = 'sms' as const;

  send(message: string): void {
    const log = document.getElementById("send-log");
    if (!log) return;

    log.classList.remove("hidden");
    log.innerHTML = `
      <div class="send-entry sms-entry">
        <div class="send-entry-header">
          <span class="send-icon">💬</span>
          <span class="send-title">SMS sent</span>
        </div>
        <div class="send-meta">
          <div><span class="meta-key">From</span><span class="meta-val">+1 (000) 000-0000</span></div>
          <div><span class="meta-key">To</span><span class="meta-val">+1 (555) 555-5555</span></div>
          <div><span class="meta-key">Message</span><span class="meta-val">${message}</span></div>
        </div>
      </div>`;
  }
}
