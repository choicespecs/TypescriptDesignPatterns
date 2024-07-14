import { ChatRoom } from './models/ChatRoom'
import { User } from './models/User';

// Usage
const mediator = new ChatRoom();

// Create users
const alice: User = { id: "1", name: "Alice" };
const bob: User = { id: "2", name: "Bob" };

// Register users with the mediator
mediator.registerUser(alice);
mediator.registerUser(bob);

// Create user components
const aliceComponent = new UserComponent(alice, "chat-window-1", mediator);
const bobComponent = new UserComponent(bob, "chat-window-2", mediator);

// Add event listeners for send buttons
document.getElementById("send-button-1")?.addEventListener("click", () => {
  const messageInput = document.getElementById(
    "message-input-1"
  ) as HTMLInputElement;
  const message = messageInput.value.trim();
  if (message !== "") {
    aliceComponent.sendMessage(bob, message);
    messageInput.value = "";
  }
});

document.getElementById("send-button-2")?.addEventListener("click", () => {
  const messageInput = document.getElementById(
    "message-input-2"
  ) as HTMLInputElement;
  const message = messageInput.value.trim();
  if (message !== "") {
    bobComponent.sendMessage(alice, message);
    messageInput.value = "";
  }