import { ChatMediator } from "./ChatMediator";
import { User } from "./User";

abstract class Component {
  protected mediator: ChatMediator;

  constructor(mediator: ChatMediator) {
    this.mediator = mediator;
  }
}

// Concrete components representing users in the chat room.
export class UserComponent extends Component {
  private user: User;

  constructor(user: User, mediator: ChatMediator) {
    super(mediator);
    this.user = user;
  }

  // Send a message to another user.
  sendMessage(receiver: User, message: string) {
    this.mediator.sendMessage(this.user, receiver, message);
  }
}
