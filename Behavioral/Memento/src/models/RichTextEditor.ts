// RichTextEditor.ts
export class RichTextEditor {
  private content: string = "";

  constructor() {
    // Initialize content
    this.content = document.getElementById("editor")!.innerHTML;
    console.log("Initial content:", this.content);
  }

  // Get current content of the editor
  getContent(): string {
    return this.content;
  }

  // Set content of the editor
  setContent(content: string): void {
    this.content = content;
    document.getElementById("editor")!.innerHTML = content;
    console.log("Content set to:", this.content);
  }

  // Update content from editor DOM
  public updateContent(): void {
    this.content = document.getElementById("editor")!.innerHTML;
  }
}
