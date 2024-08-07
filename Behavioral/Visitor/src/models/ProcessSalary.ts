import { Manager } from "./Manager";
import { PayrollProcessor } from "./PayrollProcessor";
import { Employee } from "../interfaces/Employee";
import { Engineer } from "./Engineer";

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
  employee.accept(payrollProcessor);
}
