# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Composite Pattern

**Demo:** Store inventory pricing — individual products and stores containing multiple products both report a total price through the same interface.

### Class Roles

| Class/Interface | Role |
|---|---|
| `ProductComponent` (interface) | Uniform contract: `getPrice()` |
| `Product` | Leaf — holds a single price; `getPrice()` returns it directly |
| `Store` | Composite — holds `Product[]`; `getPrice()` sums all product prices; `addProduct()` appends and recalculates total |

### Structure

```
Store (composite)
  ├── Product (leaf)   $10
  ├── Product (leaf)   $25
  └── Store (composite)
        ├── Product   $15
        └── Product   $5
```

Both `Product` and `Store` satisfy `ProductComponent`, so client code calls `getPrice()` uniformly on any node. `Store.getPrice()` recursively sums children, enabling arbitrarily nested inventories.
