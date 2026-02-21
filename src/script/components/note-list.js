class NoteList extends HTMLElement {
  constructor() {
    super();

    this._noteList = [];
    this._showPreview = true;
    this._emptyMessage = "No notes yet. Start by creating a new note!";

    this._style = document.createElement("style");
  }

  set notes(value) {
    this._noteList = value;
    this.render();
  }

  get showPreview() {
    return this._showPreview;
  }

  set showPreview(value) {
    this._showPreview = value;
    this.render();
  }

  get emptyMessage() {
    return this._emptyMessage;
  }

  set emptyMessage(value) {
    this._emptyMessage = value;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
      note-list {
        display: block;
        margin-top: 1rem;
      }

      .notes-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    
      .empty-state {
        text-align: center;
        padding: 4rem 2rem;
        color: #94a3b8;
        background: #f1f5f9;
        border-radius: 1rem;
        border: 2px dashed #e2e8f0;
        grid-column: 1 / -1;
      }

      .empty-state p {
        font-size: 1.125rem;
        font-weight: 500;
        margin: 0;
      }
    
      @media (min-width: 768px) {
        .notes-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    
      @media (min-width: 1024px) {
        .notes-grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }
    `;
  }

  render() {
    this.updateStyle();

    this.innerHTML = "";
    this.append(this._style);

    const container = document.createElement("div");
    container.className = "notes-grid";

    // Create preview element if enabled
    if (this._showPreview !== false) {
      const previewEl = document.createElement("note-preview");
      previewEl.id = "note-preview";
      container.appendChild(previewEl);
    }

    if (this._noteList.length === 0) {
      const emptyEl = document.createElement("div");
      emptyEl.className = "empty-state";
      emptyEl.innerHTML = `<p>${this._emptyMessage}</p>`;
      container.appendChild(emptyEl);
    } else {
      const noteItemElements = this._noteList.map((item) => {
        const note = document.createElement("note-item");
        note.setNote(item);
        return note;
      });
      container.append(...noteItemElements);
    }

    this.appendChild(container);
  }
}

customElements.define("note-list", NoteList);
