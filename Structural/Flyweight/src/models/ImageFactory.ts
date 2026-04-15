// Flyweight Pattern — Flyweight Factory
// Maintains a cache of HTMLImageElement instances keyed by URL.
// When multiple products share the same image URL, they receive the exact same
// HTMLImageElement from the cache instead of creating duplicate DOM objects.

/**
 * Flyweight Factory — creates and caches HTMLImageElement instances.
 * `getImage(src)` checks the cache first; only creates a new element on cache miss.
 * The intrinsic state (URL + loaded image data) is shared; callers supply the extrinsic state.
 */
export class ImageFactory {
  // Intrinsic state store: URL → shared HTMLImageElement
  private imageCache: Map<string, HTMLImageElement> = new Map();

  getImage(src: string): HTMLImageElement {
    if (!this.imageCache.has(src)) {
      // Cache miss — create a new element and store it for future requests
      const img = new Image();
      img.src = src;
      this.imageCache.set(src, img);
    }
    // Cache hit — return the existing shared instance
    return this.imageCache.get(src)!;
  }
}
