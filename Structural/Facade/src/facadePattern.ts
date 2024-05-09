const form = document.querySelector('form');
form?.addEventListener('submit', (e) => {
    e.preventDefault();
})

interface Calculator {
    calculate(num1 : number, num2 : number) : number;
}

class Add implements Calculator {
    calculate(num1 : number, num2: number) {
        return num1 + num2;
    }
}

class Subtract implements Calculator {
    calculate(num1 : number, num2: number) {
        return num1 - num2;
    }
}

class Divide implements Calculator {
    calculate(num1 : number, num2 : number) {
        return num1 / num2;
    }
}

class Multiply implements Calculator {
    calculate(num1 : number, num2: number) {
        return num1 * num2;
    }
}

class CalculatorFacade {
    private add = new Add();
    private subtract = new Subtract();
    private divide = new Divide();
    private multiply = new Multiply();

    calculateAdd(num1 : number, num2 : number) {
        return this.add.calculate(num1, num2);
    }

    calculateSubtract(num1 :number, num2 : number) {
        return this.subtract.calculate(num1, num2);
    }

    calculateDivide(num1 : number, num2 : number) {
        return this.divide.calculate(num1, num2);
    }

    calculateMultiply(num1 : number, num2: number) {
        return this.multiply.calculate(num1, num2);
    }
}

const num1 = <HTMLInputElement>document.getElementById("num1");
const num2 = <HTMLInputElement>document.getElementById("num2");
const total = document.querySelector(".calculator.total")!;
const add_button = document.querySelector("#calculator_add")!;
const subtract_button = document.querySelector("#calculator_subtract")!;
const divide_button = document.querySelector("#calculator_divide")!;
const multiply_button = document.querySelector("#calculator_multiply")!;
const calculator = new CalculatorFacade();
let num1_value : number | null = null;
let num2_value : number | null = null;

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

function calculate_switch(type : string) {
    let value : number | undefined = undefined;
    switch(type) {
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

const product_price = <HTMLInputElement>document.getElementById("product-price");
const tax_total = document.querySelector(".tax.output")!;
const tax_location = <HTMLSelectElement>document.getElementById("tax-location")!;

let price : number | null = null;


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

function calculateTaxSwitch(type: string) {
    switch(type) {
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
        price = Number(product_price.value)
        calculateTaxSwitch(tax_location.value);
    }
}




