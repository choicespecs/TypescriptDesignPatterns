import { Account } from "./models/Account";

const account = new Account("Sample User");

const depositForm = <HTMLFormElement>document.querySelector(".deposit-form");
const withdrawForm = <HTMLFormElement>document.querySelector(".withdraw-form");
const depositInput = <HTMLInputElement>document.querySelector("#deposit");
const withdrawInput = <HTMLInputElement>document.querySelector("#withdraw");
const balanceDisplay = <HTMLElement>document.querySelector(".balance");
const statusDisplay = <HTMLElement>document.querySelector(".bank-status-title");
const statusInfoDisplay = <HTMLElement>document.querySelector(".status-info");

updateDisplay();

depositForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  deposit_account();
});

withdrawForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  withdraw_account();
});

function updateBalance(amount: number) {
  balanceDisplay.innerHTML = amount.toString();
}

function updateDisplay() {
  const statusName = account.stateName;
  statusDisplay.innerHTML = statusName;
  if (statusName === "Red") {
    statusInfoDisplay.innerHTML =
      "Warning: You have Red Status any attempt to withdraw will add a fee to your account";
  } else if (statusName === "Silver") {
    statusInfoDisplay.innerHTML = "Standard Status for all Bank accounts";
  } else {
    statusInfoDisplay.innerHTML =
      "Congratulations: You now will receive a 5% bonus on every deposit made";
  }
}

function deposit_account() {
  const amount = parseInt(depositInput.value);
  if (amount >= 0) {
    account.deposit(amount);
    updateBalance(account.balance);
    updateDisplay();
  }
  depositInput.value = "";
}

function withdraw_account() {
  const amount = parseInt(withdrawInput.value);
  if (amount >= 0) {
    account.withdraw(amount);
    updateBalance(account.balance);
    updateDisplay();
  }
  withdrawInput.value = "";
}

// Ensure these functions are globally accessible
(window as any).deposit_account = deposit_account;
(window as any).withdraw_account = withdraw_account;
