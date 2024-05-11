import BaseHandler from "./BaseHandler";
import ValidationInput from "./ValidationInput";

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
      return false;
    }

    if (this.nextHandler) {
      return this.nextHandler.handleValidation(inputValue);
    }
    return true;
  }
}

export default EmailFormatHandler;
