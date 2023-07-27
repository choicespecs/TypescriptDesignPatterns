interface Payment {
  pay(user: User): number;
}

class CreditCardPayment implements Payment {
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

class PaypalPayment implements Payment {
  private fees = 5;

  pay(user: User) {
    return user.getAmount - this.fees;
  }
}

class BankPayment implements Payment {
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

class User {
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
