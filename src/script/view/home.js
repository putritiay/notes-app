import localNotes from "../data/local/data-local.js";

const home = () => {
  const noteListEl = document.querySelector("note-list");
  const noteFormEl = document.querySelector("note-form");

  let notesData = [...localNotes];

  renderAllNotes(notesData);

  function renderAllNotes(notes) {
    if (noteListEl) {
      noteListEl.notes = notes;
    } else {
      console.error("Element <note-list> tidak ditemukan di DOM.");
    }
  }

  const updateNotesList = async () => {
    // API removed, only using local data
    notesData = [...localNotes];
    renderAllNotes(notesData);
  };

  // Initial load
  updateNotesList();

  // Function to get the current preview element (since it's recreated on each render)
  const getNotePreviewEl = () => noteListEl?.querySelector("#note-preview");

  // Handle Real-time Preview from note-form events
  noteFormEl.addEventListener("title-input", (event) => {
    const notePreviewEl = getNotePreviewEl();
    if (notePreviewEl) {
      notePreviewEl.setAttribute("title", event.detail.value);
    }
  });

  noteFormEl.addEventListener("content-input", (event) => {
    const notePreviewEl = getNotePreviewEl();
    if (notePreviewEl) {
      notePreviewEl.setAttribute("body", event.detail.value);
    }
  });

  // Handle Note Submission (Local only)
  noteFormEl.addEventListener("submit-note", (event) => {
    const { title, content } = event.detail;

    const newNote = {
      id: "notes-" + Math.random().toString(36).substr(2, 9),
      title: title,
      body: content,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    try {
      // Prepend to the local array in memory to show at the beginning of the grid
      notesData.unshift(newNote);
      renderAllNotes(notesData);

      // Reset the form in the component
      noteFormEl.reset();

      // Clear Preview
      const notePreviewEl = getNotePreviewEl();
      if (notePreviewEl) {
        notePreviewEl.setAttribute("title", "");
        notePreviewEl.setAttribute("body", "");
      }

      console.log("Note added successfully to local state");
    } catch (error) {
      alert("Gagal menambahkan catatan: " + error.message);
    }
  });

  // Event Listener for Delete Note (Local only)
  document.addEventListener("delete-note", (event) => {
    const noteId = event.detail.id;

    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus catatan ini?",
    );
    if (!isConfirmed) return;

    try {
      notesData = notesData.filter((note) => note.id !== noteId);
      renderAllNotes(notesData);
      window.alert("Catatan berhasil dihapus!");
    } catch (error) {
      alert("Gagal menghapus catatan: " + error.message);
    }
  });
};

export default home;
