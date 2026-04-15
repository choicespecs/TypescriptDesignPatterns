// State Pattern — ConcreteState (Silver / standard tier)
// Default account tier with normal deposit/withdraw and threshold-based transitions.

import { State } from "../interfaces/State";
import { Red } from "./Red";
import { Gold } from "./Gold";

/**
 * ConcreteState representing the standard Silver tier.
 * Applies no bonuses or penalties; transitions to Red if balance drops below 0,
 * or to Gold if balance exceeds 1000.
 */
export class Silver extends State {
  public name = "Silver";
  private _upperLimit = 1000;
  private _lowerLimit = 0;

  deposit(amount: number) {
    this.account.balance += amount;
    this.stateChangeCheck();
  }

  withdraw(amount: number) {
    this.account.balance -= amount;
    this.stateChangeCheck();
  }

  private stateChangeCheck() {
    if (this.account.balance < this._lowerLimit) {
      this.account.transitionTo(new Red()); // Balance went negative — downgrade to Red
    } else if (this.account.balance > this._upperLimit) {
      this.account.transitionTo(new Gold()); // Balance high enough — upgrade to Gold
    }
  }
}
