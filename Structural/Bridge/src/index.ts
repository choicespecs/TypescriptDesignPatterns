// Bridge Pattern — Entry point / client
// Lets the user independently select a notification type and display type,
// then assembles them into a NotificationBridge at click time.

import { SampleNotification } from "./interfaces/SampleNotification";
import { NotificationDisplay } from "./interfaces/NotificationDisplay";
import { EmailNotification } from "./models/EmailNotificvation";
import { SMSNotification } from "./models/SMSNotification";
import { ToastNotificationDisplay } from "./models/ToastNotificationDisplay";
import { ModalNotificationDisplay } from "./models/ModalNotificationDisplay";
import { NotificationBridge } from "./models/NotificationBridge";

// These hold the current Abstraction and Implementation selections independently
let notificationType: SampleNotification | null = null;
let displayingType: NotificationDisplay | null = null;

const emailButton = document.getElementById("email-button")!;
const smsButton = document.getElementById("sms-button")!;
const notifyWindow: HTMLElement = document.querySelector(".notify-window")!;
const notifyType = document.getElementById("notification-type")!;

// Selecting the Abstraction side — independent of the display choice
emailButton.addEventListener("click", function () {
  notifyWindow.style.display = "none";
  notifyType.innerHTML = ": Email";
  notificationType = new EmailNotification();
});

smsButton.addEventListener("click", function () {
  notifyWindow.style.display = "none";
  notifyType.innerHTML = ": SMS";
  notificationType = new SMSNotification();
});

const notifyDisplayWindow: HTMLElement = document.querySelector(
  ".display-notify-window"
)!;
const toastButton = document.getElementById("toast-button")!;
const modalButton = document.getElementById("modal-button")!;
const displayType = document.getElementById("display-type")!;

// Selecting the Implementation side — independent of the notification type choice
toastButton.addEventListener("click", function () {
  notifyDisplayWindow.style.display = "none";
  displayType.innerHTML = ": Toast";
  displayingType = new ToastNotificationDisplay();
});

modalButton.addEventListener("click", function () {
  notifyDisplayWindow.style.display = "none";
  displayType.innerHTML = ": Modal";
  displayingType = new ModalNotificationDisplay();
});

const modal = document.getElementById("modal")!;
const modalMessage = document.getElementById("modal-message")!;
const modalClose = document.querySelector(".modal-close")!;

function closeModal() {
  modal.style.display = "none";
}

modalClose.addEventListener("click", closeModal);

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

const sendAndDisplayButton = document.getElementById("create-message");

let sendAndDisplayClicked = false;

sendAndDisplayButton?.addEventListener("click", function () {
  if (notificationType && displayingType) {
    // Bridge is assembled at runtime by composing the chosen Abstraction + Implementation
    const notificationBridge = new NotificationBridge(
      notificationType,
      displayingType
    );
    const messageInput = document.getElementById(
      "message"
    )! as HTMLInputElement;
    const message = messageInput.value;
    notificationBridge.sendAndDisplay(message); // Triggers both sides of the bridge
  }
  sendAndDisplayClicked = true;
  const resetButton = document.getElementById("reset");
  if (resetButton) {
    resetButton.style.display = "inline-block";
  }
});

const resetButton = document.getElementById("reset");
resetButton?.addEventListener("click", function () {
  notificationType = null;
  displayingType = null;

  const notifyType = document.getElementById("notification-type");
  if (notifyType) {
    notifyType.innerHTML = "";
  }

  const displayType = document.getElementById("display-type");
  if (displayType) {
    displayType.innerHTML = "";
  }

  if (notifyWindow) {
    notifyWindow.style.display = "flex";
  }
  if (notifyDisplayWindow) {
    notifyDisplayWindow.style.display = "flex";
  }

  resetButton.style.display = "none";

  sendAndDisplayClicked = false;
});
