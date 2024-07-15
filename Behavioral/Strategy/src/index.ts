// app.ts
import { User } from "./models/User";
import {
  Payment,
  CreditCardPayment,
  PaypalPayment,
  BankPayment,
} from "./models/Payment";

const user1 = new User(2000, "123", "string_cheese");

function paid(payment: Payment, user: User): void {
  user.payment(payment);
  const total = document.querySelector(".total")!;
  total.innerHTML = `$ ${user.getAmount}`;
}

const creditCardButton = document.querySelector("#card")!;
const paypalButton = document.querySelector("#paypal")!;
const bankButton = document.querySelector("#bank")!;

creditCardButton.addEventListener("click", () =>
  paid(new CreditCardPayment(), user1)
);

paypalButton.addEventListener("click", () => paid(new PaypalPayment(), user1));

bankButton.addEventListener("click", () => paid(new BankPayment(), user1));
