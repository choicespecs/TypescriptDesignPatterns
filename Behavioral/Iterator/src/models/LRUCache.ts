// Iterator Pattern — Collection (the iterable object)
// The LRU cache that the LRUconcreteIterator traverses.

import { LRUNode } from "./LRUNode";
import { LRULinkedList } from "./LRULinkedList";

/**
 * Collection in the Iterator pattern — the LRU cache.
 * Combines a Map<string, LRUNode> for O(1) lookup with an LRULinkedList for O(1)
 * MRU/LRU ordering. The iterator accesses the list via getList() to traverse entries.
 */
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

  /** Exposes the internal linked list so the iterator can traverse it. */
  public getList(): LRULinkedList | null {
    return this!.linkedList;
  }

  public get(key: string) {
    if (this.cache!.has(key)) {
      const node = this.cache!.get(key);
      if (node != null) {
        // Move the accessed node to the MRU position to maintain recency order
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
        this.linkedList!.remove(node); // Detach existing node before re-inserting updated value
      }
    }
    const node = new LRUNode(key, value);
    this.linkedList!.add(node); // Insert at MRU position
    this.cache!.set(key, node);

    if (this.cache!.size > this.capacity) {
      // Evict the least-recently-used entry (the node just before the tail sentinel)
      const tail = this.linkedList!.getTail();
      const lru = tail?.prev;
      if (lru != null) {
        this.linkedList!.remove(lru);
        this.cache!.delete(lru.key);
      }
    }
  }
}
