// Originator class
class RichTextEditor {
  private content: string = "";

  // Apply formatting to selected text
  applyFormatting(tag: string): void {
    const selection = window.getSelection();
    if (selection) {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.classList.add(tag);
      span.appendChild(range.extractContents());
      range.insertNode(span);
      this.content = document.getElementById("editor")!.innerHTML;
    }
  }

  // Get current content of the editor
  getContent(): string {
    return this.content;
  }

  // Set content of the editor
  setContent(content: string): void {
    this.content = content;
    document.getElementById("editor")!.innerHTML = content;
  }
}

// Memento class
class EditorMemento {
  constructor(private content: string) {}

  // Get saved content
  getContent(): string {
    return this.content;
  }
}

// Caretaker class
class UndoManager {
  private history: EditorMemento[] = [];

  // Save state to history
  saveState(editor: RichTextEditor): void {
    this.history.push(new EditorMemento(editor.getContent()));
  }

  // Restore state from history
  undo(editor: RichTextEditor): void {
    if (this.history.length > 0) {
      const memento = this.history.pop();
      if (memento) {
        editor.setContent(memento.getContent());
      }
    }
  }
}

// Initialize rich text editor and undo manager
const editor = new RichTextEditor();
const undoManager = new UndoManager();

// Add event listener for formatting buttons
document.querySelectorAll(".format-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const tag = (event.target as HTMLButtonElement).dataset.tag!;
    editor.applyFormatting(tag);
    undoManager.saveState(editor);
  });
});

// Add event listener for undo button
const undoButton = document.getElementById("undoButton")!;
undoButton.addEventListener("click", () => {
  undoManager.undo(editor);
});
