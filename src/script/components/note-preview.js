class NotePreview extends HTMLElement {
    static get observedAttributes() {
        return ["title", "body"];
    }

    constructor() {
        super();

        this._title = "";
        this._body = "";

        this._style = document.createElement("style");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[`_${name}`] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    updateStyle() {
        this._style.textContent = `
      :host {
        display: block;
      }

      .note-card.preview {
        border: 2px dashed var(--primary-color);
        background: linear-gradient(to bottom right, #f5f3ff, #ede9fe);
      }
    `;
    }

    render() {
        this.updateStyle();

        const title = this._title || "Preview Title";
        const body = this._body || "Preview content will appear here...";

        this.innerHTML = `
      ${this._style.outerHTML}
      <article class="note-card preview">
        <div class="note-card__content">
          <h3 class="note-card__title">${title}</h3>
          <p class="note-card__body">${body}</p>
          <div class="note-card__footer">
            <time>Just now</time>
          </div>
        </div>
      </article>
    `;
    }
}

customElements.define("note-preview", NotePreview);
