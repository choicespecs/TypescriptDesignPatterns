// State Pattern — Abstract State
// Base class for all account tier states; holds a back-reference to the Context (Account).

import { Account } from "../models/Account";

/**
 * Abstract State in the State pattern.
 * Each concrete state (Red, Silver, Gold) extends this, receives a reference to
 * the Account context, and overrides deposit/withdraw with tier-specific behavior.
 * States can trigger transitions by calling this.account.transitionTo().
 */
export abstract class State {
  /** Back-reference to the Context; set by Account.transitionTo() after instantiation. */
  protected _account: Account;
  /** Human-readable tier name displayed in the UI. */
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
