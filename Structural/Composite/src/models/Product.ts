import { ProductComponent } from "../interfaces/ProductComponent";

export class Product implements ProductComponent {
  constructor(private price: number) {}

  getPrice() {
    return this.price;
  }
}
