// Mediator Pattern — Mediator interface
// Declares the communication contract that the ConcreteMediator (ChatRoom) must fulfil.

import { User } from "./User";

/**
 * Mediator interface in the Mediator pattern.
 * UserComponents never reference each other directly; they call sendMessage() on
 * this interface, letting ChatRoom control how the message is routed and displayed.
 */
export interface ChatMediator {
  sendMessage(sender: User, receiver: User, message: string): void;
}
