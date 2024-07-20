import { processSalary } from "./models/ProcessSalary";

// Initialize employee information on page load
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("engineer-name")!.textContent = "John Doe";
  document.getElementById("engineer-salary")!.textContent = "$50,000";
  document.getElementById("engineer-department")!.textContent = "Engineering";

  document.getElementById("manager-name")!.textContent = "Jane Smith";
  document.getElementById("manager-salary")!.textContent = "$80,000";
  document.getElementById("manager-department")!.textContent = "Management";

  // Add event listeners for salary processing
  document
    .getElementById("process-engineer-salary")!
    .addEventListener("click", () => {
      processSalary("engineer");
    });

  document
    .getElementById("process-manager-salary")!
    .addEventListener("click", () => {
      processSalary("manager");
    });
});
