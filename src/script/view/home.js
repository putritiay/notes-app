import NotesApi from "../data/remote/notes-api.js";
import Swal from "sweetalert2";

const home = () => {
  const noteListEl = document.querySelector("note-list");
  const noteFormEl = document.querySelector("note-form");

  let currentView = "active"; // "active" or "archived"

  const showLoading = () => {
    if (document.querySelector("#global-loading")) return;

    const loadingEl = document.createElement("loading-indicator");
    loadingEl.id = "global-loading";
    document.body.appendChild(loadingEl);
  };

  const hideLoading = () => {
    const loadingEl = document.querySelector("#global-loading");
    if (loadingEl) loadingEl.remove();
  };

  const renderAllNotes = (notes) => {
    if (noteListEl) {
      noteListEl.notes = notes;
    } else {
      console.error("Element <note-list> tidak ditemukan di DOM.");
    }
  };

  const updateNotesList = async () => {
    showLoading();
    try {
      const notes =
        currentView === "active"
          ? await NotesApi.getAllNotes()
          : await NotesApi.getArchivedNotes();
      renderAllNotes(notes);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal memuat catatan: " + error.message,
      });
    } finally {
      hideLoading();
    }
  };

  // Initial load
  updateNotesList();

  // Navigation Logic
  const btnActive = document.querySelector("#btn-active");
  const btnArchived = document.querySelector("#btn-archived");

  const updateNavButtons = () => {
    if (currentView === "active") {
      btnActive.classList.add("active");
      btnArchived.classList.remove("active");
    } else {
      btnArchived.classList.add("active");
      btnActive.classList.remove("active");
    }
  };

  btnActive.addEventListener("click", () => {
    currentView = "active";
    updateNavButtons();
    updateNotesList();
    noteListEl.showPreview = true;
    noteListEl.emptyMessage = "No notes yet. Start by creating a new note!";
    noteFormEl.style.display = "block";
  });

  btnArchived.addEventListener("click", () => {
    currentView = "archived";
    updateNavButtons();
    updateNotesList();
    noteListEl.showPreview = false;
    noteListEl.emptyMessage = "No notes archive yet.";
    noteFormEl.style.display = "none";
  });

  // Listen for view changes (legacy or external if any)
  document.addEventListener("view-change", (event) => {
    currentView = event.detail.view;
    updateNavButtons();
    updateNotesList();

    // Update preview visibility and form display
    if (currentView === "archived") {
      noteListEl.emptyMessage = "No notes archive yet.";
      noteListEl.showPreview = false;
      noteFormEl.style.display = "none";
    } else {
      noteListEl.emptyMessage = "No notes yet. Start by creating a new note!";
      noteListEl.showPreview = true;
      noteFormEl.style.display = "block";
    }
  });

  // Function to get the current preview element
  const getNotePreviewEl = () => noteListEl?.querySelector("#note-preview");

  // Handle Real-time Preview
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

  // Handle Note Submission
  noteFormEl.addEventListener("submit-note", async (event) => {
    const { title, content } = event.detail;

    const newNote = {
      title: title,
      body: content,
    };

    showLoading();
    try {
      await NotesApi.createNote(newNote);
      noteFormEl.reset();
      const notePreviewEl = getNotePreviewEl();
      if (notePreviewEl) {
        notePreviewEl.setAttribute("title", "");
        notePreviewEl.setAttribute("body", "");
      }
      await updateNotesList();
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Catatan berhasil ditambahkan!",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal menambahkan catatan: " + error.message,
      });
    } finally {
      hideLoading();
    }
  });

  // Handle Archive Note
  document.addEventListener("archive-note", async (event) => {
    const noteId = event.detail.id;
    showLoading();
    try {
      await NotesApi.archiveNote(noteId);
      await updateNotesList();
      Swal.fire({
        icon: "success",
        title: "Diarsipkan!",
        text: "Catatan berhasil diarsipkan!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal mengarsipkan catatan: " + error.message,
      });
    } finally {
      hideLoading();
    }
  });

  // Handle Unarchive Note
  document.addEventListener("unarchive-note", async (event) => {
    const noteId = event.detail.id;
    showLoading();
    try {
      await NotesApi.unarchiveNote(noteId);
      await updateNotesList();
      Swal.fire({
        icon: "success",
        title: "Diaktifkan!",
        text: "Catatan berhasil diaktifkan kembali!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal mengaktifkan catatan: " + error.message,
      });
    } finally {
      hideLoading();
    }
  });

  // Event Listener for Delete Note
  document.addEventListener("delete-note", async (event) => {
    const noteId = event.detail.id;

    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Catatan ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      showLoading();
      try {
        await NotesApi.deleteNote(noteId);
        await updateNotesList();
        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Catatan telah berhasil dihapus.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal menghapus catatan: " + error.message,
        });
      } finally {
        hideLoading();
      }
    }
  });
};

export default home;
