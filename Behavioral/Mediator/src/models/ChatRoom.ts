import { User } from "./User";
import { ChatMediator } from "./ChatMediator";

// Concrete mediator class that manages communication between users.
export class ChatRoom implements ChatMediator {
  private users: User[] = [];

  constructor(private chatMessages: NodeListOf<HTMLElement>) {}

  // Register a user with the mediator.
  registerUser(user: User) {
    this.users.push(user);
  }

  // Send a message from one user to another.
  sendMessage(sender: User, receiver: User, message: string) {
    // Handle message logic, such as updating chat history, etc.
    this.updateMessageDisplay(`${sender.name}: ${message}`);
  }

  // Update the chat message display.
  private updateMessageDisplay(message: string) {
    this.chatMessages.forEach((chatMessage) => {
      const childElement = document.createElement("div"); // Example of child element creation
      // Append whatever child element you want
      childElement.textContent = message;
      chatMessage.appendChild(childElement);
    });
  }
}
