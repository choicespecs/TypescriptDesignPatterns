// Iterator Pattern — ConcreteIterator
// Traverses the LRUCache's doubly-linked list from MRU to LRU using the LRUIterator interface.

import { LRUCache } from "./LRUCache";
import { LRUNode } from "./LRUNode";
import { LRUIterator } from "../interfaces/LRUIterator";

/**
 * ConcreteIterator that walks the LRUCache's internal linked list from the
 * most-recently-used end toward the least-recently-used end.
 * The client (index.ts) uses this to display cache contents without knowing
 * about LRULinkedList's internal structure.
 */
export class LRUconcreteIterator implements LRUIterator {
  private current: LRUNode | null;

  constructor(private lruCache: LRUCache) {
    const list = this.lruCache!.getList();
    const head = list!.getHead();
    this.current = head!.next; // Start at the first real node (MRU), skipping the head sentinel
  }

  /** Resets the cursor back to the MRU position for a fresh traversal. */
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

  /** Returns tail.prev — the node furthest from MRU, i.e. the next eviction candidate. */
  public lru() {
    const list = this.lruCache!.getList();
    const tail = list!.getTail();
    return tail!.prev; // The node just before the tail sentinel is the LRU entry
  }

  /** Returns head.next — the most recently accessed or inserted node. */
  public mru() {
    const list = this.lruCache!.getList();
    const head = list!.getHead();
    return head!.next; // The node just after the head sentinel is the MRU entry
  }

  /** Advances the cursor one step toward LRU and returns the new position. */
  public next() {
    this.current = this.current!.next;
    return this.current;
  }

  /** Returns false when current.next is the tail sentinel, indicating end of real entries. */
  public hasNext() {
    if (this.current!.next != null) {
      return true;
    }
    return false;
  }
}
