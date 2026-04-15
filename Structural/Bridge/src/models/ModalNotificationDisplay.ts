// Bridge Pattern — Concrete Implementation (modal display)
// Implements NotificationDisplay; renders the message inside a modal dialog.

import { NotificationDisplay } from "../interfaces/NotificationDisplay";

/**
 * Concrete Implementation for modal-style display.
 * Implements the Implementation side of the bridge — shows the message in a
 * modal overlay rather than a toast, demonstrating how the display can be swapped
 * without any changes to the Abstraction (notification type) side.
 */
export class ModalNotificationDisplay implements NotificationDisplay {
  display(message: string): void {
    const modal = document.getElementById("modal")!;
    const modalMessage = document.getElementById("modal-message")!;
    modalMessage.textContent = message;
    modal.style.display = "block"; // Display the modal overlay with the message
  }
}
