import { ChatMediator } from "./ChatMediator";

export abstract class Component {
  protected mediator: ChatMediator;

  constructor(mediator: ChatMediator) {
    this.mediator = mediator;
  }
}
