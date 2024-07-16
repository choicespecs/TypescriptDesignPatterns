import { Payment } from "../interfaces/Payment";
import { User } from "./User";

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
