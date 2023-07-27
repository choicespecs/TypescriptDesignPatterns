"use strict";
class Account {
    constructor(owner) {
        this._owner = owner;
        this._balance = 0;
        this.transitionTo(new Silver());
    }
    get state() {
        return this._state;
    }
    set state(nextState) {
        this._state = nextState;
    }
    get owner() {
        return this._owner;
    }
    set owner(newOwner) {
        this._owner = newOwner;
    }
    get balance() {
        return this._balance;
    }
    set balance(amount) {
        this._balance = amount;
    }
    deposit(amount) {
        this._state.deposit(amount);
    }
    withdraw(amount) {
        this._state.withdraw(amount);
    }
    transitionTo(state) {
        this.state = state;
        this.state.account = this;
    }
    get stateName() {
        return this.state.constructor.name;
    }
}
class State {
    get account() {
        return this._account;
    }
    set account(account) {
        this._account = account;
    }
}
class Red extends State {
    constructor() {
        super(...arguments);
        this._upperLimit = 0;
        this._lowerLimit = -100;
        this._fee = 15;
    }
    deposit(amount) {
        super.account.balance += amount;
        this.stateChangeCheck();
    }
    withdraw(amount) {
        super.account.balance -= this._fee;
    }
    stateChangeCheck() {
        if (super.account.balance > this._upperLimit) {
            super.account.transitionTo(new Silver());
        }
    }
}
class Silver extends State {
    constructor() {
        super(...arguments);
        this._upperLimit = 1000;
        this._lowerLimit = 0;
    }
    deposit(amount) {
        super.account.balance += amount;
        this.stateChangeCheck();
    }
    withdraw(amount) {
        super.account.balance -= amount;
        this.stateChangeCheck();
    }
    stateChangeCheck() {
        if (super.account.balance < this._lowerLimit) {
            super.account.transitionTo(new Red());
        }
        else if (super.account.balance > this._upperLimit) {
            super.account.transitionTo(new Gold());
        }
    }
}
class Gold extends State {
    constructor() {
        super(...arguments);
        this._upperLimit = 100000000;
        this._lowerLimit = 1000;
        this._interest = 0.05;
    }
    deposit(amount) {
        super.account.balance += this._interest * super.account.balance;
        super.account.balance += amount;
        this.stateChangeCheck();
    }
    withdraw(amount) {
        super.account.balance -= amount;
        this.stateChangeCheck();
    }
    stateChangeCheck() {
        if (super.account.balance < 0) {
            super.account.transitionTo(new Red());
        }
        else if (super.account.balance < this._lowerLimit) {
            super.account.transitionTo(new Silver());
        }
    }
}
const account = new Account("Sample User");
const depositForm = document.querySelector(".deposit-form");
const withdrawForm = document.querySelector(".withdraw-form");
const depositInput = document.querySelector("#deposit");
const withdrawInput = document.querySelector("#withdraw");
const balanceDisplay = document.querySelector(".balance");
const statusDisplay = document.querySelector(".bank-status-title");
const statusInfoDisplay = document.querySelector(".status-info");
updateDisplay();
depositForm === null || depositForm === void 0 ? void 0 : depositForm.addEventListener('submit', (e) => {
    e.preventDefault();
});
withdrawForm === null || withdrawForm === void 0 ? void 0 : withdrawForm.addEventListener('submit', (e) => {
    e.preventDefault();
});
function updateBalance(amount) {
    balanceDisplay.innerHTML = amount.toString();
}
function updateDisplay() {
    const statusName = account.stateName;
    statusDisplay.innerHTML = statusName;
    if (statusName === 'Red') {
        statusInfoDisplay.innerHTML = "Warning: You have Red Status any attempt to withdraw will add a fee to your account";
    }
    else if (statusName === 'Silver') {
        statusInfoDisplay.innerHTML = "Standard Status for all Bank accounts";
    }
    else {
        statusInfoDisplay.innerHTML = "Congratulations: You now will recieve a 5% bonus on every deposit made";
    }
}
function deposit_account() {
    const elements = depositForm.elements;
    const amount = parseInt(elements[0].value);
    if (amount >= 0) {
        account.deposit(amount);
        updateBalance(account.balance);
        updateDisplay();
    }
    depositInput.value = "";
}
function withdraw_account() {
    const elements = withdrawForm.elements;
    const amount = parseInt(elements[0].value);
    if (amount >= 0) {
        account.withdraw(amount);
        updateBalance(account.balance);
        updateDisplay();
    }
    withdrawInput.value = "";
}
