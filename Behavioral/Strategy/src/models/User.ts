// Strategy Pattern — Context
// Holds the user's balance and credentials; delegates payment calculation to an injected Strategy.

import { Payment } from "../interfaces/Payment";

/**
 * Context in the Strategy pattern.
 * User holds the payment-relevant data (amount, credentials) and delegates
 * the actual fee calculation to whichever Payment strategy is passed at runtime.
 * Swapping the strategy object changes the algorithm without modifying this class.
 */
export class User {
  constructor(
    private amount: number,
    private securityCode: string,
    private password: string
  ) {
    this.securityCode = securityCode;
    this.password = password;
    this.amount = amount;
  }

  /** Executes the chosen payment strategy; updates balance only if the strategy succeeds. */
  payment(payment: Payment): void {
    const total = payment.pay(this); // Delegate to the injected strategy
    if (total > 0) {
      this.amount = payment.pay(this); // Update balance with the strategy's result
    }
  }

  get getSecurityCode() {
    return this.securityCode;
  }

  get getPassword() {
    return this.password;
  }

  get getAmount() {
    return this.amount;
  }
  set setAmount(amount: number) {
    this.amount = amount;
  }
}
