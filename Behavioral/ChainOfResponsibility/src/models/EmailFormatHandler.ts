// Chain of Responsibility Pattern — Concrete Handler (email format)
// Validates the email field structure; sits after RequiredFieldHandler("email") in the chain.

import BaseHandler from "../interfaces/BaseHandler";
import ValidationInput from "../interfaces/ValidationInput";

/**
 * Concrete Handler that checks the email field is present and matches
 * the standard user@domain.tld pattern.
 */
class EmailFormatHandler extends BaseHandler {
  handleValidation(inputValue: ValidationInput): boolean {
    const fieldValue = inputValue.email;
    if (fieldValue === undefined || fieldValue.trim() === "") {
      console.log("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputValue.email)) {
      console.log("Invalid email format");
      return false; // Stop the chain; email is malformed
    }

    if (this.nextHandler) {
      return this.nextHandler.handleValidation(inputValue); // Delegate to next handler
    }
    return true;
  }
}

export default EmailFormatHandler;
