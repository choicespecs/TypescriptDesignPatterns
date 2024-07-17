import { BankDetails } from "./BankDetails";
import { CreditCardPayment } from "../../interfaces/payment/CreditCardPayment";
export class BankCustomer extends BankDetails implements CreditCardPayment {
  getBankDetails(): void {
    const accNumber = this.getAccNumber();
    const accName = this.getAccName();
    const bankName = this.getBankName();
    console.log(
      `Account Number: ${accNumber}, Account Name; ${accName}, Bank Name; ${bankName}`
    );
  }

  getCreditCard(): string {
    const accNumber = this.getAccNumber();
    return accNumber.toString();
  }
}
