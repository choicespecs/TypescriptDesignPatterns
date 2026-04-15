// State Pattern — ConcreteState (Red / overdrawn tier)
// Penalises withdrawals with a fee; transitions to Silver when balance returns above zero.

import { State } from "../interfaces/State";
import { Silver } from "./Silver";

/**
 * ConcreteState representing the overdrawn Red tier.
 * Deposit behaviour is standard, but any withdrawal attempt deducts a fixed fee
 * instead of the requested amount — a penalty for being in the Red tier.
 */
export class Red extends State {
  public name = "Red";
  private _upperLimit = 0;
  private _lowerLimit = -100;
  private _fee = 15;

  deposit(amount: number) {
    this.account.balance += amount;
    this.stateChangeCheck();
  }

  /** Ignores the requested amount and deducts a fee instead — Red-tier penalty. */
  withdraw(amount: number) {
    this.account.balance -= this._fee;
    this.stateChangeCheck();
  }

  private stateChangeCheck() {
    if (this.account.balance > this._upperLimit) {
      this.account.transitionTo(new Silver()); // Balance recovered — upgrade to Silver
    }
  }
}
