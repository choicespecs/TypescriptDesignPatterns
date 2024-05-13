import { LRUCache } from "./LRUCache";
import { LRUNode } from "./LRUNode";

export interface LRUIterator {
  reset(): void;
  lru(): LRUNode | null;
  mru(): LRUNode | null;
  next(): LRUNode | null;
  getCurrent(): LRUNode | null;
  hasNext(): boolean;
}

export class LRUconcreteIterator implements LRUIterator {
  private current: LRUNode | null;
  constructor(private lruCache: LRUCache) {
    const list = this.lruCache!.getList();
    const head = list!.getHead();
    this.current = head!.next;
  }

  public reset() {
    const list = this.lruCache!.getList();
    const head = list!.getHead();
    this.current = head!.next;
  }

  public head() {
    const list = this.lruCache!.getList();
    const head = list!.getHead();
    return head;
  }

  public getCurrent() {
    return this.current;
  }

  public lru() {
    const list = this.lruCache!.getList();
    const tail = list!.getTail();
    return tail!.prev;
  }

  public mru() {
    const list = this.lruCache!.getList();
    const head = list!.getHead();
    return head!.next;
  }

  public next() {
    this.current = this.current!.next;
    return this.current;
  }

  public hasNext() {
    if (this.current!.next != null) {
      return true;
    }
    return false;
  }
}
