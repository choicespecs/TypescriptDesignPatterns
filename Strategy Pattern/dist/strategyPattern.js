"use strict";
class CreditCardPayment {
    constructor() {
        this.APR = 0.025;
        this.securityCode = "123";
    }
    getDay() {
        return new Date().getFullYear() % 4 == 0 ? 366 : 365;
    }
    pay(user) {
        const date = this.getDay();
        if (user.getSecurityCode === this.securityCode) {
            return user.getAmount - date * this.APR;
        }
        else {
            return 0;
        }
    }
}
class PaypalPayment {
    constructor() {
        this.fees = 5;
    }
    pay(user) {
        return user.getAmount - this.fees;
    }
}
class BankPayment {
    constructor() {
        this.password = "string_cheese";
        this.fees = 3;
    }
    pay(user) {
        if (user.getPassword === this.password) {
            return user.getAmount - this.fees;
        }
        else {
            return 0;
        }
    }
}
class User {
    constructor(amount, securityCode, password) {
        this.amount = amount;
        this.securityCode = securityCode;
        this.password = password;
        this.securityCode = securityCode;
        this.password = password;
        this.amount = amount;
    }
    payment(payment) {
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
    set setAmount(amount) {
        this.amount = amount;
    }
}
const user1 = new User(2000, "123", "string_cheese");
function paid(payment, user) {
    user.payment(payment);
    const total = document.querySelector(".total");
    total.innerHTML = `$ ${user.getAmount}`;
}
const creditCardButton = document.querySelector("#card");
const paypalButton = document.querySelector("#paypal");
const bankButton = document.querySelector("#bank");
creditCardButton.addEventListener("click", () => paid(new CreditCardPayment(), user1));
paypalButton.addEventListener("click", () => paid(new PaypalPayment(), user1));
bankButton.addEventListener("click", () => paid(new BankPayment(), user1));
