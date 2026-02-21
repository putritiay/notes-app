class NoteItem extends HTMLElement {
  constructor() {
    super();

    this._note = {
      id: 0,
      title: "NEED_TITLE",
      body: "NEED_BODY",
      createdAt: "NEED_CREATED_AT",
    };

    this._style = document.createElement("style");
  }

  setNote(value) {
    this._note["id"] = value.id;
    this._note["title"] = value.title;
    this._note["body"] = value.body;
    this._note["createdAt"] = value.createdAt;

    // Render ulang setelah `note` di-update
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
      note-item {
        display: block;
      }
    `;
  }

  render() {
    this.updateStyle();

    this.setAttribute("data-id", this._note.id);

    this.innerHTML = `
      ${this._style.outerHTML}

      <article class="note-card">
        <div class="note-card__content">
          <h3 class="note-card__title">${this._note.title}</h3>
          <p class="note-card__body">
            ${this._note.body}
          </p>
          <div class="note-card__footer">
            <time datetime="${this._note.createdAt}">
              ${new Date(this._note.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
            </time>
            <div class="note-card__actions">
              <button class="btn-icon btn-delete" title="Delete">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
              <button class="btn-icon btn-archive" title="Archive">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </article>
    `;

    // Add event listener for delete button
    const deleteButton = this.querySelector(".btn-delete");
    if (deleteButton) {
      deleteButton.addEventListener("click", () => {
        // Dispatch custom event with note ID
        this.dispatchEvent(
          new CustomEvent("delete-note", {
            detail: { id: this._note.id },
            bubbles: true,
          })
        );
      });
    }
  }
}

customElements.define("note-item", NoteItem);
