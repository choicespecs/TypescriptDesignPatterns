// Memento Pattern — Originator
// Owns the editor's mutable state and produces/restores EditorMemento snapshots.

/**
 * Originator in the Memento pattern.
 * RichTextEditor holds the current content string and keeps it in sync with the DOM.
 * UndoManager (Caretaker) asks the editor for its state via getContent() to create
 * mementos, and restores state by calling setContent() with a saved memento value.
 */
export class RichTextEditor {
  private content: string = "";

  constructor() {
    this.content = document.getElementById("editor")!.innerHTML;
    console.log("Initial content:", this.content);
  }

  /** Provides the current content so the Caretaker can snapshot it into a Memento. */
  getContent(): string {
    return this.content;
  }

  /** Restores content from a Memento and updates the DOM — the Originator's restore step. */
  setContent(content: string): void {
    this.content = content;
    document.getElementById("editor")!.innerHTML = content; // Sync restored state to DOM
    console.log("Content set to:", this.content);
  }

  /** Pulls the latest editor HTML from the DOM into the internal content field. */
  public updateContent(): void {
    this.content = document.getElementById("editor")!.innerHTML;
  }
}
