// Chain of Responsibility Pattern — Abstract Base Handler
// Stores the next handler reference and provides the setNextHandler implementation
// that all concrete handlers inherit.

import ValidationHandler from "./ValidationHandler";
import ValidationInput from "./ValidationInput";

/**
 * Abstract base handler in the Chain of Responsibility pattern.
 * Concrete handlers (RequiredFieldHandler, EmailFormatHandler, etc.) extend this
 * to inherit chain-linking logic and only need to implement their own validation rule.
 */
abstract class BaseHandler implements ValidationHandler {
  /** Reference to the successor handler; called when this handler's rule passes. */
  protected nextHandler: ValidationHandler;

  /** Stores the next handler, forming a singly-linked chain. */
  setNextHandler(handler: ValidationHandler): void {
    this.nextHandler = handler;
  }

  /** Each concrete handler must implement its specific validation rule here. */
  abstract handleValidation(inputValues: ValidationInput): boolean;
}

export default BaseHandler;
