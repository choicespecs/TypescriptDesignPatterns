// index.ts
import { RichTextEditor } from "./models/RichTextEditor";
import { UndoManager } from "./models/UndoManager";

// Initialize rich text editor and undo manager
const editor = new RichTextEditor();
const undoManager = new UndoManager();

// Save initial state
undoManager.saveState(editor);

// Add event listener for content changes
document.getElementById("editor")!.addEventListener("input", () => {
  editor.updateContent();
  undoManager.saveState(editor);
});

// Add event listener for undo button
const undoButton = document.getElementById("undoButton")!;
undoButton.addEventListener("click", () => {
  undoManager.undo(editor);
});
