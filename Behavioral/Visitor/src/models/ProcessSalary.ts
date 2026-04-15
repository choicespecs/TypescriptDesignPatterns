// Visitor Pattern — Client utility function
// Creates the appropriate ConcreteElement and wires it to the ConcreteVisitor.

import { Manager } from "./Manager";
import { PayrollProcessor } from "./PayrollProcessor";
import { Employee } from "../interfaces/Employee";
import { Engineer } from "./Engineer";

/**
 * Client function that builds a ConcreteElement (Engineer or Manager) and
 * triggers the Visitor pattern via employee.accept(visitor).
 * The element's accept() calls visitor.visit(this), completing double dispatch.
 */
export function processSalary(employeeId: string): void {
  let employee: Employee;

  if (employeeId === "engineer") {
    employee = new Engineer("John Doe", 50000, "Engineering");
  } else if (employeeId === "manager") {
    employee = new Manager("Jane Smith", 80000, "Management");
  } else {
    alert("Invalid employee!");
    return;
  }

  const payrollProcessor = new PayrollProcessor();
  employee.accept(payrollProcessor); // Element calls visitor.visit(this) — double dispatch begins
}
