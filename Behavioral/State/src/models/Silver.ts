import { State } from "../interfaces/State";
import { Red } from "./Red";
import { Gold } from "./Gold";

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
      this.account.transitionTo(new Red());
    } else if (this.account.balance > this._upperLimit) {
      this.account.transitionTo(new Gold());
    }
  }
}
