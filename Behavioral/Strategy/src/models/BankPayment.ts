import { Payment } from "../interfaces/Payment";
import { User } from "./User";

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
