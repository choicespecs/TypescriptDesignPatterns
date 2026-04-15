// State Pattern — Context
// Delegates deposit/withdraw to the current State object and manages state transitions.

import { State } from "../interfaces/State";
import { Silver } from "./Silver";

/**
 * Context in the State pattern.
 * Account holds the current State and delegates all tier-dependent behavior to it.
 * transitionTo() swaps the current state; the Account itself contains no deposit/withdraw logic.
 */
export class Account {
  private _state: State;
  private _owner: string;
  private _balance: number;

  constructor(owner: string) {
    this._owner = owner;
    this._balance = 0;
    this.transitionTo(new Silver()); // All accounts start in the Silver tier
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

  /** Delegates to the current State — the Account never contains deposit logic itself. */
  deposit(amount: number) {
    this._state.deposit(amount);
  }

  /** Delegates to the current State — behavior changes completely depending on tier. */
  withdraw(amount: number) {
    this._state.withdraw(amount);
  }

  /** Replaces the current state and gives the new state a back-reference to this Account. */
  transitionTo(state: State) {
    this.state = state;
    this.state.account = this; // Inject the context so the state can read/write balance and trigger further transitions
    console.log(`Transitioning to ${state.name}`);
  }

  get stateName() {
    return this.state.name;
  }
}
