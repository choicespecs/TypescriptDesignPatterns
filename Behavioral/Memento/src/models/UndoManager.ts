// Memento Pattern — Caretaker
// Holds the stack of EditorMemento snapshots without ever inspecting their contents.

import { RichTextEditor } from "./RichTextEditor";
import { EditorMemento } from "./EditorMemento";

/**
 * Caretaker in the Memento pattern.
 * UndoManager keeps the history stack of EditorMemento objects. It only knows
 * how to push and pop mementos — it never reads the content inside them.
 * The Originator (RichTextEditor) is the only class that creates and interprets mementos.
 */
export class UndoManager {
  /** Stack of snapshots; newer states are pushed onto the end. */
  private history: EditorMemento[] = [];

  /** Creates a new EditorMemento from the editor's current state and pushes it to history. */
  saveState(editor: RichTextEditor): void {
    this.history.push(new EditorMemento(editor.getContent())); // Caretaker stores, not inspects
    console.log("State saved:", editor.getContent());
  }

  /** Pops the most recent memento and tells the Originator to restore it. */
  undo(editor: RichTextEditor): void {
    if (this.history.length > 0) {
      const memento = this.history.pop(); // Remove last snapshot from the stack
      if (memento) {
        editor.setContent(memento.getContent()); // Originator restores its own state
        console.log("State restored:", memento.getContent());
      }
    }
  }
}
