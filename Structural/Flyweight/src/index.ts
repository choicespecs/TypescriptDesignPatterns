// Flyweight Pattern — Entry point / client
// Renders a product catalog where images are obtained through a single shared ImageFactory.
// Products that share an imageSrc URL receive the exact same cached HTMLImageElement —
// that reuse is the flyweight saving.  Cards show "cached" vs "new" so the sharing is visible.

import { Product } from "./Interfaces/Product";
import { ImageFactory } from "./models/ImageFactory";

// One factory shared across all renders — this is what makes the cache effective
const imageFactory = new ImageFactory();

// Products 4 and 5 intentionally reuse images from products 1 and 2
// to demonstrate that the factory returns the same object instead of allocating a new one.
const products: Product[] = [
  { id: 1, name: "Desk Lamp",    price: 24.99, imageSrc: "images/product1.jpeg" },
  { id: 2, name: "Notebook",     price: 12.99, imageSrc: "images/product2.jpeg" },
  { id: 3, name: "Pen Set",      price: 8.99,  imageSrc: "images/product3.jpeg" },
  { id: 4, name: "Desk Mat",     price: 19.99, imageSrc: "images/product1.jpeg" }, // shares Desk Lamp image
  { id: 5, name: "Sticky Notes", price: 5.99,  imageSrc: "images/product2.jpeg" }, // shares Notebook image
];

// Tracks total renderProduct calls — contrasted with cache size to show savings
let renderCount = 0;

function updateCacheStats(): void {
  const statsEl = document.getElementById("cache-stats");
  if (!statsEl) return;
  const cacheSize = imageFactory.getCacheSize();
  const saved = renderCount - cacheSize;
  statsEl.innerHTML =
    `<span class="stat"><strong>${renderCount}</strong> renders</span>` +
    `<span class="stat-divider">·</span>` +
    `<span class="stat"><strong>${cacheSize}</strong> cached objects</span>` +
    `<span class="stat-divider">·</span>` +
    `<span class="stat saved"><strong>${saved}</strong> allocation${saved !== 1 ? "s" : ""} saved</span>`;
}

function renderProduct(product: Product, parentElement: HTMLElement): void {
  renderCount++;

  // Check cache state BEFORE getImage() so we can show the correct badge
  const wasInCache = imageFactory.has(product.imageSrc);
  const img = imageFactory.getImage(product.imageSrc); // returns shared element on cache hit

  const card = document.createElement("div");
  card.className = "product";

  const imgEl = document.createElement("img");
  imgEl.src = img.src;
  imgEl.alt = product.name;

  const info = document.createElement("div");
  info.className = "product-info";
  info.innerHTML =
    `<div class="product-name">${product.name}</div>` +
    `<div class="product-price">$${product.price.toFixed(2)}</div>` +
    `<div class="product-id">#${String(product.id).padStart(3, "0")}</div>` +
    (wasInCache
      ? `<span class="shared-badge">⚡ cached hit</span>`
      : `<span class="new-badge">✦ new object</span>`);

  card.appendChild(imgEl);
  card.appendChild(info);
  parentElement.appendChild(card);

  updateCacheStats();
}

function renderCatalog(): void {
  const productList = document.getElementById("product-list");
  if (!productList) return;
  productList.innerHTML = "";
  renderCount = 0;
  products.forEach(p => renderProduct(p, productList));
}

renderCatalog();

// New products added via button reuse one of the existing image URLs,
// so every addition is a guaranteed cache hit — the counter shows no growth in cache size.
const addProductButton = document.getElementById("add-product");
if (addProductButton) {
  const sharedSrcs = [
    "images/product1.jpeg",
    "images/product2.jpeg",
    "images/product3.jpeg",
  ];
  addProductButton.addEventListener("click", () => {
    const src = sharedSrcs[(products.length) % sharedSrcs.length];
    const newProduct: Product = {
      id: products.length + 1,
      name: `Product ${products.length + 1}`,
      price: parseFloat((Math.random() * 50 + 5).toFixed(2)),
      imageSrc: src,
    };
    products.push(newProduct);
    renderCatalog();
  });
}
