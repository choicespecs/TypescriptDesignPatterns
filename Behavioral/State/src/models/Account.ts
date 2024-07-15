import { State } from "./State";
import { Silver } from "./Silver";

export class Account {
  private _state: State;
  private _owner: string;
  private _balance: number;

  constructor(owner: string) {
    this._owner = owner;
    this._balance = 0;
    this.transitionTo(new Silver());
  }

  get state() {
    return this._state;
  }

  set state(nextState: State) {
    this._state = nextState;
  }

  get owner() {
    return this._owner;
  }

  set owner(newOwner: string) {
    this._owner = newOwner;
  }

  get balance() {
    return this._balance;
  }

  set balance(amount: number) {
    this._balance = amount;
  }

  deposit(amount: number) {
    this._state.deposit(amount);
  }

  withdraw(amount: number) {
    this._state.withdraw(amount);
  }

  transitionTo(state: State) {
    this.state = state;
    this.state.account = this;
    console.log(`Transitioning to ${state.name}`);
  }

  get stateName() {
    return this.state.name;
  }
}
