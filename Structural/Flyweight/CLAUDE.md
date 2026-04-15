# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Flyweight Pattern

**Demo:** Product catalog — product images are expensive objects; `ImageFactory` caches and shares `HTMLImageElement` instances by URL.

### Class Roles

| Class/Interface | Role |
|---|---|
| `Product` (interface) | Data shape: `id`, `name`, `price`, `imageSrc` |
| `ImageFactory` | Flyweight factory — maintains `Map<string, HTMLImageElement>`; `getImage(src)` returns cached instance or creates and caches a new one |

### Flow

When rendering the catalog, each product calls `ImageFactory.getImage(product.imageSrc)`. If two products share the same `imageSrc`, they receive the exact same `HTMLImageElement` instance from the cache rather than two separate objects.

The extrinsic state (product `id`, `name`, `price`) lives outside the flyweight. The intrinsic shared state (the image element keyed by URL) lives inside `ImageFactory`'s cache. This prevents duplicate image allocations when many catalog items reference the same image.
