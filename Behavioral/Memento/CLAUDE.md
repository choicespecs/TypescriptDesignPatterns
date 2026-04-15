# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Memento Pattern

**Demo:** Rich text editor with undo — user edits content and can revert to previous states.

### Class Roles

| Class | Role |
|---|---|
| `RichTextEditor` | Originator — holds current content string synced to a DOM element; creates/restores mementos |
| `EditorMemento` | Memento — immutable snapshot storing a single `content` string |
| `UndoManager` | Caretaker — maintains `history: EditorMemento[]`; `saveState()` pushes snapshot, `undo()` pops and restores |

### Flow

User types → `UndoManager.saveState()` pushes `EditorMemento` snapshot.

User clicks undo → `UndoManager.undo()` pops last memento → `RichTextEditor.setContent()` restores that content to the DOM.

`RichTextEditor` never exposes internal state directly — history is stored externally in `UndoManager` as opaque `EditorMemento` objects.
