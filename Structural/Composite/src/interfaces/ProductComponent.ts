// Composite Pattern — Component interface
// The uniform contract satisfied by both Leaf (Product) and Composite (Store),
// allowing client code to treat individual items and collections identically.

/** Component interface: both Leaf and Composite implement this. */
export interface ProductComponent {
  getPrice(): number;
}
