interface SampleNotification {
  send(message: string): void;
}

interface NotificationDisplay {
  display(message: string): void;
}

class EmailNotification implements SampleNotification {
  send(message: string): void {
    console.log(`Sending email notification: ${message}`);
  }
}

class SMSNotification implements SampleNotification {
  send(message: string): void {
    console.log(`Sending SMS notification: ${message}`);
  }
}

class ModalNotificationDisplay implements NotificationDisplay {
  display(message: string): void {
    console.log(`Displaying modal notification: ${message}`);
  }
}

class ToastNotificationDisplay implements NotificationDisplay {
  display(message: string): void {
    console.log(`Displaying toast notification: ${message}`);
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

const emailNotification = new EmailNotification();
const smsNotification = new SMSNotification();

const modalDisplay = new ModalNotificationDisplay();
const toastDisplay = new ToastNotificationDisplay();

const emailModalBridge = new NotificationBridge(
  emailNotification,
  modalDisplay
);
const smsToastBridge = new NotificationBridge(smsNotification, toastDisplay);

emailModalBridge.sendAndDisplay("New email received");
smsToastBridge.sendAndDisplay("New SMS received");
