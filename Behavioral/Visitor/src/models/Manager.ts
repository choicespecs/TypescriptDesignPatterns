// Visitor Pattern — ConcreteElement (Manager)
// Implements accept() identically to Engineer; the visitor distinguishes the types at runtime.

import { Employee } from "../interfaces/Employee";
import { EmployeeVisitor } from "../interfaces/EmployeeVisitor";

/**
 * ConcreteElement representing a manager employee.
 * accept() passes itself to the visitor; PayrollProcessor uses instanceof to
 * determine the 20% bonus rate specific to managers.
 */
export class Manager implements Employee {
  constructor(
    public name: string,
    public salary: number,
    public department: string
  ) {}

  /** Double dispatch: calls visitor.visit(this), letting the visitor determine Manager-specific behaviour. */
  accept(visitor: EmployeeVisitor): void {
    visitor.visit(this);
  }
}
