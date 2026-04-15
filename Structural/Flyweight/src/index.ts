// Flyweight Pattern — Entry point / client
// Renders a product catalog where images are obtained through ImageFactory.
// If two products share the same imageSrc URL, they receive the same cached
// HTMLImageElement instead of two separate objects — that is the flyweight saving.

import { Product } from "./Interfaces/Product";
import { ImageFactory } from "./models/ImageFactory";

// Mock product data (simulating data fetched from server)
// Products 1 and 2 could share an imageSrc to demonstrate cache reuse.
const products: Product[] = [
  {
    id: 1,
    name: "Product 1",
    price: 19.99,
    imageSrc: "../images/product1.jpeg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 29.99,
    imageSrc: "../images/product2.jpeg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 39.99,
    imageSrc: "../images/product3.jpeg",
  },
];

/**
 * Renders a single product card.
 * Uses ImageFactory to retrieve (or create) the shared image element for this URL.
 * Note: a production implementation would share one ImageFactory instance across all
 * renderProduct calls so the cache is actually reused; each call here creates its own
 * factory for demonstration clarity.
 */
function renderProduct(product: Product, parentElement: HTMLElement) {
  const productElement = document.createElement("div");
  productElement.classList.add("product");

  const nameElement = document.createElement("h3");
  nameElement.textContent = product.name;
  productElement.appendChild(nameElement);

  const priceElement = document.createElement("p");
  priceElement.textContent = `Price: $${product.price.toFixed(2)}`;
  productElement.appendChild(priceElement);

  const imageElement = document.createElement("img");
  const imageFactory = new ImageFactory(); // Flyweight factory — returns cached image if URL seen before
  const img = imageFactory.getImage(product.imageSrc); // Shared HTMLImageElement from cache
  imageElement.src = img.src;
  imageElement.alt = product.name;
  productElement.appendChild(imageElement);

  parentElement.appendChild(productElement);
}

/** Clears the list container and re-renders all products. */
function renderCatalog() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = "";

  products.forEach((product) => renderProduct(product, productList));
}

// Initialize catalog on page load
renderCatalog();

// Dynamically adding a new product also goes through renderCatalog — same flyweight path
const addProductButton = document.getElementById("add-product");
if (addProductButton) {
  addProductButton.addEventListener("click", () => {
    const newProduct: Product = {
      id: products.length + 1,
      name: `Product ${products.length + 1}`,
      price: Math.random() * 100,
      imageSrc: "../images/product_placeholder.jpeg", // Placeholder image
    };
    products.push(newProduct);
    renderCatalog();
  });
}
