// Strategy Pattern — Entry point / client
// Creates a User (Context) and wires each button to a different ConcreteStrategy.

import { User } from "./models/User";
import { Payment } from "./interfaces/Payment";
import { CreditCardPayment } from "./models/CreditCardPayment";
import { PaypalPayment } from "./models/PaypalPayment";
import { BankPayment } from "./models/BankPayment";

const user1 = new User(2000, "123", "string_cheese");

function paid(payment: Payment, user: User): void {
  user.payment(payment);
  const total = document.querySelector(".total")!;
  total.innerHTML = `$ ${user.getAmount}`;
}

const creditCardButton = document.querySelector("#card")!;
const paypalButton = document.querySelector("#paypal")!;
const bankButton = document.querySelector("#bank")!;

// Each button injects a different strategy — the Context (user1) stays the same
creditCardButton.addEventListener("click", () =>
  paid(new CreditCardPayment(), user1)
);

paypalButton.addEventListener("click", () => paid(new PaypalPayment(), user1));

bankButton.addEventListener("click", () => paid(new BankPayment(), user1));
