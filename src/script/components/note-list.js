class NoteList extends HTMLElement {
  constructor() {
    super();

    this._noteList = [];

    this._style = document.createElement("style");
  }


  set notes(value) {
    this._noteList = value;
    this.render();
  }

  setNoteList(value) {
    this._noteList = value;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
      note-list {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
        margin-top: 2rem;
      }
    
      @media (min-width: 768px) {
        note-list {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    
      @media (min-width: 1024px) {
        note-list {
          grid-template-columns: repeat(4, 1fr);
        }
      }
    `;
  }

  render() {
    this.updateStyle();

    const noteItemElements = this._noteList.map((item) => {
      const note = document.createElement("note-item");
      note.setNote(item);

      return note;
    });

    this.innerHTML = "";

    // Create preview element if it doesn't exist
    const previewEl = document.createElement("note-preview");
    previewEl.id = "note-preview";

    this.append(this._style, previewEl, ...noteItemElements);
  }
}

customElements.define("note-list", NoteList);
