// Chain of Responsibility Pattern — Entry point / client
// Wires all handlers into a chain and connects form submission to the head of that chain.

import ValidationInput from "./interfaces/ValidationInput";
import RequiredFieldHandler from "./models/RequiredFieldHandler";
import EmailFormatHandler from "./models/EmailFormatHandler";
import PasswordFormatHandler from "./models/PasswordFormatHandler";
import UsernameFormatHandler from "./models/UsernameFormatHandler";

// Instantiate each handler (one per validation rule)
const usernameRequired = new RequiredFieldHandler("username");
const usernameFormat = new UsernameFormatHandler();
const emailRequired = new RequiredFieldHandler("email");
const emailFormat = new EmailFormatHandler();
const passwordRequired = new RequiredFieldHandler("password");
const passwordFormat = new PasswordFormatHandler();

// Link handlers into a linear chain: username → email → password
usernameRequired.setNextHandler(usernameFormat);
usernameFormat.setNextHandler(emailRequired);
emailRequired.setNextHandler(emailFormat);
emailFormat.setNextHandler(passwordRequired);
passwordRequired.setNextHandler(passwordFormat);

// The chain is always entered at the first handler
const usernameValidationChain = usernameRequired;

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

  // Kick off the chain from the head handler; result is true only if every handler passes
  const isFormValid = usernameValidationChain.handleValidation(inputValues);
  const resultEl = document.getElementById("validation-result")!;

  if (isFormValid) {
    resultEl.textContent = "All fields valid — form submitted successfully";
    resultEl.className = "validation-result success";
  } else {
    resultEl.textContent = "Validation failed — check your inputs and try again";
    resultEl.className = "validation-result error";
  }
});
