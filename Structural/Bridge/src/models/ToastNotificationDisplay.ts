import { NotificationDisplay } from "../interfaces/NotificationDisplay";

export class ToastNotificationDisplay implements NotificationDisplay {
  display(message: string): void {
    const toastContainer = document.querySelector(".toast-container")!;
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = message;
    toastContainer.appendChild(toast);

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
