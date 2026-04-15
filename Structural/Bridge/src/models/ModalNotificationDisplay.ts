// Bridge Pattern — Concrete Implementation (modal display)
// Renders a channel-aware modal dialog — Email gets a blue header with From/To/Subject,
// SMS gets a green header with a message-bubble layout.

import { NotificationDisplay } from "../interfaces/NotificationDisplay";

const CHANNEL_CONFIG = {
  email: { icon: '📧', label: 'Email Notification', color: '#3b82f6', border: 'rgba(59,130,246,0.35)' },
  sms:   { icon: '💬', label: 'SMS Notification',   color: '#10b981', border: 'rgba(16,185,129,0.35)' },
};

export class ModalNotificationDisplay implements NotificationDisplay {
  display(message: string, channel: 'email' | 'sms'): void {
    const cfg = CHANNEL_CONFIG[channel];
    const overlay = document.getElementById("modal-overlay")!;
    const header  = document.getElementById("modal-header")!;
    const meta    = document.getElementById("modal-meta")!;
    const body    = document.getElementById("modal-message")!;

    // Header: channel icon + title
    header.style.cssText = `--modal-color:${cfg.color};--modal-border:${cfg.border}`;
    header.querySelector(".modal-channel-icon")!.textContent = cfg.icon;
    header.querySelector(".modal-channel-title")!.textContent = cfg.label;

    // Meta row and body differ by channel
    if (channel === 'email') {
      meta.innerHTML = `
        <div class="meta-row"><span class="meta-key">From</span><span class="meta-val">app@example.com</span></div>
        <div class="meta-row"><span class="meta-key">To</span><span class="meta-val">everyone@example.com</span></div>
        <div class="meta-row"><span class="meta-key">Subject</span><span class="meta-val">New notification</span></div>`;
      body.innerHTML = `<div class="email-body">${message}</div>`;
    } else {
      meta.innerHTML = `
        <div class="meta-row"><span class="meta-key">From</span><span class="meta-val">+1 (000) 000-0000</span></div>
        <div class="meta-row"><span class="meta-key">To</span><span class="meta-val">+1 (555) 555-5555</span></div>`;
      body.innerHTML = `<div class="sms-bubble">${message}</div>`;
    }

    overlay.classList.remove("hidden");
  }
}
