// Visitor Pattern — Client utility function
// Creates the appropriate ConcreteElement and wires it to the ConcreteVisitor.

import { Manager } from "./Manager";
import { PayrollProcessor } from "./PayrollProcessor";
import { Employee } from "../interfaces/Employee";
import { Engineer } from "./Engineer";

/**
 * Builds a ConcreteElement (Engineer or Manager), runs the Visitor pattern via
 * employee.accept(visitor), then renders the result into the card's result element.
 */
export function processSalary(employeeId: string): void {
  let employee: Employee;

  if (employeeId === "engineer") {
    employee = new Engineer("John Doe", 50000, "Engineering");
  } else if (employeeId === "manager") {
    employee = new Manager("Jane Smith", 80000, "Management");
  } else {
    const errEl = document.getElementById(`${employeeId}-result`);
    if (errEl) errEl.textContent = "Invalid employee.";
    return;
  }

  const payrollProcessor = new PayrollProcessor();
  employee.accept(payrollProcessor); // double dispatch: accept → visit

  const result = payrollProcessor.lastResult;
  if (!result) return;

  const resultEl = document.getElementById(`${employeeId}-result`);
  if (!resultEl) return;

  const pct = (result.bonusRate * 100).toFixed(0);
  const oldSalary = employee.salary.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const newSalary = result.newSalary.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

  resultEl.innerHTML = `
    <div class="result-row">
      <span class="result-label">Bonus applied</span>
      <span class="result-bonus-rate">+${pct}%</span>
    </div>
    <div class="result-row">
      <span class="result-label">New salary</span>
      <span class="result-salary">${oldSalary} → ${newSalary}</span>
    </div>`;
  resultEl.classList.add("visible");
}
