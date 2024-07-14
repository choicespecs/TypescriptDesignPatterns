// UndoManager.ts
import { RichTextEditor } from "./RichTextEditor";
import { EditorMemento } from "./EditorMemento";

export class UndoManager {
  private history: EditorMemento[] = [];

  // Save state to history
  saveState(editor: RichTextEditor): void {
    this.history.push(new EditorMemento(editor.getContent()));
    console.log("State saved:", editor.getContent());
  }

  // Restore state from history
  undo(editor: RichTextEditor): void {
    if (this.history.length > 0) {
      const memento = this.history.pop();
      if (memento) {
        editor.setContent(memento.getContent());
        console.log("State restored:", memento.getContent());
      }
    }
  }
}
