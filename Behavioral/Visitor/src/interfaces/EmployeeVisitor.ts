// Visitor Pattern — Visitor interface
// Declares the visit() operation that ConcreteVisitors (PayrollProcessor) must implement.

import { Employee } from "./Employee";

/**
 * Visitor interface in the Visitor pattern.
 * PayrollProcessor implements this, allowing new salary operations to be added
 * without modifying the Employee element classes.
 */
export interface EmployeeVisitor {
  /** Called by an element's accept(); receives the element and applies the visitor's operation. */
  visit(employee: Employee): void;
}
