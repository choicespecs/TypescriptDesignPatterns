// PayrollProcessor.ts
import { Employee } from "./Employee";
import { EmployeeVisitor } from "./EmployeeVisitor";
import { Manager } from "./Employees";

export class PayrollProcessor implements EmployeeVisitor {
  visit(employee: Employee): void {
    const bonus = employee instanceof Manager ? 0.2 : 0.1;
    const newSalary = employee.salary * (1 + bonus);
    alert(
      `Salary processed for ${employee.constructor.name} ${
        employee.name
      }: $${newSalary.toFixed(2)}`
    );
  }
}
