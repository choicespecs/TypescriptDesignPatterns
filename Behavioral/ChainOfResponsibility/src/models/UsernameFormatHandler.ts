// Chain of Responsibility Pattern — Concrete Handler (username format)
// Enforces alphanumeric-only usernames; sits after RequiredFieldHandler("username") in the chain.

import BaseHandler from "../interfaces/BaseHandler";
import ValidationInput from "../interfaces/ValidationInput";

/**
 * Concrete Handler that validates the username contains only letters and digits.
 * Extends BaseHandler to inherit the next-handler reference and setNextHandler().
 */
class UsernameFormatHandler extends BaseHandler {
  handleValidation(inputValue: ValidationInput): boolean {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(inputValue.username)) {
      console.log("Invalid username format");
      return false; // Stop the chain; username contains invalid characters
    }
    if (this.nextHandler) {
      return this.nextHandler.handleValidation(inputValue); // Rule passed — continue chain
    }
    return true;
  }
}

export default UsernameFormatHandler;
