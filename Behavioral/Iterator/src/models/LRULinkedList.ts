import { LRUNode } from "./LRUNode";

export class LRULinkedList {
  private head: LRUNode | null;
  private tail: LRUNode | null;

  constructor() {
    this.head = new LRUNode();
    this.tail = new LRUNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  public remove(node: LRUNode): void {
    const p = node.prev;
    const n = node.next;
    p!.next = n;
    n!.prev = p;
  }

  public add(node: LRUNode): void {
    const p = this.head!.next;
    this.head!.next = node;
    node.next = p;
    node.prev = this.head;
    p!.prev = node;
  }

  public getTail(): LRUNode | null {
    return this.tail;
  }

  public getHead(): LRUNode | null {
    return this.head;
  }
}
