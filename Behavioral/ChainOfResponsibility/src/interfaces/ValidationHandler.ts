// Chain of Responsibility Pattern — Handler interface
// Defines the contract that every handler in the validation chain must satisfy.

import ValidationInput from "./ValidationInput";

/**
 * Handler interface in the Chain of Responsibility pattern.
 * Every validation step (required-field, email format, etc.) implements this,
 * allowing handlers to be linked together and traversed uniformly.
 */
interface ValidationHandler {
  /** Links this handler to the next one in the chain. */
  setNextHandler(handler: ValidationHandler): void;
  /** Runs this handler's validation rule; returns false immediately on failure
   *  or delegates to the next handler if the rule passes. */
  handleValidation(inputValue: ValidationInput): boolean;
}

export default ValidationHandler;
