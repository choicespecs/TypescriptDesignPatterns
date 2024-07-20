import { Add } from "./Add";
import { Subtract } from "./Subtract";
import { Divide } from "./Divide";
import { Multiply } from "./Multiply";

export class CalculatorFacade {
  private add = new Add();
  private subtract = new Subtract();
  private divide = new Divide();
  private multiply = new Multiply();

  calculateAdd(num1: number, num2: number) {
    return this.add.calculate(num1, num2);
  }

  calculateSubtract(num1: number, num2: number) {
    return this.subtract.calculate(num1, num2);
  }

  calculateDivide(num1: number, num2: number) {
    return this.divide.calculate(num1, num2);
  }

  calculateMultiply(num1: number, num2: number) {
    return this.multiply.calculate(num1, num2);
  }
}
