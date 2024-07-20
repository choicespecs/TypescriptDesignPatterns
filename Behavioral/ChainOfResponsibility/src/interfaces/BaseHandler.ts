import ValidationHandler from "./ValidationHandler";
import ValidationInput from "./ValidationInput";

abstract class BaseHandler implements ValidationHandler {
  protected nextHandler: ValidationHandler;

  setNextHandler(handler: ValidationHandler): void {
    this.nextHandler = handler;
  }

  abstract handleValidation(inputValues: ValidationInput): boolean;
}

export default BaseHandler;
