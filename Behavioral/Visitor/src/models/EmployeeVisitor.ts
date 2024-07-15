// EmployeeVisitor.ts
import { Employee } from "./Employee";

export interface EmployeeVisitor {
  visit(employee: Employee): void;
}
