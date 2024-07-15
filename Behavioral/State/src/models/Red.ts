import { State } from "./State";
import { Silver } from "./Silver";

export class Red extends State {
  public name = "Red";
  private _upperLimit = 0;
  private _lowerLimit = -100;
  private _fee = 15;

  deposit(amount: number) {
    this.account.balance += amount;
    this.stateChangeCheck();
  }

  withdraw(amount: number) {
    this.account.balance -= this._fee;
    this.stateChangeCheck();
  }

  private stateChangeCheck() {
    if (this.account.balance > this._upperLimit) {
      this.account.transitionTo(new Silver());
    }
  }
}
