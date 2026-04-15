// Iterator Pattern — internal doubly-linked list used by LRUCache
// Maintains order from MRU (just after head sentinel) to LRU (just before tail sentinel).

import { LRUNode } from "./LRUNode";

/**
 * Doubly-linked list with sentinel head and tail nodes that backs LRUCache.
 * add() inserts at the MRU position (after head); remove() detaches any node in O(1).
 * The iterator traverses this list from head.next (MRU) toward tail.prev (LRU).
 */
export class LRULinkedList {
  private head: LRUNode | null;
  private tail: LRUNode | null;

  constructor() {
    // Sentinel nodes are never real cache entries; they simplify add/remove edge cases
    this.head = new LRUNode();
    this.tail = new LRUNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /** Detaches a node from its current position by relinking its neighbours. */
  public remove(node: LRUNode): void {
    const p = node.prev;
    const n = node.next;
    p!.next = n;
    n!.prev = p;
  }

  /** Inserts a node immediately after the head sentinel, making it the new MRU entry. */
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
