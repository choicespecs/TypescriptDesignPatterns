// Bridge Pattern — Refined Abstraction (email channel)
// send() renders a styled email send-log entry in the UI instead of console.log.

import { SampleNotification } from "../interfaces/SampleNotification";

export class EmailNotification implements SampleNotification {
  readonly channel = 'email' as const;

  send(message: string): void {
    const log = document.getElementById("send-log");
    if (!log) return;

    log.classList.remove("hidden");
    log.innerHTML = `
      <div class="send-entry email-entry">
        <div class="send-entry-header">
          <span class="send-icon">📧</span>
          <span class="send-title">Email sent</span>
        </div>
        <div class="send-meta">
          <div><span class="meta-key">From</span><span class="meta-val">app@example.com</span></div>
          <div><span class="meta-key">To</span><span class="meta-val">everyone@example.com</span></div>
          <div><span class="meta-key">Subject</span><span class="meta-val">New notification</span></div>
          <div><span class="meta-key">Body</span><span class="meta-val">${message}</span></div>
        </div>
      </div>`;
  }
}
