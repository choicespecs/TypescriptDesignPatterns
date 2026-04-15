// Strategy Pattern — Strategy interface
// Common contract for all payment algorithms (CreditCard, PayPal, Bank).

import { User } from "../models/User";

/**
 * Strategy interface in the Strategy pattern.
 * Every payment method (CreditCardPayment, PaypalPayment, BankPayment) implements this,
 * allowing the User (Context) to swap payment algorithms at runtime without changing
 * its own code.
 */
export interface Payment {
  /** Calculates the amount after fees/validation and returns the new balance.
   *  Returns 0 if credentials are invalid. */
  pay(user: User): number;
}
