// Mediator Pattern — ConcreteMediator
// Central hub that receives all messages from colleagues and decides how to display them.

import { User } from "../interfaces/User";
import { ChatMediator } from "../interfaces/ChatMediator";

/**
 * ConcreteMediator in the Mediator pattern.
 * ChatRoom is the single point of communication between UserComponents.
 * It maintains the participant registry and owns all DOM update logic,
 * so UserComponents never need references to each other.
 */
export class ChatRoom implements ChatMediator {
  private users: User[] = [];

  constructor(private chatMessages: NodeListOf<Element>) {}

  /** Adds a user to the mediator's registry so it can be addressed in messages. */
  registerUser(user: User) {
    this.users.push(user);
  }

  /** Receives a message from a colleague and broadcasts it to the chat display.
   *  This is the core mediator routing point — colleagues only call this, never each other. */
  sendMessage(sender: User, receiver: User, message: string) {
    this.updateMessageDisplay(`${sender.name}: ${message}`);
  }

  /** Appends the formatted message to every chat-message DOM element. */
  private updateMessageDisplay(message: string) {
    this.chatMessages.forEach((chatMessage) => {
      const childElement = document.createElement("div");
      childElement.textContent = message;
      chatMessage.appendChild(childElement);
    });
  }
}
