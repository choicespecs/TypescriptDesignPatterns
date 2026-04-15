// Memento Pattern — Memento
// An immutable snapshot of the editor's content; opaque to the Caretaker (UndoManager).

/**
 * Memento in the Memento pattern.
 * Stores a single snapshot of the editor's content string. The content is private
 * and only readable via getContent(), so the Caretaker cannot inspect or modify
 * the saved state — it only holds and returns the memento object.
 */
export class EditorMemento {
  constructor(private content: string) {}

  /** Returns the saved content string so the Originator can restore it. */
  getContent(): string {
    return this.content;
  }
}
