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
