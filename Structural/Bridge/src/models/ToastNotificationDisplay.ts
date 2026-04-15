// Bridge Pattern — Concrete Implementation (toast display)
// Implements NotificationDisplay; renders a self-dismissing toast in the DOM.

import { NotificationDisplay } from "../interfaces/NotificationDisplay";

/**
 * Concrete Implementation for toast-style display.
 * Implements the Implementation side of the bridge — renders the message as a
 * toast notification that fades in, stays for 3 seconds, then removes itself.
 */
export class ToastNotificationDisplay implements NotificationDisplay {
  display(message: string): void {
    const toastContainer = document.querySelector(".toast-container")!;
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = message;
    toastContainer.appendChild(toast);

    // Animate: show → wait 3s → hide → remove from DOM
    setTimeout(() => {
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
          toast.remove();
        }, 500);
      }, 3000);
    }, 100);
  }
}
