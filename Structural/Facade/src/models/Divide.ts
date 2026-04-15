// Facade Pattern — Subsystem class (division)
// One of four arithmetic subsystem classes hidden behind CalculatorFacade.
// Client code never instantiates this directly; the facade owns and invokes it.

import { Calculator } from "../interfaces/Calculator";

/** Subsystem class — performs division. Used internally by CalculatorFacade. */
export class Divide implements Calculator {
  calculate(num1: number, num2: number) {
    return num1 / num2;
  }
}
