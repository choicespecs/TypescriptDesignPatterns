// Facade Pattern — Subsystem class (subtraction)
// One of four arithmetic subsystem classes hidden behind CalculatorFacade.
// Client code never instantiates this directly; the facade owns and invokes it.

import { Calculator } from "../interfaces/Calculator";

/** Subsystem class — performs subtraction. Used internally by CalculatorFacade. */
export class Subtract implements Calculator {
  calculate(num1: number, num2: number) {
    return num1 - num2;
  }
}
