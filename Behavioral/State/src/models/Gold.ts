import { State } from "./State";
import { Red } from "./Red";
import { Silver } from "./Silver";

export class Gold extends State {
  public name = "Gold";
  private _upperLimit = 100000000;
  private _lowerLimit = 1000;
  private _interest = 0.05;

  deposit(amount: number) {
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
      this.account.transitionTo(new Red());
    } else if (this.account.balance < this._lowerLimit) {
      this.account.transitionTo(new Silver());
    }
  }
}
