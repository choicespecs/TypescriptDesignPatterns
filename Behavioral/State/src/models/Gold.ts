// State Pattern — ConcreteState (Gold / premium tier)
// Rewards deposits with a 5% interest bonus; transitions down when balance falls below thresholds.

import { State } from "../interfaces/State";
import { Red } from "./Red";
import { Silver } from "./Silver";

/**
 * ConcreteState representing the premium Gold tier.
 * Every deposit earns a 5% interest bonus on the current balance before adding the deposited amount.
 * Transitions to Silver if balance drops below 1000, or to Red if it goes negative.
 */
export class Gold extends State {
  public name = "Gold";
  private _upperLimit = 100000000;
  private _lowerLimit = 1000;
  private _interest = 0.05;

  deposit(amount: number) {
    // Gold-tier bonus: apply 5% interest before crediting the deposit
    this.account.balance += this._interest * this.account.balance;
    this.account.balance += amount;
    this.stateChangeCheck();
  }

  withdraw(amount: number) {
    this.account.balance -= amount;
    this.stateChangeCheck();
  }

  private stateChangeCheck() {
    if (this.account.balance < 0) {
      this.account.transitionTo(new Red()); // Severely overdrawn — skip Silver
    } else if (this.account.balance < this._lowerLimit) {
      this.account.transitionTo(new Silver()); // Fell below Gold threshold — downgrade
    }
  }
}
