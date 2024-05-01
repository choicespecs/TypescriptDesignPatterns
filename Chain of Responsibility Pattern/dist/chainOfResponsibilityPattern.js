"use strict";
class BaseHandler {
    setNextHandler(handler) {
        this.nextHandler = handler;
    }
}
class RequiredFieldHandler extends BaseHandler {
    constructor(field) {
        super();
        this.field = field;
    }
    handleValidation(inputValue) {
        const fieldValue = inputValue[this.field];
        if (fieldValue === undefined || fieldValue.trim() === "") {
            console.log(`${this.field} is required`);
            return false;
        }
        if (this.nextHandler) {
            return this.nextHandler.handleValidation(inputValue);
        }
        return true;
    }
}
// Handler for email format
class EmailFormatHandler extends BaseHandler {
    handleValidation(inputValue) {
        const fieldValue = inputValue.email;
        if (fieldValue === undefined || fieldValue.trim() === "") {
            console.log("Email is required");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputValue.email)) {
            console.log("Invalid email format");
            return false;
        }
        if (this.nextHandler) {
            return this.nextHandler.handleValidation(inputValue);
        }
        return true;
    }
}
// Handler for password format
class PasswordFormatHandler extends BaseHandler {
    handleValidation(inputValue) {
        // Add your password validation logic here
        // For example, check if it contains at least one uppercase letter, one lowercase letter, and one digit
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(inputValue.password)) {
            console.log("Invalid password format");
            return false;
        }
        if (this.nextHandler) {
            return this.nextHandler.handleValidation(inputValue);
        }
        return true;
    }
}
class UsernameFormatHandler extends BaseHandler {
    handleValidation(inputValue) {
        // Add your username validation logic here
        // For example, check if it contains only alphanumeric characters
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if (!usernameRegex.test(inputValue.username)) {
            console.log("Invalid username format");
            return false;
        }
        if (this.nextHandler) {
            return this.nextHandler.handleValidation(inputValue);
        }
        return true;
    }
}
const usernameValidationChain = new RequiredFieldHandler("username");
usernameValidationChain.setNextHandler(new UsernameFormatHandler());
const emailValidationChain = new RequiredFieldHandler("email");
emailValidationChain.setNextHandler(new EmailFormatHandler());
const passwordValidationChain = new RequiredFieldHandler("password");
passwordValidationChain.setNextHandler(new PasswordFormatHandler());
usernameValidationChain.setNextHandler(emailValidationChain);
emailValidationChain.setNextHandler(passwordValidationChain);
const validationForm = document.getElementById("validationForm");
validationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const inputValues = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };
    console.log(inputValues);
    const isFormValid = usernameValidationChain.handleValidation(inputValues);
    if (isFormValid) {
        // Submit the form or perform further actions
        console.log("Form submitted successfully");
    }
    else {
        console.log("Form validation failed");
    }
});
// Additional validation handlers can be added similarly
