"use strict";
// Concrete mediator class that manages communication between components.
class ChatRoom {
    constructor() {
        this.components = [];
    }
    notify(sender, event, data) {
        if (sender instanceof ChatInput && event === "send") {
            const message = data;
            this.sendMessage(message);
        }
        else if (sender instanceof NotificationButton &&
            event === "notificationClicked") {
            this.handleNotification();
        }
    }
    registerComponent(component) {
        this.components.push(component);
    }
    sendMessage(message) {
        console.log(`Message sent: ${message}`);
        this.updateMessageDisplay(`You: ${message}`);
    }
    updateMessageDisplay(message) {
        console.log(`Message displayed: ${message}`);
        // For demonstration, let's assume this method updates the UI to display the message
        const chatMessages = document.getElementById("chat-messages");
        const messageElement = document.createElement("div");
        messageElement.textContent = message;
        chatMessages === null || chatMessages === void 0 ? void 0 : chatMessages.appendChild(messageElement);
    }
    handleNotification() {
        console.log("Notification button clicked");
        // Handle notification logic
    }
}
// Components communicate with a mediator using the mediator
// interface. Thanks to that, you can use the same components in
// other contexts by linking them with different mediator
// objects.
class Component {
    constructor(mediator) {
        this.mediator = mediator;
    }
}
// Concrete components don't talk to each other. They have only
// one communication channel, which is sending notifications to
// the mediator.
class ChatInput extends Component {
    constructor(mediator) {
        super(mediator);
        this.messageInput = document.getElementById("message-input");
        this.sendButton = document.getElementById("send-button");
        this.sendButton.addEventListener("click", this.click.bind(this));
    }
    click() {
        console.log("send message");
        this.sendMessage();
    }
    sendMessage() {
        const message = this.messageInput.value.trim();
        if (message !== "") {
            this.mediator.notify(this, "send", message);
            this.messageInput.value = "";
        }
    }
}
class NotificationButton extends Component {
    constructor(mediator) {
        super(mediator);
        this.button = document.getElementById("notification-button");
        this.button.addEventListener("click", this.click.bind(this));
    }
    click() {
        this.mediator.notify(this, "notificationClicked");
    }
}
// Usage
const mediator = new ChatRoom();
const chatInput = new ChatInput(mediator);
const notificationButton = new NotificationButton(mediator);
// Register the components with the mediator
mediator.registerComponent(chatInput);
mediator.registerComponent(notificationButton);
