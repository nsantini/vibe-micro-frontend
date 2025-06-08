minifrontend/apps/main-app/microfrontends/MarkdownNotes/MarkdownEditor.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MarkdownEditor from "./MarkdownEditor";
import { Note } from "./notesStorage";

describe("MarkdownEditor", () => {
  it("renders the editor with title and markdown input", () => {
    render(<MarkdownEditor />);
    expect(screen.getByLabelText(/note title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/markdown note input/i)).toBeInTheDocument();
    expect(screen.getByText(/live preview/i)).toBeInTheDocument();
  });

  it("updates title and markdown input fields", () => {
    render(<MarkdownEditor />);
    const titleInput = screen.getByLabelText(/note title/i);
    const markdownInput = screen.getByLabelText(/markdown note input/i);

    fireEvent.change(titleInput, { target: { value: "Test Note" } });
    fireEvent.change(markdownInput, { target: { value: "# Heading" } });

    expect(titleInput).toHaveValue("Test Note");
    expect(markdownInput).toHaveValue("# Heading");
    expect(screen.getByRole("textbox", { name: /markdown note input/i })).toBeInTheDocument();
  });

  it("renders in edit mode when a note prop is provided", () => {
    const note: Note = {
      id: "1",
      title: "Edit Me",
      content: "Some **markdown** content.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    render(<MarkdownEditor note={note} />);
    expect(screen.getByDisplayValue("Edit Me")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Some **markdown** content.")).toBeInTheDocument();
    expect(screen.getByText(/edit note/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /update note/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  // Additional tests for save, error handling, and callback integration can be added here.
});