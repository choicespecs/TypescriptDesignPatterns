// Strategy Pattern — ConcreteStrategy (credit card payment)
// Validates a security code and applies a daily APR fee to the user's balance.

import { Payment } from "../interfaces/Payment";
import { User } from "./User";

/**
 * ConcreteStrategy implementing credit card payment.
 * Validates the user's security code and deducts an APR-based fee proportional to the year length.
 * Returns 0 if the security code does not match, blocking the payment.
 */
export class CreditCardPayment implements Payment {
  private APR = 0.025;
  private securityCode = "123";

  getDay() {
    return new Date().getFullYear() % 4 == 0 ? 366 : 365;
  }

  pay(user: User) {
    const date = this.getDay();
    if (user.getSecurityCode === this.securityCode) {
      return user.getAmount - date * this.APR; // Deduct annual percentage rate fee
    } else {
      return 0; // Invalid security code — payment blocked
    }
  }
}
