class Account {
    private _state : State;
    private _owner : string;
    private _balance : number;

    constructor(owner: string) {
        this._owner = owner;
        this._balance = 0;
        this.transitionTo(new Silver());
    }

    get state() {
        return this._state;
    }

    set state(nextState : State) {
        this._state = nextState;
    }

    get owner() {
        return this._owner;
    }

    set owner(newOwner : string) {
        this._owner = newOwner;
    }

    get balance() {
        return this._balance;
    }

    set balance(amount : number) {
        this._balance = amount;
    }

    deposit(amount : number) {
        this._state.deposit(amount);
    }

    withdraw(amount: number) {
        this._state.withdraw(amount);
    }

    transitionTo(state: State) {
        this.state = state;
        this.state.account = this;
    }

    get stateName() {
        return this.state.constructor.name;
    }
}

abstract class State {
    protected _account : Account;

    get account() {
        return this._account;
    }

    set account(account : Account) {
        this._account = account;
    }

    abstract deposit(amount: number) : void;
    abstract withdraw(amount: number) : void;
}

class Red extends State {
    private _upperLimit = 0;
    private _lowerLimit = -100;
    private _fee = 15;

    deposit(amount: number) {
        super.account.balance += amount;
        this.stateChangeCheck();
    }
    
    withdraw(amount: number) {
        super.account.balance -= this._fee;
    }

    private stateChangeCheck() {
        if (super.account.balance > this._upperLimit) {
            super.account.transitionTo(new Silver());
        }
    }
}

class Silver extends State {

    private _upperLimit = 1000;
    private _lowerLimit = 0;

    deposit(amount: number) {
        super.account.balance += amount;
        this.stateChangeCheck();
    }

    withdraw(amount: number) {
        super.account.balance -= amount;
        this.stateChangeCheck();
    }

    stateChangeCheck() {
        if (super.account.balance < this._lowerLimit) {
            super.account.transitionTo(new Red());
        } else if (super.account.balance > this._upperLimit) {
            super.account.transitionTo(new Gold());
        }
    }
}

class Gold extends State {

    private _upperLimit = 100000000;
    private _lowerLimit = 1000;
    private _interest = 0.05;

    deposit(amount: number) {
        super.account.balance += this._interest * super.account.balance;
        super.account.balance += amount;
        this.stateChangeCheck();
    }

    withdraw(amount: number) {
        super.account.balance -= amount;
        this.stateChangeCheck();
    }

    stateChangeCheck() {
        if (super.account.balance < 0) {
            super.account.transitionTo(new Red());
        } else if (super.account.balance < this._lowerLimit) {
            super.account.transitionTo(new Silver());
        }
    }
}

const account = new Account("Sample User");

const depositForm = <HTMLFormElement>document.querySelector(".deposit-form");
const withdrawForm = <HTMLFormElement>document.querySelector(".withdraw-form");
const depositInput = <HTMLInputElement>document.querySelector("#deposit");
const withdrawInput = <HTMLInputElement>document.querySelector("#withdraw");
const balanceDisplay = <HTMLElement>document.querySelector(".balance");
const statusDisplay = <HTMLElement>document.querySelector(".bank-status-title");
const statusInfoDisplay = <HTMLElement>document.querySelector(".status-info");

updateDisplay();

depositForm?.addEventListener('submit', (e) => {
    e.preventDefault();
});

withdrawForm?.addEventListener('submit', (e) => {
    e.preventDefault();
});

function updateBalance(amount: number) {
    balanceDisplay.innerHTML = amount.toString();
}

function updateDisplay() {
    const statusName = account.stateName;
    statusDisplay.innerHTML = statusName;
    if (statusName === 'Red') {
        statusInfoDisplay.innerHTML = "Warning: You have Red Status any attempt to withdraw will add a fee to your account";
    } else if (statusName === 'Silver') {
        statusInfoDisplay.innerHTML = "Standard Status for all Bank accounts";
    } else {
        statusInfoDisplay.innerHTML = "Congratulations: You now will recieve a 5% bonus on every deposit made";
    }
}

function deposit_account() {
    const elements = depositForm.elements!;
    const amount = parseInt((elements[0] as HTMLFormElement).value);
    if (amount >= 0) {
        account.deposit(amount);
        updateBalance(account.balance);
        updateDisplay();
    }
    depositInput.value = "";
}

function withdraw_account() {
    const elements = withdrawForm.elements;
    const amount = parseInt((elements[0] as HTMLFormElement).value);
    if (amount >= 0) {
        account.withdraw(amount);
        updateBalance(account.balance);
        updateDisplay();
    }
    withdrawInput.value = "";
}
