// Bridge Pattern — Concrete Implementation (toast display)
// Renders a channel-aware toast notification — Email gets a blue accent, SMS gets green.

import { NotificationDisplay } from "../interfaces/NotificationDisplay";

const CHANNEL_CONFIG = {
  email: { icon: '📧', label: 'Email Notification', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)' },
  sms:   { icon: '💬', label: 'SMS Notification',   color: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)' },
};

export class ToastNotificationDisplay implements NotificationDisplay {
  display(message: string, channel: 'email' | 'sms'): void {
    const cfg = CHANNEL_CONFIG[channel];
    const container = document.querySelector(".toast-container")!;

    const toast = document.createElement("div");
    toast.className = `toast toast-${channel}`;
    toast.style.cssText = `--toast-color:${cfg.color};--toast-bg:${cfg.bg};--toast-border:${cfg.border}`;
    toast.innerHTML = `
      <div class="toast-icon">${cfg.icon}</div>
      <div class="toast-body">
        <div class="toast-title">${cfg.label}</div>
        <div class="toast-message">${message}</div>
      </div>
      <div class="toast-progress"></div>`;

    container.appendChild(toast);

    // Slide in → hold 3s → slide out → remove
    requestAnimationFrame(() => {
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.add("hide");
        setTimeout(() => toast.remove(), 400);
      }, 3000);
    });
  }
}
