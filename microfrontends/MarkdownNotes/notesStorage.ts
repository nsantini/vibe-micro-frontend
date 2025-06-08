//minifrontend/src/microfrontends/MarkdownNotes/notesStorage.ts
// notesStorage.ts
// Handles persistence for markdown notes (local storage or backend API).
// Placeholder module for future implementation.

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const notesStorage = {
  async getNotes(): Promise<Note[]> {
    // Fetch notes from localStorage
    const notesJson = typeof window !== "undefined" ? localStorage.getItem("markdownNotes") : null;
    if (!notesJson) return [];
    try {
      return JSON.parse(notesJson) as Note[];
    } catch {
      return [];
    }
  },

  async saveNote(note: Note): Promise<void> {
    // Save or update a note in localStorage
    const notesJson = typeof window !== "undefined" ? localStorage.getItem("markdownNotes") : null;
    let notes: Note[] = [];
    if (notesJson) {
      try {
        notes = JSON.parse(notesJson) as Note[];
      } catch {
        notes = [];
      }
    }
    const existingIndex = notes.findIndex(n => n.id === note.id);
    if (existingIndex !== -1) {
      notes[existingIndex] = note;
    } else {
      notes.push(note);
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("markdownNotes", JSON.stringify(notes));
    }
  },

  async deleteNote(noteId: string): Promise<void> {
    // Remove a note by id from localStorage
    const notesJson = typeof window !== "undefined" ? localStorage.getItem("markdownNotes") : null;
    let notes: Note[] = [];
    if (notesJson) {
      try {
        notes = JSON.parse(notesJson) as Note[];
      } catch {
        notes = [];
      }
    }
    notes = notes.filter(n => n.id !== noteId);
    if (typeof window !== "undefined") {
      localStorage.setItem("markdownNotes", JSON.stringify(notes));
    }
  }
};
