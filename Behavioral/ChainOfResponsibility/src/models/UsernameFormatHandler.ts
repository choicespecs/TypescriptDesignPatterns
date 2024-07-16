import BaseHandler from "../interfaces/BaseHandler";
import ValidationInput from "../interfaces/ValidationInput";

class UsernameFormatHandler extends BaseHandler {
  handleValidation(inputValue: ValidationInput): boolean {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(inputValue.username)) {
      console.log("Invalid username format");
      return false;
    }
    if (this.nextHandler) {
      return this.nextHandler.handleValidation(inputValue);
    }
    return true;
  }
}

export default UsernameFormatHandler;
