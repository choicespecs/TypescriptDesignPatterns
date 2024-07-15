// Employees.ts
import { Employee } from "./Employee";
import { EmployeeVisitor } from "./EmployeeVisitor";

export class Engineer implements Employee {
  constructor(
    public name: string,
    public salary: number,
    public department: string
  ) {}

  accept(visitor: EmployeeVisitor): void {
    visitor.visit(this);
  }
}

export class Manager implements Employee {
  constructor(
    public name: string,
    public salary: number,
    public department: string
  ) {}

  accept(visitor: EmployeeVisitor): void {
    visitor.visit(this);
  }
}
