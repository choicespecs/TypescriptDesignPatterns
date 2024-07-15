import { Account } from "./Account";

export abstract class State {
  protected _account: Account;
  public abstract name: string;

  get account() {
    return this._account;
  }

  set account(account: Account) {
    this._account = account;
  }

  abstract deposit(amount: number): void;
  abstract withdraw(amount: number): void;
}
