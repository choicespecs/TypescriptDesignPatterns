"use strict";
const form = document.querySelector('form');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => {
    e.preventDefault();
});
class Add {
    calculate(num1, num2) {
        return num1 + num2;
    }
}
class Subtract {
    calculate(num1, num2) {
        return num1 - num2;
    }
}
class Divide {
    calculate(num1, num2) {
        return num1 / num2;
    }
}
class Multiply {
    calculate(num1, num2) {
        return num1 * num2;
    }
}
class CalculatorFacade {
    constructor() {
        this.add = new Add();
        this.subtract = new Subtract();
        this.divide = new Divide();
        this.multiply = new Multiply();
    }
    calculateAdd(num1, num2) {
        return this.add.calculate(num1, num2);
    }
    calculateSubtract(num1, num2) {
        return this.subtract.calculate(num1, num2);
    }
    calculateDivide(num1, num2) {
        return this.divide.calculate(num1, num2);
    }
    calculateMultiply(num1, num2) {
        return this.multiply.calculate(num1, num2);
    }
}
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const total = document.querySelector(".calculator.total");
const add_button = document.querySelector("#calculator_add");
const subtract_button = document.querySelector("#calculator_subtract");
const divide_button = document.querySelector("#calculator_divide");
const multiply_button = document.querySelector("#calculator_multiply");
const calculator = new CalculatorFacade();
let num1_value = null;
let num2_value = null;
function resetValues() {
    num1_value = null;
    num2_value = null;
    num1.value = "";
    num2.value = "";
}
function isValuesValid() {
    if (num1.value && num2.value) {
        return true;
    }
    return false;
}
function add_values() {
    if (isValuesValid()) {
        num1_value = Number(num1.value);
        num2_value = Number(num2.value);
        return calculator.calculateAdd(num1_value, num2_value);
    }
}
function subtract_values() {
    if (isValuesValid()) {
        num1_value = Number(num1.value);
        num2_value = Number(num2.value);
        return calculator.calculateSubtract(num1_value, num2_value);
    }
}
function divide_values() {
    if (isValuesValid()) {
        num1_value = Number(num1.value);
        num2_value = Number(num2.value);
        return calculator.calculateDivide(num1_value, num2_value);
    }
}
function multiply_values() {
    if (isValuesValid()) {
        num1_value = Number(num1.value);
        num2_value = Number(num2.value);
        return calculator.calculateMultiply(num1_value, num2_value);
    }
}
function calculate_switch(type) {
    let value = undefined;
    switch (type) {
        case "add": {
            value = add_values();
            break;
        }
        case "subtract": {
            value = subtract_values();
            break;
        }
        case "divide": {
            value = divide_values();
            break;
        }
        case "multiply": {
            value = multiply_values();
            break;
        }
    }
    if (value) {
        total.innerHTML = value.toString();
        resetValues();
    }
}
add_button.addEventListener("click", () => calculate_switch("add"));
subtract_button.addEventListener("click", () => calculate_switch("subtract"));
divide_button.addEventListener("click", () => calculate_switch("divide"));
multiply_button.addEventListener("click", () => calculate_switch("multiply"));
const product_price = document.getElementById("product-price");
const tax_total = document.querySelector(".tax.output");
const tax_location = document.getElementById("tax-location");
let price = null;
function resetProductPrice() {
    price = null;
    product_price.value = "";
}
function calculateAmericaTax() {
    if (price) {
        let tax = calculator.calculateMultiply(price, 0.28);
        price = calculator.calculateAdd(price, tax);
        tax_total.innerHTML = price.toString();
        resetProductPrice();
    }
}
function calculateEuropeTax() {
    if (price) {
        let tax = calculator.calculateMultiply(price, 0.2);
        price = calculator.calculateAdd(price, tax);
        tax_total.innerHTML = price.toString();
        resetProductPrice();
    }
}
function calculateTaxSwitch(type) {
    switch (type) {
        case "america": {
            calculateAmericaTax();
            break;
        }
        case "europe": {
            calculateEuropeTax();
            break;
        }
    }
}
function calculateTax() {
    if (product_price.value.length > 0) {
        price = Number(product_price.value);
        calculateTaxSwitch(tax_location.value);
    }
}
