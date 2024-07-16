import { LRUNode } from "../models/LRUNode";

export interface LRUIterator {
  reset(): void;
  lru(): LRUNode | null;
  mru(): LRUNode | null;
  next(): LRUNode | null;
  getCurrent(): LRUNode | null;
  hasNext(): boolean;
}
