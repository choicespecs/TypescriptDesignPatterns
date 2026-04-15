// Visitor Pattern — ConcreteElement (Engineer)
// Implements accept() to allow visitors to process engineer-specific logic via double dispatch.

import { Employee } from "../interfaces/Employee";
import { EmployeeVisitor } from "../interfaces/EmployeeVisitor";

/**
 * ConcreteElement representing an engineer employee.
 * accept() passes itself to the visitor; PayrollProcessor uses instanceof to
 * determine the 10% bonus rate specific to engineers.
 */
export class Engineer implements Employee {
  constructor(
    public name: string,
    public salary: number,
    public department: string
  ) {}

  /** Double dispatch: calls visitor.visit(this), letting the visitor determine Engineer-specific behaviour. */
  accept(visitor: EmployeeVisitor): void {
    visitor.visit(this);
  }
}
