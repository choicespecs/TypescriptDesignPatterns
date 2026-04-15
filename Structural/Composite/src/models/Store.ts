// Composite Pattern — Composite node
// Contains a collection of Products and implements the same ProductComponent interface
// as Leaf, so client code calls getPrice() on either without knowing which it has.

import { Product } from "./Product";
import { ProductComponent } from "../interfaces/ProductComponent";

/**
 * Composite — a store that holds multiple Product leaves.
 * Satisfies ProductComponent, so a Store can itself be nested inside another Store.
 * getPrice() returns the accumulated total of all child products.
 */
export class Store implements ProductComponent {
  private total: number = 0;

  constructor(private products: Product[]) {
    // Seed total from any products provided at construction time
    if (Array.isArray(products)) {
      for (const p of products) {
        this.total += p.getPrice();
      }
    }
  }

  // Composite case: returns the sum of all contained Products
  getPrice() {
    return this.total;
  }

  addProduct(storeProduct: Product) {
    this.products.push(storeProduct);
    this.total += storeProduct.getPrice(); // Eagerly update the running total
  }
}
