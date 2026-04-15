// Visitor Pattern — ConcreteVisitor
// Applies type-specific bonus rates to employees without modifying the element classes.

import { Employee } from "../interfaces/Employee";
import { EmployeeVisitor } from "../interfaces/EmployeeVisitor";
import { Manager } from "./Manager";

/**
 * ConcreteVisitor in the Visitor pattern.
 * Computes the bonus salary for each employee type and stores the result in
 * `lastResult` so the caller can render it — avoids alert() which is blocked
 * inside sandboxed iframes (e.g. the hub).
 */
export class PayrollProcessor implements EmployeeVisitor {
  /** Set by visit() after processing; read by the caller to update the UI. */
  lastResult: { bonusRate: number; newSalary: number } | null = null;

  visit(employee: Employee): void {
    const bonusRate = employee instanceof Manager ? 0.2 : 0.1;
    this.lastResult = {
      bonusRate,
      newSalary: employee.salary * (1 + bonusRate),
    };
  }
}
