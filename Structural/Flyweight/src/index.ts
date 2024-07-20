import { Product } from "./Interfaces/Product";
import { ImageFactory } from "./models/ImageFactory";
// Mock product data (simulating data fetched from server)
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

// Render product catalog
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
  const imageFactory = new ImageFactory(); // Create ImageFactory per product (for demonstration)
  const img = imageFactory.getImage(product.imageSrc); // Get image from cache
  imageElement.src = img.src;
  imageElement.alt = product.name;
  productElement.appendChild(imageElement);

  parentElement.appendChild(productElement);
}

function renderCatalog() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = "";

  products.forEach((product) => renderProduct(product, productList));
}

// Initialize catalog
renderCatalog();

// Add product button functionality (optional)
const addProductButton = document.getElementById("add-product");
if (addProductButton) {
  addProductButton.addEventListener("click", () => {
    // Simulate adding a new product (replace with your logic)
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
