// Strategy Pattern — ConcreteStrategy (bank transfer payment)
// Validates a password and applies a $3 flat fee.

import { Payment } from "../interfaces/Payment";
import { User } from "./User";

/**
 * ConcreteStrategy implementing bank transfer payment.
 * Validates the user's password before deducting a flat $3 fee.
 * Returns 0 if the password is incorrect, similar to CreditCardPayment's security check.
 */
export class BankPayment implements Payment {
  private password = "string_cheese";
  private fees = 3;

  pay(user: User) {
    if (user.getPassword === this.password) {
      return user.getAmount - this.fees; // Password matched — deduct bank transfer fee
    } else {
      return 0; // Wrong password — payment blocked
    }
  }
}
