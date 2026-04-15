// Mediator Pattern — ConcreteColleague
// Represents a chat participant; sends messages exclusively through the mediator.

import { ChatMediator } from "../interfaces/ChatMediator";
import { User } from "../interfaces/User";
import { Component } from "../interfaces/Component";

/**
 * ConcreteColleague in the Mediator pattern.
 * UserComponent wraps a User identity and extends Component to inherit the mediator
 * reference. It never communicates with other UserComponents directly.
 */
export class UserComponent extends Component {
  private user: User;

  constructor(user: User, mediator: ChatMediator) {
    super(mediator);
    this.user = user;
  }

  /** Delegates all outgoing messages to the mediator — the key Mediator pattern interaction. */
  sendMessage(receiver: User, message: string) {
    this.mediator.sendMessage(this.user, receiver, message);
  }
}
