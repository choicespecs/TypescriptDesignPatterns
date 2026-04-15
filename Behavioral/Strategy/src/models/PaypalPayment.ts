// Strategy Pattern — ConcreteStrategy (PayPal payment)
// Applies a flat $5 transaction fee with no credential validation.

import { User } from "./User";
import { Payment } from "../interfaces/Payment";

/**
 * ConcreteStrategy implementing PayPal payment.
 * The simplest strategy: deducts a fixed fee with no security checks.
 * Swapping this in at runtime changes the fee behaviour without modifying the User context.
 */
export class PaypalPayment implements Payment {
  private fees = 5;

  pay(user: User) {
    return user.getAmount - this.fees; // Flat fee regardless of amount
  }
}
