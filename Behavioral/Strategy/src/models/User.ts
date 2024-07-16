import { Payment } from "../interfaces/Payment";

// User.ts
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

  payment(payment: Payment): void {
    const total = payment.pay(this);
    if (total > 0) {
      this.amount = payment.pay(this);
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
