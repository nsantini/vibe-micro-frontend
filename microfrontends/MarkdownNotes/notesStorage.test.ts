/minifrontend/apps/main-app/microfrontends/MarkdownNotes/notesStorage.test.ts
/**
 * Unit tests for notesStorage.ts
 * 
 * These tests cover the core persistence logic for markdown notes,
 * including saving, loading, updating, and deleting notes in localStorage.
 */

import { notesStorage, Note } from "./notesStorage";

// Mock localStorage for testing
function mockLocalStorage() {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  };
}

describe("notesStorage", () => {
  // @ts-ignore
  global.localStorage = mockLocalStorage();

  const sampleNote: Note = {
    id: "test-id",
    title: "Test Note",
    content: "This is a test note.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    // @ts-ignore
    global.localStorage.clear();
  });

  it("should save and load a note", async () => {
    await notesStorage.saveNote(sampleNote);
    const notes = await notesStorage.getNotes();
    expect(notes.length).toBe(1);
    expect(notes[0].id).toBe(sampleNote.id);
    expect(notes[0].title).toBe(sampleNote.title);
  });

  it("should update an existing note", async () => {
    await notesStorage.saveNote(sampleNote);
    const updatedNote = { ...sampleNote, title: "Updated Title" };
    await notesStorage.saveNote(updatedNote);
    const notes = await notesStorage.getNotes();
    expect(notes.length).toBe(1);
    expect(notes[0].title).toBe("Updated Title");
  });

  it("should delete a note by id", async () => {
    await notesStorage.saveNote(sampleNote);
    await notesStorage.deleteNote(sampleNote.id);
    const notes = await notesStorage.getNotes();
    expect(notes.length).toBe(0);
  });

  it("should handle loading when no notes exist", async () => {
    const notes = await notesStorage.getNotes();
    expect(Array.isArray(notes)).toBe(true);
    expect(notes.length).toBe(0);
  });

  it("should not throw if deleting a non-existent note", async () => {
    await expect(notesStorage.deleteNote("non-existent-id")).resolves.not.toThrow();
    const notes = await notesStorage.getNotes();
    expect(notes.length).toBe(0);
  });
});