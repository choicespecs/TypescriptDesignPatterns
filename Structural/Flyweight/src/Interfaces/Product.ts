// Flyweight Pattern — Extrinsic state interface
// Defines the per-product data that is unique to each catalog item.
// The intrinsic shared state (the HTMLImageElement) is stored separately
// in ImageFactory and keyed by `imageSrc`.

/**
 * Product data shape — extrinsic state that varies per item.
 * `imageSrc` is the key used by ImageFactory to look up or create the shared flyweight image.
 */
export interface Product {
  id: number;
  name: string;
  price: number;
  imageSrc: string; // Key into the ImageFactory cache — products sharing a URL share one element
}
