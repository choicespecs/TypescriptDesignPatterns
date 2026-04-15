// Bridge Pattern — Entry point / client

import { SampleNotification } from "./interfaces/SampleNotification";
import { NotificationDisplay } from "./interfaces/NotificationDisplay";
import { EmailNotification } from "./models/EmailNotificvation";
import { SMSNotification } from "./models/SMSNotification";
import { ToastNotificationDisplay } from "./models/ToastNotificationDisplay";
import { ModalNotificationDisplay } from "./models/ModalNotificationDisplay";
import { NotificationBridge } from "./models/NotificationBridge";
import { setupModal } from "../../../shared/dom-utils";

let notificationType: SampleNotification | null = null;
let displayingType: NotificationDisplay | null = null;

const emailButton      = document.getElementById("email-button")!;
const smsButton        = document.getElementById("sms-button")!;
const notifyWindow     = document.querySelector<HTMLElement>(".notify-window")!;
const notifyType       = document.getElementById("notification-type")!;
const toastButton      = document.getElementById("toast-button")!;
const modalButton      = document.getElementById("modal-button")!;
const notifyDispWindow = document.querySelector<HTMLElement>(".display-notify-window")!;
const displayType      = document.getElementById("display-type")!;

// ── Abstraction selection ──────────────────────────────────────────────────────

emailButton.addEventListener("click", () => {
  notifyWindow.style.display = "none";
  notifyType.textContent = ": Email";
  notificationType = new EmailNotification();
});

smsButton.addEventListener("click", () => {
  notifyWindow.style.display = "none";
  notifyType.textContent = ": SMS";
  notificationType = new SMSNotification();
});

// ── Implementation selection ───────────────────────────────────────────────────

toastButton.addEventListener("click", () => {
  notifyDispWindow.style.display = "none";
  displayType.textContent = ": Toast";
  displayingType = new ToastNotificationDisplay();
});

modalButton.addEventListener("click", () => {
  notifyDispWindow.style.display = "none";
  displayType.textContent = ": Modal";
  displayingType = new ModalNotificationDisplay();
});

// ── Modal close ────────────────────────────────────────────────────────────────

const modalOverlay = document.getElementById("modal-overlay")!;
const modalCloseBtn = document.getElementById("modal-close-btn")!;

function closeModal(): void {
  modalOverlay.classList.add("hidden");
}

setupModal(modalOverlay, modalCloseBtn, closeModal);

// ── Send & Display ─────────────────────────────────────────────────────────────

const sendButton  = document.getElementById("create-message")!;
const resetButton = document.getElementById("reset")!;

sendButton.addEventListener("click", () => {
  if (!notificationType || !displayingType) return;
  const input = document.getElementById("message") as HTMLInputElement;
  const bridge = new NotificationBridge(notificationType, displayingType);
  bridge.sendAndDisplay(input.value);
  resetButton.style.display = "inline-block";
});

// ── Reset ──────────────────────────────────────────────────────────────────────

resetButton.addEventListener("click", () => {
  notificationType = null;
  displayingType   = null;

  notifyType.textContent   = "";
  displayType.textContent  = "";
  notifyWindow.style.display     = "flex";
  notifyDispWindow.style.display = "flex";
  resetButton.style.display      = "none";

  const log = document.getElementById("send-log")!;
  log.classList.add("hidden");
  log.innerHTML = "";
});
