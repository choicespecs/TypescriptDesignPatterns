"use strict";
// Originator class
class RichTextEditor {
    constructor() {
        this.content = "";
    }
    // Apply formatting to selected text
    applyFormatting(tag) {
        const selection = window.getSelection();
        if (selection) {
            const range = selection.getRangeAt(0);
            const span = document.createElement("span");
            span.classList.add(tag);
            span.appendChild(range.extractContents());
            range.insertNode(span);
            this.content = document.getElementById("editor").innerHTML;
        }
    }
    // Get current content of the editor
    getContent() {
        return this.content;
    }
    // Set content of the editor
    setContent(content) {
        this.content = content;
        document.getElementById("editor").innerHTML = content;
    }
}
// Memento class
class EditorMemento {
    constructor(content) {
        this.content = content;
    }
    // Get saved content
    getContent() {
        return this.content;
    }
}
// Caretaker class
class UndoManager {
    constructor() {
        this.history = [];
    }
    // Save state to history
    saveState(editor) {
        this.history.push(new EditorMemento(editor.getContent()));
    }
    // Restore state from history
    undo(editor) {
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
        const tag = event.target.dataset.tag;
        editor.applyFormatting(tag);
        undoManager.saveState(editor);
    });
});
// Add event listener for undo button
const undoButton = document.getElementById("undoButton");
undoButton.addEventListener("click", () => {
    undoManager.undo(editor);
});
