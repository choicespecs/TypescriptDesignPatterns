// Mediator Pattern — Abstract Colleague base class
// Stores a reference to the mediator so every concrete colleague can communicate
// through it without knowing about other colleagues.

import { ChatMediator } from "./ChatMediator";

/**
 * Abstract Colleague that holds a mediator reference inherited by UserComponent.
 * Subclasses communicate exclusively through this.mediator rather than directly
 * with each other, keeping colleagues loosely coupled.
 */
export abstract class Component {
  /** The mediator through which all inter-colleague communication is routed. */
  protected mediator: ChatMediator;

  constructor(mediator: ChatMediator) {
    this.mediator = mediator;
  }
}
