// Memento Pattern — Entry point / client
// Wires the Originator (RichTextEditor) and Caretaker (UndoManager) to DOM events.

import { RichTextEditor } from "./models/RichTextEditor";
import { UndoManager } from "./models/UndoManager";

const editor = new RichTextEditor();     // Originator
const undoManager = new UndoManager();   // Caretaker

// Save the empty initial state so undo can revert all the way back to blank
undoManager.saveState(editor);

// Every keystroke creates a new snapshot, enabling fine-grained undo
document.getElementById("editor")!.addEventListener("input", () => {
  editor.updateContent();        // Sync DOM → Originator's internal state
  undoManager.saveState(editor); // Caretaker snapshots the new state
});

const undoButton = document.getElementById("undoButton")!;
undoButton.addEventListener("click", () => {
  undoManager.undo(editor); // Caretaker pops the latest snapshot and restores the Originator
});
