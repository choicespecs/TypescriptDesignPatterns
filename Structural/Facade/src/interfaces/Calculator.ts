// Facade Pattern — Subsystem interface
// The shared contract for all four arithmetic operation classes (Add, Subtract, Multiply, Divide).
// Each class implements this independently; the CalculatorFacade holds one of each.

/** Subsystem interface: every arithmetic operation class satisfies this contract. */
export interface Calculator {
  calculate(num1: number, num2: number): number;
}
