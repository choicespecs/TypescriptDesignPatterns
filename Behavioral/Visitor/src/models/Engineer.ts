import { Employee } from "../interfaces/Employee";
import { EmployeeVisitor } from "../interfaces/EmployeeVisitor";

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
