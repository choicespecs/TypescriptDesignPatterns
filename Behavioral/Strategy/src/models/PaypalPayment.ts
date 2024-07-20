import { User } from "./User";
import { Payment } from "../interfaces/Payment";

export class PaypalPayment implements Payment {
  private fees = 5;

  pay(user: User) {
    return user.getAmount - this.fees;
  }
}
