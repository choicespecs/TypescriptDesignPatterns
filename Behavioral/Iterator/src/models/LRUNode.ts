// Iterator Pattern — Doubly-linked list node
// Building block of LRULinkedList; also used as sentinel head/tail nodes with default key "#".

/**
 * A node in the doubly-linked list that backs LRUCache.
 * Holds the cache key-value pair and pointers to adjacent nodes so items can
 * be moved to the MRU position in O(1) time.
 */
export class LRUNode {
  public next: LRUNode | null;
  public prev: LRUNode | null;

  constructor(public key: string = "#", public value: number = 0) {
    this.next = null;
    this.prev = null;
  }
}
