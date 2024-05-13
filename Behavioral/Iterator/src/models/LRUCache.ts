import { LRUNode } from "./LRUNode";
import { LRULinkedList } from "./LRULinkedList";

export class LRUCache {
  private linkedList: LRULinkedList | null;
  private cache: Map<string, LRUNode> | null;

  constructor(private capacity: number) {
    this.cache = new Map<string, LRUNode>();
    this.linkedList = new LRULinkedList();
  }

  public clear() {
    this.cache = new Map<string, LRUNode>();
    this.linkedList = new LRULinkedList();
  }

  public getList(): LRULinkedList | null {
    return this!.linkedList;
  }

  public get(key: string) {
    if (this.cache!.has(key)) {
      const node = this.cache!.get(key);
      if (node != null) {
        this.linkedList!.remove(node);
        this.linkedList!.add(node);
        return node.value;
      }
      return -1;
    }
    return -1;
  }

  public put(key: string | null, value: number | null) {
    if (key === null || value === null) {
      return;
    }
    if (this.cache!.has(key)) {
      const node = this.cache!.get(key);
      if (node != null) {
        this.linkedList!.remove(node);
      }
    }
    const node = new LRUNode(key, value);
    this.linkedList!.add(node);
    this.cache!.set(key, node);

    if (this.cache!.size > this.capacity) {
      const tail = this.linkedList!.getTail();
      const lru = tail?.prev;
      if (lru != null) {
        this.linkedList!.remove(lru);
        this.cache!.delete(lru.key);
      }
    }
  }
}
