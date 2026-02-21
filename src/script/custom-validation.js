// Validation helper functions
const updateValidationState = (inputElement) => {
  const isValid = inputElement.validity.valid;
  const errorMessage = inputElement.validationMessage;
  const connectedValidationId = inputElement.getAttribute("aria-describedby");
  const connectedValidationEl = connectedValidationId
    ? document.getElementById(connectedValidationId)
    : null;

  if (connectedValidationEl && errorMessage && !isValid) {
    connectedValidationEl.innerText = errorMessage;
    inputElement.classList.add("invalid");
  } else {
    if (connectedValidationEl) {
      connectedValidationEl.innerText = "";
    }
    inputElement.classList.remove("invalid");
  }
};

const customValidationHandler = (event) => {
  event.target.setCustomValidity("");

  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("Wajib diisi.");
    return;
  }
  // You can add more custom checks here (e.g. minLength)
};

export { updateValidationState, customValidationHandler };
