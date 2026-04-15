// Chain of Responsibility Pattern — Concrete Handler (password format)
// Last handler in the chain; enforces complexity rules (min 8 chars, upper, lower, digit).

import BaseHandler from "../interfaces/BaseHandler";
import ValidationInput from "../interfaces/ValidationInput";

/**
 * Concrete Handler that validates the password meets complexity requirements:
 * at least 8 characters, one uppercase letter, one lowercase letter, and one digit.
 * As the final handler in the chain, its success means the entire chain has passed.
 */
class PasswordFormatHandler extends BaseHandler {
  handleValidation(inputValue: ValidationInput): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(inputValue.password)) {
      console.log("Invalid password format");
      return false; // Final guard — chain fails here if password is too weak
    }
    if (this.nextHandler) {
      return this.nextHandler.handleValidation(inputValue); // Continue if more handlers are linked
    }
    return true; // All handlers in the chain passed
  }
}

export default PasswordFormatHandler;
