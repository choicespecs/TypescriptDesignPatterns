// Adapter Pattern — Adaptee (bank account data store)
// Holds raw bank account fields; BankCustomer adapts this data to the CreditCardPayment interface.

/**
 * Adaptee in the payment Adapter example.
 * BankDetails stores bank-specific fields (bankName, accName, accNumber) with its own
 * getter/setter API. BankCustomer extends this and adapts it to the CreditCardPayment interface.
 */
export class BankDetails {
  private bankName: string;
  private accName: string;
  private accNumber: number;

  getBankName() {
    return this.bankName;
  }

  setBankName(bankName: string) {
    this.bankName = bankName;
  }

  getAccName() {
    return this.accName;
  }

  setAccName(accName: string) {
    this.accName = accName;
  }

  getAccNumber() {
    return this.accNumber;
  }

  setAccNumber(accNumber: number) {
    this.accNumber = accNumber;
  }
}
