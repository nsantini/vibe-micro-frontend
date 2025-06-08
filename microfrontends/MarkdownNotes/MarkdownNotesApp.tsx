import React, { useState, useCallback } from "react";
import NotesList from "./NotesList";
import MarkdownEditor from "./MarkdownEditor";
import { Note } from "./notesStorage";

/**
 * MarkdownNotesApp
 * Main entry point for the Markdown Notes microfrontend.
 * Handles layout and integration of editor and notes list components.
 */
const MarkdownNotesApp: React.FC = () => {
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [refreshListKey, setRefreshListKey] = useState(0);

  const handleEditNote = useCallback((note: Note) => {
    setEditingNote(note);
  }, []);

  // Called after save or delete to refresh NotesList
  const handleRefresh = useCallback(() => {
    setEditingNote(null);
    setRefreshListKey(k => k + 1);
  }, []);

  const handleSave = useCallback(() => {
    handleRefresh();
  }, [handleRefresh]);

  const handleCancelEdit = useCallback(() => {
    setEditingNote(null);
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1>Markdown Notes</h1>
      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <NotesList key={refreshListKey} onEditNote={handleEditNote} onDelete={handleRefresh} />
        </div>
        <div style={{ flex: 2 }}>
          <MarkdownEditor note={editingNote} onSave={handleSave} onCancelEdit={handleCancelEdit} />
        </div>
      </div>
    </div>
  );
};

export default MarkdownNotesApp;