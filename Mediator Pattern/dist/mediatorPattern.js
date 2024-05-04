"use strict";
var _a, _b;
// Concrete mediator class that manages communication between users.
class ChatRoom {
    constructor() {
        this.users = [];
    }
    // Register a user with the mediator.
    registerUser(user) {
        this.users.push(user);
    }
    // Send a message from one user to another.
    sendMessage(sender, receiver, message) {
        // Handle message logic, such as updating chat history, etc.
        this.updateMessageDisplay(`${sender.name}: ${message}`);
    }
    // Update the chat message display.
    updateMessageDisplay(message) {
        const chatMessages3 = document.querySelectorAll(".chat-messages");
        chatMessages3.forEach((chatMessage) => {
            const childElement = document.createElement("div"); // Example of child element creation
            // Append whatever child element you want
            childElement.textContent = message;
            chatMessage.appendChild(childElement);
        });
    }
}
// Components communicate with a mediator using the mediator
// interface.
class Component {
    constructor(mediator) {
        this.mediator = mediator;
    }
}
// Concrete components representing users in the chat room.
class UserComponent extends Component {
    constructor(user, chatWindowId, mediator) {
        super(mediator);
        this.user = user;
        this.chatWindowId = chatWindowId;
    }
    // Send a message to another user.
    sendMessage(receiver, message) {
        this.mediator.sendMessage(this.user, receiver, message);
    }
}
// Usage
const mediator = new ChatRoom();
// Create users
const alice = { id: "1", name: "Alice" };
const bob = { id: "2", name: "Bob" };
// Register users with the mediator
mediator.registerUser(alice);
mediator.registerUser(bob);
// Create user components
const aliceComponent = new UserComponent(alice, "chat-window-1", mediator);
const bobComponent = new UserComponent(bob, "chat-window-2", mediator);
// Add event listeners for send buttons
(_a = document.getElementById("send-button-1")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const messageInput = document.getElementById("message-input-1");
    const message = messageInput.value.trim();
    if (message !== "") {
        aliceComponent.sendMessage(bob, message);
        messageInput.value = "";
    }
});
(_b = document.getElementById("send-button-2")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    const messageInput = document.getElementById("message-input-2");
    const message = messageInput.value.trim();
    if (message !== "") {
        bobComponent.sendMessage(alice, message);
        messageInput.value = "";
    }
});
