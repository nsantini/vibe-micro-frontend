import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

/**
 * MarkdownEditor
 * Component for the markdown editor with live preview.
 * Provides a textarea for markdown input.
 */
import { notesStorage, Note } from "./notesStorage";

interface MarkdownEditorProps {
  note?: Note | null;
  onSave?: (note: Note) => void;
  onCancelEdit?: () => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ note, onSave, onCancelEdit }) => {
  const [title, setTitle] = useState(note ? note.title : "");
  const [markdown, setMarkdown] = useState(note ? note.content : "");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(note ? note.id : null);

  // Update form if a new note is passed in for editing
  React.useEffect(() => {
    if (note) {
      setTitle(note.title);
      setMarkdown(note.content);
      setEditingId(note.id);
    } else {
      setTitle("");
      setMarkdown("");
      setEditingId(null);
    }
  }, [note]);

  async function handleSaveNote(e: React.FormEvent) {
    e.preventDefault();
    setSaveSuccess(null);
    setSaveError(null);

    if (!title.trim()) {
      setSaveError("Title is required.");
      return;
    }
    setSaving(true);
    const now = new Date().toISOString();
    const noteToSave: Note = {
      id: editingId || crypto.randomUUID(),
      title: title.trim(),
      content: markdown,
      createdAt: note?.createdAt || now,
      updatedAt: now,
    };
    try {
      // Simulate possible error for demonstration
      await notesStorage.saveNote(noteToSave);
      setSaveSuccess(editingId ? "Note updated!" : "Note created!");
      setTitle("");
      setMarkdown("");
      setEditingId(null);
      if (onSave) onSave(noteToSave);
    } catch (err: any) {
      setSaveError(
        err?.message
          ? `Failed to save note: ${err.message}`
          : "Failed to save note. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  function handleCancelEdit() {
    setTitle("");
    setMarkdown("");
    setEditingId(null);
    setSaveSuccess(null);
    setSaveError(null);
    if (onCancelEdit) onCancelEdit();
  }

  return (
    <div>
      <h2 id="markdown-editor-label">{editingId ? "Edit Note" : "Markdown Editor"}</h2>
      {loadError && (
        <div style={{ color: "red", marginBottom: 8 }}>
          {loadError}
        </div>
      )}
      <form onSubmit={handleSaveNote} autoComplete="off">
        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 300px", minWidth: 0 }}>
            <label htmlFor="note-title" style={{ fontWeight: 500, display: "block", marginBottom: 4 }}>
              Note Title
            </label>
            <input
              id="note-title"
              type="text"
              placeholder="Enter note title"
              style={{
                width: "100%",
                marginBottom: "1rem",
                padding: "0.5rem",
                border: "1.5px solid #bdbdbd",
                borderRadius: 6,
                fontSize: "1rem",
                fontFamily: "inherit",
                background: "#fff",
                color: "#222",
                outline: "none",
                boxSizing: "border-box"
              }}
              value={title}
              onChange={e => setTitle(e.target.value)}
              aria-label="Note title input"
              aria-labelledby="markdown-editor-label"
              autoComplete="off"
              spellCheck={true}
              disabled={saving}
            />
            <label htmlFor="markdown-input" style={{ fontWeight: 500, display: "block", marginBottom: 4 }}>
              Markdown Input
            </label>
            <textarea
              id="markdown-input"
              placeholder="Write your markdown note here..."
              style={{
                width: "100%",
                height: "220px",
                marginBottom: "1rem",
                resize: "vertical",
                fontFamily: "inherit",
                fontSize: "1rem",
                padding: "0.75rem",
                border: "1.5px solid #bdbdbd",
                borderRadius: 6,
                background: "#fff",
                color: "#222",
                outline: "none",
                boxSizing: "border-box"
              }}
              value={markdown}
              onChange={e => setMarkdown(e.target.value)}
              aria-label="Markdown note input"
              aria-labelledby="markdown-editor-label"
              spellCheck={true}
              autoCorrect="on"
              autoCapitalize="sentences"
              disabled={saving}
            />
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <button
                type="submit"
                style={{
                  padding: "0.5rem 1.5rem",
                  fontSize: "1rem",
                  borderRadius: 6,
                  border: "none",
                  background: "#222",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: saving ? "not-allowed" : "pointer",
                  opacity: saving ? 0.7 : 1,
                  marginTop: 8
                }}
                disabled={saving}
              >
                {saving ? "Saving..." : editingId ? "Update Note" : "Create Note"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={{
                    padding: "0.5rem 1.5rem",
                    fontSize: "1rem",
                    borderRadius: 6,
                    border: "1.5px solid #bdbdbd",
                    background: "#fff",
                    color: "#222",
                    fontWeight: 600,
                    cursor: "pointer",
                    marginTop: 8
                  }}
                  disabled={saving}
                >
                  Cancel
                </button>
              )}
            </div>
            {saveSuccess && (
              <div style={{ color: "green", marginTop: 8 }}>{saveSuccess}</div>
            )}
            {saveError && (
              <div style={{ color: "red", marginTop: 8 }}>{saveError}</div>
            )}
          </div>
          <div
            style={{
              flex: "1 1 300px",
              minWidth: 0,
              border: "1.5px solid #bdbdbd",
              borderRadius: 6,
              padding: "1rem",
              minHeight: "220px",
              background: "#fafafa",
              overflowY: "auto",
              fontFamily: "inherit",
              fontSize: "1rem",
              color: "#222",
              boxSizing: "border-box"
            }}
            aria-live="polite"
            aria-label="Markdown preview"
          >
            <ReactMarkdown>{markdown || "*Live preview will appear here.*"}</ReactMarkdown>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MarkdownEditor;