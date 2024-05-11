import ValidationInput from "./models/ValidationInput";
import ValidationHandler from "./models/ValidationHandler";
import BaseHandler from "./models/BaseHandler";
import RequiredFieldHandler from "./models/RequiredFieldHandler";
import EmailFormatHandler from "./models/EmailFormatHandler";
import PasswordFormatHandler from "./models/PasswordFormatHandler";
import UsernameFormatHandler from "./models/UsernameFormatHandler";

const usernameValidationChain = new RequiredFieldHandler("username");
usernameValidationChain.setNextHandler(new UsernameFormatHandler());

const emailValidationChain = new RequiredFieldHandler("email");
emailValidationChain.setNextHandler(new EmailFormatHandler());

const passwordValidationChain = new RequiredFieldHandler("password");
passwordValidationChain.setNextHandler(new PasswordFormatHandler());

usernameValidationChain.setNextHandler(emailValidationChain);
emailValidationChain.setNextHandler(passwordValidationChain);

const validationForm = document.getElementById("validationForm")!;

validationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const usernameInput = document.getElementById("username") as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;

  const inputValues: ValidationInput = {
    username: usernameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  const isFormValid = usernameValidationChain.handleValidation(inputValues);

  if (isFormValid) {
    // Submit the form or perform further actions
    console.log("Form submitted successfully");
  } else {
    console.log("Form validation failed");
  }
});
