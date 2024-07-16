import { EmployeeVisitor } from "./EmployeeVisitor";
// Employee.ts
export interface Employee {
  name: string;
  salary: number;
  department: string;
  accept(visitor: EmployeeVisitor): void;
}
