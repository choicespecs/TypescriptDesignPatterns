// Iterator Pattern — Iterator interface
// Defines the traversal contract for the LRU cache's doubly-linked list.

import { LRUNode } from "../models/LRUNode";

/**
 * Iterator interface for traversing the LRU cache from MRU to LRU order.
 * LRUconcreteIterator implements this, decoupling traversal logic from the
 * LRUCache collection itself.
 */
export interface LRUIterator {
  /** Resets the cursor to the most-recently-used (head) position. */
  reset(): void;
  /** Returns the least-recently-used node (the node just before the tail sentinel). */
  lru(): LRUNode | null;
  /** Returns the most-recently-used node (the node just after the head sentinel). */
  mru(): LRUNode | null;
  /** Advances the cursor one step toward the LRU end and returns the new current node. */
  next(): LRUNode | null;
  /** Returns the node the cursor is currently pointing at without advancing. */
  getCurrent(): LRUNode | null;
  /** Returns true if there is at least one more node before the tail sentinel. */
  hasNext(): boolean;
}
