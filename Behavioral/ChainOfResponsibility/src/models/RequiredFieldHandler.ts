import BaseHandler from "../interfaces/BaseHandler";
import ValidationInput from "../interfaces/ValidationInput";

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
      return false;
    }
    if (this.nextHandler) {
      return this.nextHandler.handleValidation(inputValue);
    }
    return true;
  }
}

export default RequiredFieldHandler;
