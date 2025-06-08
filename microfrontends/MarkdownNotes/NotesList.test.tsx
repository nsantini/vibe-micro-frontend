import React from "react";
import { render, screen } from "@testing-library/react";
import NotesList from "./NotesList";
import { Note } from "./notesStorage";

// Mock notes for testing
const mockNotes: Note[] = [
  {
    id: "1",
    title: "Test Note 1",
    content: "Content 1",
    createdAt: "2024-01-01T10:00:00.000Z",
    updatedAt: "2024-01-01T10:00:00.000Z",
  },
  {
    id: "2",
    title: "Test Note 2",
    content: "Content 2",
    createdAt: "2024-01-02T12:00:00.000Z",
    updatedAt: "2024-01-03T14:00:00.000Z",
  },
];

jest.mock("./notesStorage", () => ({
  ...jest.requireActual("./notesStorage"),
  notesStorage: {
    getNotes: jest.fn().mockResolvedValue([
      {
        id: "1",
        title: "Test Note 1",
        content: "Content 1",
        createdAt: "2024-01-01T10:00:00.000Z",
        updatedAt: "2024-01-01T10:00:00.000Z",
      },
      {
        id: "2",
        title: "Test Note 2",
        content: "Content 2",
        createdAt: "2024-01-02T12:00:00.000Z",
        updatedAt: "2024-01-03T14:00:00.000Z",
      },
    ]),
    deleteNote: jest.fn(),
  },
}));

describe("NotesList", () => {
  it("renders without crashing and displays notes", async () => {
    render(<NotesList />);
    expect(await screen.findByText("Test Note 1")).toBeInTheDocument();
    expect(await screen.findByText("Test Note 2")).toBeInTheDocument();
  });

  it("shows 'No notes found.' if notes array is empty", async () => {
    // Override mock to return empty array
    const { notesStorage } = require("./notesStorage");
    notesStorage.getNotes.mockResolvedValueOnce([]);
    render(<NotesList />);
    expect(await screen.findByText("No notes found.")).toBeInTheDocument();
  });

  it("renders sort buttons", async () => {
    render(<NotesList />);
    expect(await screen.findByText("Title")).toBeInTheDocument();
    expect(await screen.findByText("Created")).toBeInTheDocument();
    expect(await screen.findByText("Updated")).toBeInTheDocument();
  });

  // Additional tests for delete, edit, and error handling can be added here
});