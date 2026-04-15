// Adapter Pattern — Adapter (payment domain)
// Extends BankDetails (Adaptee) and implements CreditCardPayment (Target),
// making bank-account data usable wherever a credit card payment is expected.

import { BankDetails } from "./BankDetails";
import { CreditCardPayment } from "../../interfaces/payment/CreditCardPayment";

/**
 * Adapter in the payment Adapter example.
 * Inherits bank data from BankDetails and translates it to the CreditCardPayment
 * Target interface, allowing bank customers to be treated as credit card holders.
 */
export class BankCustomer extends BankDetails implements CreditCardPayment {
  /** Logs full bank account details by reading from the Adaptee (BankDetails) methods. */
  getBankDetails(): void {
    const accNumber = this.getAccNumber();
    const accName = this.getAccName();
    const bankName = this.getBankName();
    console.log(
      `Account Number: ${accNumber}, Account Name; ${accName}, Bank Name; ${bankName}`
    );
  }

  /** Adapts the bank account number into the credit card identifier format expected by the Target. */
  getCreditCard(): string {
    const accNumber = this.getAccNumber();
    return accNumber.toString(); // Reuse Adaptee data in the Target's required format
  }
}
