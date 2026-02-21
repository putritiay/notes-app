import {
  customValidationHandler,
  updateValidationState,
} from "../custom-validation.js";

class NoteForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this._addEventListeners();
  }

  _addEventListeners() {
    const titleInput = this.querySelector("#title");
    const contentInput = this.querySelector("#content");
    const form = this.querySelector("#notes-form");

    // Title Listeners
    titleInput.addEventListener("change", customValidationHandler);
    titleInput.addEventListener("invalid", customValidationHandler);
    titleInput.addEventListener("blur", (event) => {
      customValidationHandler(event);
      updateValidationState(event.target);
    });
    titleInput.addEventListener("input", (event) => {
      event.target.setCustomValidity("");
      if (event.target.validity.valid) {
        updateValidationState(event.target);
      }
      this.dispatchEvent(
        new CustomEvent("title-input", {
          detail: { value: event.target.value },
          bubbles: true,
        }),
      );
    });

    // Content Listeners
    contentInput.addEventListener("change", customValidationHandler);
    contentInput.addEventListener("invalid", customValidationHandler);
    contentInput.addEventListener("blur", (event) => {
      customValidationHandler(event);
      updateValidationState(event.target);
    });
    contentInput.addEventListener("input", (event) => {
      event.target.setCustomValidity("");
      if (event.target.validity.valid) {
        updateValidationState(event.target);
      }
      this.dispatchEvent(
        new CustomEvent("content-input", {
          detail: { value: event.target.value },
          bubbles: true,
        }),
      );
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const title = titleInput.value.trim();
      const content = contentInput.value.trim();

      this.dispatchEvent(
        new CustomEvent("submit-note", {
          detail: { title, content },
          bubbles: true,
        }),
      );
    });
  }

  reset() {
    const form = this.querySelector("#notes-form");
    const titleInput = this.querySelector("#title");
    const contentInput = this.querySelector("#content");
    const titleValidation = this.querySelector("#titleValidation");
    const contentValidation = this.querySelector("#contentValidation");

    form.reset();
    if (titleValidation) titleValidation.textContent = "";
    if (contentValidation) contentValidation.textContent = "";
    titleInput.classList.remove("valid", "invalid");
    contentInput.classList.remove("valid", "invalid");
  }

  render() {
    this.innerHTML = `
      <style>
        #title {
          text-transform: normal;
        }
      </style>
      <div class="form-card">
        <h2>Create New Note</h2>
        <form id="notes-form" autocomplete="off">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" placeholder="What's on your mind?"
              aria-describedby="titleValidation" required />
            <p id="titleValidation" class="validation-message" aria-live="polite"></p>
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <textarea name="content" id="content" placeholder="Capture your thoughts here..." rows="4"
              aria-describedby="contentValidation" required></textarea>
            <p id="contentValidation" class="validation-message" aria-live="polite"></p>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-submit">✨ Add Note</button>
          </div>
        </form>
      </div>
    `;
  }
}

customElements.define("note-form", NoteForm);
