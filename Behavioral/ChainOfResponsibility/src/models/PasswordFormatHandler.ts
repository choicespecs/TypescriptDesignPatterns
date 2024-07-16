import BaseHandler from "../interfaces/BaseHandler";
import ValidationInput from "../interfaces/ValidationInput";

class PasswordFormatHandler extends BaseHandler {
  handleValidation(inputValue: ValidationInput): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(inputValue.password)) {
      console.log("Invalid password format");
      return false;
    }
    if (this.nextHandler) {
      return this.nextHandler.handleValidation(inputValue);
    }
    return true;
  }
}

export default PasswordFormatHandler;
