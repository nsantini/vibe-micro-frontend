import React, { useEffect, useState } from 'react';
import { notesStorage, Note } from './notesStorage';

interface NotesListProps {
  onEditNote?: (note: Note) => void;
  onDelete?: () => void;
}

/**
 * NotesList Component
 * 
 * Displays a list of markdown notes, allows selection for editing,
 * and implements delete note functionality with confirmation.
 */
const NotesList: React.FC<NotesListProps> = ({ onEditNote, onDelete }) => {
 const [notes, setNotes] = useState<Note[]>([]);
 const [deletingId, setDeletingId] = useState<string | null>(null);
 const [error, setError] = useState<string | null>(null);
 const [sortBy, setSortBy] = useState<"title" | "createdAt" | "updatedAt">("createdAt");
 const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  async function loadNotes() {
    try {
      const loaded = await notesStorage.getNotes();
      setNotes(loaded);
    } catch (err: any) {
      setError(
        err?.message
          ? `Failed to load notes: ${err.message}`
          : "Failed to load notes. Please try again."
      );
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  function getSortedNotes() {
    const sorted = [...notes];
    sorted.sort((a, b) => {
      let aValue: string = "";
      let bValue: string = "";
      if (sortBy === "title") {
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
      } else if (sortBy === "createdAt") {
        aValue = a.createdAt;
        bValue = b.createdAt;
      } else if (sortBy === "updatedAt") {
        aValue = a.updatedAt;
        bValue = b.updatedAt;
      }
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }

  function handleSortChange(newSortBy: "title" | "createdAt" | "updatedAt") {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder(newSortBy === "title" ? "asc" : "desc");
    }
  }

  async function handleDelete(noteId: string) {
    setError(null);
    try {
      await notesStorage.deleteNote(noteId);
      setDeletingId(null);
      await loadNotes();
      if (onDelete) onDelete();
    } catch (err: any) {
      setError(
        err?.message
          ? `Failed to delete note: ${err.message}`
          : "Failed to delete note. Please try again."
      );
    }
  }

  return (
    <div>
      <h2>Notes</h2>
      {error && (
        <div style={{ color: "red", marginBottom: 8 }}>
          {error}
        </div>
      )}
      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontWeight: 500, marginRight: 8 }}>Sort by:</span>
            <button
              style={{
                marginRight: 4,
                padding: "0.25rem 0.75rem",
                borderRadius: 4,
                border: sortBy === "title" ? "2px solid #222" : "1px solid #bdbdbd",
                background: "#fff",
                color: "#222",
                cursor: "pointer",
                fontWeight: sortBy === "title" ? 600 : 400
              }}
              onClick={() => handleSortChange("title")}
            >
              Title {sortBy === "title" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </button>
            <button
              style={{
                marginRight: 4,
                padding: "0.25rem 0.75rem",
                borderRadius: 4,
                border: sortBy === "createdAt" ? "2px solid #222" : "1px solid #bdbdbd",
                background: "#fff",
                color: "#222",
                cursor: "pointer",
                fontWeight: sortBy === "createdAt" ? 600 : 400
              }}
              onClick={() => handleSortChange("createdAt")}
            >
              Created {sortBy === "createdAt" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </button>
            <button
              style={{
                marginRight: 4,
                padding: "0.25rem 0.75rem",
                borderRadius: 4,
                border: sortBy === "updatedAt" ? "2px solid #222" : "1px solid #bdbdbd",
                background: "#fff",
                color: "#222",
                cursor: "pointer",
                fontWeight: sortBy === "updatedAt" ? 600 : 400
              }}
              onClick={() => handleSortChange("updatedAt")}
            >
              Updated {sortBy === "updatedAt" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </button>
          </div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {getSortedNotes().map(note => (
              <li key={note.id} style={{ marginBottom: 16, borderBottom: "1px solid #eee", paddingBottom: 8 }}>
                <div>
                  <strong>{note.title}</strong>
                  <div style={{ fontSize: "0.85em", color: "#666" }}>
                    <span>
                      <span style={{ fontWeight: 500 }}>Created:</span> {new Date(note.createdAt).toLocaleString()}
                    </span>
                    <span style={{ marginLeft: 12 }}>
                      <span style={{ fontWeight: 500 }}>Last Modified:</span> {new Date(note.updatedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div style={{ marginTop: 4 }}>
                  {/* TODO: Add edit button and callback */}
                 <button
                   style={{
                     marginRight: 8,
                     padding: "0.25rem 0.75rem",
                     borderRadius: 4,
                     border: "1px solid #1976d2",
                     background: "#e3f2fd",
                     color: "#1976d2",
                     cursor: "pointer"
                   }}
                   disabled={deletingId === note.id}
                   onClick={() => onEditNote && onEditNote(note)}
                 >
                   Edit
                 </button>
                  <button
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: 4,
                      border: "1px solid #e57373",
                      background: deletingId === note.id ? "#ffcdd2" : "#fff",
                      color: "#d32f2f",
                      cursor: deletingId === note.id ? "not-allowed" : "pointer"
                    }}
                    disabled={deletingId === note.id}
                    onClick={() => setDeletingId(note.id)}
                  >
                    Delete
                  </button>
                  {deletingId === note.id && (
                    <span style={{ marginLeft: 8 }}>
                      Confirm delete?
                      <button
                        style={{
                          marginLeft: 8,
                          padding: "0.25rem 0.75rem",
                          borderRadius: 4,
                          border: "1px solid #d32f2f",
                          background: "#d32f2f",
                          color: "#fff",
                          cursor: "pointer"
                        }}
                        onClick={() => handleDelete(note.id)}
                      >
                        Yes
                      </button>
                      <button
                        style={{
                          marginLeft: 4,
                          padding: "0.25rem 0.75rem",
                          borderRadius: 4,
                          border: "1px solid #bdbdbd",
                          background: "#fff",
                          color: "#222",
                          cursor: "pointer"
                        }}
                        onClick={() => setDeletingId(null)}
                      >
                        No
                      </button>
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default NotesList;