// Chain of Responsibility Pattern — Concrete Handler (required-field check)
// Rejects empty fields for any named ValidationInput key; used multiple times in the chain.

import BaseHandler from "../interfaces/BaseHandler";
import ValidationInput from "../interfaces/ValidationInput";

/**
 * Concrete Handler that checks whether a specific field is non-empty.
 * Parameterised with a field name so the same class can guard username, email,
 * and password without duplication.
 */
class RequiredFieldHandler extends BaseHandler {
  private field: keyof ValidationInput;

  constructor(field: keyof ValidationInput) {
    super();
    this.field = field;
  }

  handleValidation(inputValue: ValidationInput): boolean {
    const fieldValue = inputValue[this.field];
    if (fieldValue === undefined || fieldValue.trim() === "") {
      console.log(`${this.field} is required`);
      return false; // Short-circuit: stop the chain on the first failure
    }
    if (this.nextHandler) {
      return this.nextHandler.handleValidation(inputValue); // Pass to next handler
    }
    return true;
  }
}

export default RequiredFieldHandler;
