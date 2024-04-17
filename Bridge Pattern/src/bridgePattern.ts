interface SampleNotification {
  send(message: string): void;
}

interface NotificationDisplay {
  display(message: string): void;
}

class EmailNotification implements SampleNotification {
  send(message: string): void {
    console.log(`-=Sending email notification=-`);
    console.log("");
    console.log(`To: Everyone`);
    console.log(`From: Your favorite developer`);
    console.log(`Subject: Got big news to tell you`);
    console.log(`Body: ${message}`);
    console.log("");
    console.log(`-=Email sent successfully=-`);
  }
}

class SMSNotification implements SampleNotification {
  send(message: string): void {
    console.log(`-=Sending SMS notification=-`);
    console.log("");
    console.log(`To: 555-555-555`);
    console.log(`From: 000-000-000`);
    console.log(`Message: ${message}`);
    console.log("");
    console.log("-=SMS sent successfully!=-");
  }
}

class ModalNotificationDisplay implements NotificationDisplay {
  display(message: string): void {
    const modal = document.getElementById("modal")!;
    const modalMessage = document.getElementById("modal-message")!;
    modalMessage.textContent = message;
    modal.style.display = "block";
  }
}

class ToastNotificationDisplay implements NotificationDisplay {
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

class NotificationBridge {
  constructor(
    private notification: SampleNotification,
    private display: NotificationDisplay
  ) {}

  sendAndDisplay(message: string): void {
    this.notification.send(message);
    this.display.display(message);
  }
}

let notificationType: SampleNotification | null = null;
let displayingType: NotificationDisplay | null = null;

const emailButton = document.getElementById("email-button")!;
const smsButton = document.getElementById("sms-button")!;
const notifyWindow: HTMLElement = document.querySelector(".notify-window")!;
const notifyType = document.getElementById("notification-type")!;

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

let sendAndDisplayClicked = false; // Keep track of whether sendAndDisplayButton has been clicked

sendAndDisplayButton?.addEventListener("click", function () {
  if (notificationType && displayingType) {
    const notificationBridge = new NotificationBridge(
      notificationType,
      displayingType
    );
    const messageInput = document.getElementById(
      "message"
    )! as HTMLInputElement;
    const message = messageInput.value;
    notificationBridge.sendAndDisplay(message);
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

  // Reset the notification type display
  const notifyType = document.getElementById("notification-type");
  if (notifyType) {
    notifyType.innerHTML = "";
  }

  // Reset the display type display
  const displayType = document.getElementById("display-type");
  if (displayType) {
    displayType.innerHTML = "";
  }

  // Show notifyWindow and notifyDisplayWindow again
  if (notifyWindow) {
    notifyWindow.style.display = "block";
  }
  if (notifyDisplayWindow) {
    notifyDisplayWindow.style.display = "block";
  }

  // Hide the reset button again
  resetButton.style.display = "none";

  // Reset sendAndDisplayClicked flag
  sendAndDisplayClicked = false;
});
