// Facade Pattern — Subsystem class (multiplication)
// One of four arithmetic subsystem classes hidden behind CalculatorFacade.
// Client code never instantiates this directly; the facade owns and invokes it.

import { Calculator } from "../interfaces/Calculator";

/** Subsystem class — performs multiplication. Used internally by CalculatorFacade. */
export class Multiply implements Calculator {
  calculate(num1: number, num2: number) {
    return num1 * num2;
  }
}
