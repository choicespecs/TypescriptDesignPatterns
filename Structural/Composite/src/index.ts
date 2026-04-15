// Composite Pattern — Entry point / client
// Creates two independent composite trees (musicStore, bookStore), each a Store
// holding Product leaves. Client code calls store.getPrice() on both without
// knowing or caring that Store is a composite rather than a leaf.

import { Product } from "./models/Product";
import { Store } from "./models/Store";
import { appendListItem } from "../../../shared/dom-utils";

const musicShopForm = document.querySelector(".music-shop-form");
const bookShopForm = document.querySelector(".book-shop-form");

const speakersPriceInput = <HTMLInputElement>(
  document.getElementById("speakers-price")
);
const speakersQuantityInput = <HTMLInputElement>(
  document.getElementById("speakers-quantity")
);
const turntablesPriceInput = <HTMLInputElement>(
  document.getElementById("turntables-price")
);
const turntablesQuantityInput = <HTMLInputElement>(
  document.getElementById("turntables-quantity")
);

const notebookPriceInput = <HTMLInputElement>(
  document.getElementById("notebook-price")
);
const notebookQuantityInput = <HTMLInputElement>(
  document.getElementById("notebook-quantity")
);
const textbookPriceInput = <HTMLInputElement>(
  document.getElementById("textbook-price")
);
const textbookQuantityInput = <HTMLInputElement>(
  document.getElementById("textbook-quantity")
);

const musicShopInputs: HTMLInputElement[] = [
  speakersPriceInput,
  speakersQuantityInput,
  turntablesPriceInput,
  turntablesQuantityInput,
];

const bookShopInputs: HTMLInputElement[] = [
  notebookPriceInput,
  notebookQuantityInput,
  textbookPriceInput,
  textbookQuantityInput,
];

musicShopForm?.addEventListener("submit", (e) => {
  e.preventDefault();
});

bookShopForm?.addEventListener("submit", (e) => {
  e.preventDefault();
});

/** Reads a numeric input; returns 0 if empty (prevents NaN in price calculations). */
function getValue(input: HTMLInputElement) {
  if (input.value.length > 0) {
    return Number(input.value);
  }
  return 0;
}

// Composite roots — both start empty and grow as products are added
const musicStore: Store = new Store([]);
const bookStore: Store = new Store([]);

// Staging arrays: products added since the last "Calculate" click
const musicStoreProduct: Product[] = [];
const bookStoreProduct: Product[] = [];

/** Reads the music shop form, creates Product leaves, and adds them to the musicStore composite. */
function addMusicProduct() {
  const speakerPrice = getValue(speakersPriceInput);
  const speakerQuantity = getValue(speakersQuantityInput);
  const turntablesPrice = getValue(turntablesPriceInput);
  const turntablesQuantity = getValue(turntablesQuantityInput);

  // Price × quantity collapses quantity into the leaf's single price value
  const speaker = new Product(speakerPrice * speakerQuantity);
  const turntable = new Product(turntablesPrice * turntablesQuantity);

  const speakerCalcPrice = document.querySelector(".speakers-calc-price");
  const turntableCalcPrice = document.querySelector(".turntables-calc-price");

  if (speaker.getPrice() > 0) {
    musicStoreProduct.push(speaker);
    musicStore.addProduct(speaker); // Store eagerly updates its running total
    speakerCalcPrice!.innerHTML = speaker.getPrice().toString();
  }

  if (turntable.getPrice() > 0) {
    musicStoreProduct.push(turntable);
    musicStore.addProduct(turntable);
    turntableCalcPrice!.innerHTML = turntable.getPrice().toString();
  }

  musicShopInputs.forEach((input) => {
    input!.value = "";
  });
}

/** Reads the book shop form, creates Product leaves, and adds them to the bookStore composite. */
function addBookProduct() {
  const notebookPrice = getValue(notebookPriceInput);
  const notebookQuantity = getValue(notebookQuantityInput);
  const textbookPrice = getValue(textbookPriceInput);
  const textbookQuantity = getValue(textbookQuantityInput);

  const notebook = new Product(notebookPrice * notebookQuantity);
  const textbook = new Product(textbookPrice * textbookQuantity);
  const notebookCalcPrice = document.querySelector(".notebook-calc-price");
  const textbookCalcPrice = document.querySelector(".textbook-calc-price");

  if (notebook.getPrice() > 0) {
    bookStore.addProduct(notebook);
    bookStoreProduct.push(notebook);
    notebookCalcPrice!.innerHTML = notebook.getPrice().toString();
  }

  if (textbook.getPrice() > 0) {
    bookStore.addProduct(textbook);
    bookStoreProduct.push(textbook);
    textbookCalcPrice!.innerHTML = textbook.getPrice().toString();
  }

  bookShopInputs.forEach((input) => {
    input!.value = "";
  });
}

let musicStoreIndex = 1;
/**
 * Calls store.getPrice() on the composite root to get the accumulated total,
 * then lists each pending product in the trend log before clearing the staging array.
 */
function calculateMusicStore() {
  const musicStoreTotal = document.querySelector(".music-store-total");
  musicStoreTotal!.innerHTML = `${musicStore.getPrice()}`; // Composite returns sum of all leaves
  const currentMusicTrends = document.querySelector(".current-music-trends");
  musicStoreProduct.forEach((product) => {
    appendListItem(currentMusicTrends, `${musicStoreIndex}) Music Product: ${product.getPrice()}`);
    musicStoreIndex += 1;
  });
  musicStoreProduct.length = 0; // Clear staging array after logging
}

let bookStoreIndex = 1;
/** Same pattern as calculateMusicStore — demonstrates uniform getPrice() call on a composite. */
function calculateBookStore() {
  const bookStoreTotal = document.querySelector(".book-store-total");
  bookStoreTotal!.innerHTML = `${bookStore.getPrice()}`;
  const currentBookTrends = document.querySelector(".current-book-trends");
  bookStoreProduct.forEach((product) => {
    appendListItem(currentBookTrends, `${bookStoreIndex}) Book Product: ${product.getPrice()}`);
    bookStoreIndex += 1;
  });
  bookStoreProduct.length = 0;
}

// Expose on window so HTML onclick attributes can reach these module-scoped functions
(window as any).addMusicProduct = addMusicProduct;
(window as any).addBookProduct = addBookProduct;
(window as any).calculateMusicStore = calculateMusicStore;
(window as any).calculateBookStore = calculateBookStore;
