// EditorMemento.ts
export class EditorMemento {
  constructor(private content: string) {}

  // Get saved content
  getContent(): string {
    return this.content;
  }
}
