// Facade Pattern — Facade class
// Hides the four arithmetic subsystem classes (Add, Subtract, Divide, Multiply) behind a
// single, simple API. Client code imports only this class and never touches the subsystems.
// The facade also enables multi-step composition (e.g., tax = price * rate + price)
// without the client managing multiple subsystem instances.

import { Add } from "./Add";
import { Subtract } from "./Subtract";
import { Divide } from "./Divide";
import { Multiply } from "./Multiply";

/**
 * Facade — provides a unified interface to the arithmetic subsystem.
 * Instantiates all four operation classes internally and exposes named methods
 * so callers never need to know which subsystem class handles each operation.
 */
export class CalculatorFacade {
  // Subsystem instances — owned by the facade, invisible to callers
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
