// Mediator Pattern — Entry point / client
// Instantiates the ChatRoom mediator, registers colleagues, and wires DOM send buttons.

import { ChatRoom } from "./models/ChatRoom";
import { User } from "./interfaces/User";
import { UserComponent } from "./models/UserComponent";

const chatMessages = document.querySelectorAll(".chat-message");
// Single ChatRoom instance acts as the mediator for all participants
const mediator = new ChatRoom(chatMessages);

// Create users
const alice: User = { id: "1", name: "Alice" };
const bob: User = { id: "2", name: "Bob" };

// Register users with the mediator
mediator.registerUser(alice);
mediator.registerUser(bob);

// Create user components
const aliceComponent = new UserComponent(alice, mediator);
const bobComponent = new UserComponent(bob, mediator);

// Add event listeners for send buttons
document.getElementById("send-button-1")?.addEventListener("click", () => {
  const messageInput = document.getElementById(
    "message-input-1"
  ) as HTMLInputElement;
  const message = messageInput.value.trim();
  if (message !== "") {
    aliceComponent.sendMessage(bob, message); // Colleague delegates to mediator — never calls bobComponent directly
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
});
