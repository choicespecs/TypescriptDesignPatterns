// Visitor Pattern — Element interface
// Every visitable employee type (Engineer, Manager) implements accept() to enable double dispatch.

import { EmployeeVisitor } from "./EmployeeVisitor";

/**
 * Element interface in the Visitor pattern.
 * Concrete elements (Engineer, Manager) implement accept() by calling visitor.visit(this),
 * which triggers double dispatch: the exact element type and the visitor type both determine
 * which operation runs.
 */
export interface Employee {
  name: string;
  salary: number;
  department: string;
  /** Accepts a visitor and calls visitor.visit(this) to initiate double dispatch. */
  accept(visitor: EmployeeVisitor): void;
}
