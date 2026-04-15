// Composite Pattern — Leaf node
// Represents a single indivisible item in the inventory tree.
// Has no children; getPrice() returns its own price directly.

import { ProductComponent } from "../interfaces/ProductComponent";

/**
 * Leaf — the atomic element of the Composite tree.
 * Implements ProductComponent so it can be used anywhere a Store is expected.
 */
export class Product implements ProductComponent {
  constructor(private price: number) {}

  // Terminal case: returns own price with no children to recurse into
  getPrice() {
    return this.price;
  }
}
