import { NotificationDisplay } from "../interfaces/NotificationDisplay";

export class ModalNotificationDisplay implements NotificationDisplay {
  display(message: string): void {
    const modal = document.getElementById("modal")!;
    const modalMessage = document.getElementById("modal-message")!;
    modalMessage.textContent = message;
    modal.style.display = "block";
  }
}
