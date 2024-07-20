import ValidationInput from "./ValidationInput";

interface ValidationHandler {
  setNextHandler(handler: ValidationHandler): void;
  handleValidation(inputValue: ValidationInput): boolean;
}

export default ValidationHandler;
