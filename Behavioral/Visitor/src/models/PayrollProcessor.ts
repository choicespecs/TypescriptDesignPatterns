// Visitor Pattern — ConcreteVisitor
// Applies type-specific bonus rates to employees without modifying the element classes.

import { Employee } from "../interfaces/Employee";
import { EmployeeVisitor } from "../interfaces/EmployeeVisitor";
import { Manager } from "./Manager";

/**
 * ConcreteVisitor in the Visitor pattern.
 * PayrollProcessor holds the salary-bonus algorithm and uses instanceof to differentiate
 * between employee types — 20% for managers, 10% for all others (engineers).
 * Adding a new operation (e.g. vacation-day calculator) would mean adding a new Visitor,
 * not modifying Engineer or Manager.
 */
export class PayrollProcessor implements EmployeeVisitor {
  visit(employee: Employee): void {
    // instanceof distinguishes element types since the interface uses a single visit() method
    const bonus = employee instanceof Manager ? 0.2 : 0.1;
    const newSalary = employee.salary * (1 + bonus);
    alert(
      `Salary processed for ${employee.constructor.name} ${
        employee.name
      }: $${newSalary.toFixed(2)}`
    );
  }
}
