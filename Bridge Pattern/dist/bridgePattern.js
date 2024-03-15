"use strict";
class EmailNotification {
    send(message) {
        console.log(`Sending email notification: ${message}`);
    }
}
class SMSNotification {
    send(message) {
        console.log(`Sending SMS notification: ${message}`);
    }
}
class ModalNotificationDisplay {
    display(message) {
        console.log(`Displaying modal notification: ${message}`);
    }
}
class ToastNotificationDisplay {
    display(message) {
        console.log(`Displaying toast notification: ${message}`);
    }
}
class NotificationBridge {
    constructor(notification, display) {
        this.notification = notification;
        this.display = display;
    }
    sendAndDisplay(message) {
        this.notification.send(message);
        this.display.display(message);
    }
}
const emailNotification = new EmailNotification();
const smsNotification = new SMSNotification();
const modalDisplay = new ModalNotificationDisplay();
const toastDisplay = new ToastNotificationDisplay();
const emailModalBridge = new NotificationBridge(emailNotification, modalDisplay);
const smsToastBridge = new NotificationBridge(smsNotification, toastDisplay);
emailModalBridge.sendAndDisplay("New email received");
smsToastBridge.sendAndDisplay("New SMS received");
