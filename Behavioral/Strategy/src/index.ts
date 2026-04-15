// Strategy Pattern — Entry point / client
// Creates a User (Context) and wires each button to a different ConcreteStrategy.

import { User } from "./models/User";
import { Payment } from "./interfaces/Payment";
import { CreditCardPayment } from "./models/CreditCardPayment";
import { PaypalPayment } from "./models/PaypalPayment";
import { BankPayment } from "./models/BankPayment";

const INITIAL_BALANCE = 2000;
let user1 = new User(INITIAL_BALANCE, "123", "string_cheese");

const totalEl = document.querySelector(".total")!;
const resultEl = document.getElementById("payment-result")!;
const customAmountInput = document.getElementById("custom-amount") as HTMLInputElement;
const setBalanceBtn = document.getElementById("set-balance-btn")!;
const resetBtn = document.getElementById("reset-btn")!;

function updateDisplay(): void {
  totalEl.textContent = user1.getAmount.toFixed(2);
}

function showResult(label: string, fee: string, newBalance: string): void {
  resultEl.innerHTML = `
    <div class="result-row">
      <span class="result-label">Strategy</span>
      <span class="result-value">${label}</span>
    </div>
    <div class="result-row">
      <span class="result-label">Fee applied</span>
      <span class="result-fee">${fee}</span>
    </div>
    <div class="result-row">
      <span class="result-label">New balance</span>
      <span class="result-balance">$${newBalance}</span>
    </div>
  `;
  resultEl.classList.add("visible");
}

function paid(payment: Payment, label: string, feeDesc: string): void {
  const before = user1.getAmount;
  user1.payment(payment);
  const after = user1.getAmount;
  const fee = (before - after).toFixed(2);
  updateDisplay();
  showResult(label, `$${fee} (${feeDesc})`, after.toFixed(2));
}

// Initialize display on load
updateDisplay();

// Payment buttons
document.getElementById("card")!.addEventListener("click", () =>
  paid(new CreditCardPayment(), "Credit Card", "APR fee per day")
);
document.getElementById("paypal")!.addEventListener("click", () =>
  paid(new PaypalPayment(), "PayPal", "flat $5")
);
document.getElementById("bank")!.addEventListener("click", () =>
  paid(new BankPayment(), "Bank Transfer", "flat $3")
);

// Set custom balance
setBalanceBtn.addEventListener("click", () => {
  const val = parseFloat(customAmountInput.value);
  if (!isNaN(val) && val > 0) {
    user1 = new User(val, "123", "string_cheese");
    customAmountInput.value = "";
    resultEl.classList.remove("visible");
    updateDisplay();
  }
});

// Allow Enter key in custom amount input
customAmountInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") setBalanceBtn.click();
});

// Reset to initial balance
resetBtn.addEventListener("click", () => {
  user1 = new User(INITIAL_BALANCE, "123", "string_cheese");
  customAmountInput.value = "";
  resultEl.classList.remove("visible");
  updateDisplay();
});
