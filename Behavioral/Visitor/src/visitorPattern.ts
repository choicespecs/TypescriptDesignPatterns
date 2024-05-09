// Employee interface
interface Employee {
  name: string;
  salary: number;
  department: string;
  accept(visitor: EmployeeVisitor): void;
}

// Concrete employee classes
class Engineer implements Employee {
  constructor(
    public name: string,
    public salary: number,
    public department: string
  ) {}

  accept(visitor: EmployeeVisitor): void {
    visitor.visit(this);
  }
}

class Manager implements Employee {
  constructor(
    public name: string,
    public salary: number,
    public department: string
  ) {}

  accept(visitor: EmployeeVisitor): void {
    visitor.visit(this);
  }
}

// Visitor interface
interface EmployeeVisitor {
  visit(employee: Employee): void;
}

// Concrete visitor class
class PayrollProcessor implements EmployeeVisitor {
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

// Function to process salary
function processSalary(employeeId: string): void {
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

// Initialize employee information on page load
document.getElementById("engineer-name")!.textContent = "John Doe";
document.getElementById("engineer-salary")!.textContent = "$50,000";
document.getElementById("engineer-department")!.textContent = "Engineering";

document.getElementById("manager-name")!.textContent = "Jane Smith";
document.getElementById("manager-salary")!.textContent = "$80,000";
document.getElementById("manager-department")!.textContent = "Management";
