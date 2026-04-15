// Adapter Pattern — Target interface (payment domain example)
// Defines the credit card payment contract used by BankCustomer.

/**
 * Target interface for the payment Adapter example.
 * BankCustomer extends BankDetails (Adaptee) and implements this interface,
 * adapting bank-account data into the credit card payment shape expected by clients.
 */
export interface CreditCardPayment {
  /** Logs bank account details sourced from the BankDetails adaptee. */
  getBankDetails(): void;
  /** Returns the account number as a credit card identifier. */
  getCreditCard(): string;
}
