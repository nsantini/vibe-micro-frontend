import React from "react";
import { render, screen } from "@testing-library/react";
import MarkdownNotesApp from "./MarkdownNotesApp";

describe("MarkdownNotesApp", () => {
  it("renders the main heading", () => {
    render(<MarkdownNotesApp />);
    expect(screen.getByRole("heading", { name: /Markdown Notes/i })).toBeInTheDocument();
  });

  it("renders the NotesList and MarkdownEditor components", () => {
    render(<MarkdownNotesApp />);
    expect(screen.getByRole("heading", { name: /Notes/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Markdown Editor/i })).toBeInTheDocument();
  });

  // Additional integration tests for editing, creating, and deleting notes
  // should be added as the components are further developed and refactored for testability.
});