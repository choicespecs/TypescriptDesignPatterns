# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Iterator Pattern

**Demo:** LRU (Least Recently Used) Cache — add/get items and display current MRU/LRU values via a custom iterator.

### Class Roles

| Class/Interface | Role |
|---|---|
| `LRUIterator` (interface) | Contract: `reset()`, `lru()`, `mru()`, `next()`, `getCurrent()`, `hasNext()` |
| `LRUNode` | Doubly-linked node: `key`, `value`, `prev`, `next` |
| `LRULinkedList` | Manages `head`/`tail` sentinels; `add()` inserts at head, `remove()` detaches a node |
| `LRUCache` | Wraps `Map<string, LRUNode>` + `LRULinkedList`; `put()` evicts LRU when at capacity, `get()` moves node to MRU position |
| `LRUconcreteIterator` | Implements `LRUIterator`; traverses from `head.next` (MRU) toward `tail.prev` (LRU) |

### Key Details

- `lru()` returns `tail.prev`; `mru()` returns `head.next`
- Eviction in `put()`: if capacity exceeded, `LRULinkedList.remove(tail.prev)` and `Map.delete()`
- Iterator traversal order is MRU → LRU (most-recently-used first)
