import { User } from "./User";

// Payment.ts
export interface Payment {
  pay(user: User): number;
}

export class CreditCardPayment implements Payment {
  private APR = 0.025;
  private securityCode = "123";

  getDay() {
    return new Date().getFullYear() % 4 == 0 ? 366 : 365;
  }

  pay(user: User) {
    const date = this.getDay();
    if (user.getSecurityCode === this.securityCode) {
      return user.getAmount - date * this.APR;
    } else {
      return 0;
    }
  }
}

export class PaypalPayment implements Payment {
  private fees = 5;

  pay(user: User) {
    return user.getAmount - this.fees;
  }
}

export class BankPayment implements Payment {
  private password = "string_cheese";
  private fees = 3;

  pay(user: User) {
    if (user.getPassword === this.password) {
      return user.getAmount - this.fees;
    } else {
      return 0;
    }
  }
}
