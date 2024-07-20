import { Product } from "./Product";
import { ProductComponent } from "../interfaces/ProductComponent";

export class Store implements ProductComponent {
  private total: number = 0;
  constructor(private products: Product[]) {
    if (Array.isArray(products)) {
      for (const p of products) {
        this.total += p.getPrice();
      }
    }
  }

  getPrice() {
    return this.total;
  }

  addProduct(storeProduct: Product) {
    this.products.push(storeProduct);
    this.total += storeProduct.getPrice();
  }
}
