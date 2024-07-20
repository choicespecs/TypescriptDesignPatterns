import { Product } from "./models/Product";
import { Store } from "./models/Store";

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

function getValue(input: HTMLInputElement) {
  if (input.value.length > 0) {
    return Number(input.value);
  }
  return 0;
}

const musicStore: Store = new Store([]);
const bookStore: Store = new Store([]);
const musicStoreProduct: Product[] = [];
const bookStoreProduct: Product[] = [];

function addMusicProduct() {
  const speakerPrice = getValue(speakersPriceInput);
  const speakerQuantity = getValue(speakersQuantityInput);
  const turntablesPrice = getValue(turntablesPriceInput);
  const turntablesQuantity = getValue(turntablesQuantityInput);

  const speaker = new Product(speakerPrice * speakerQuantity);
  const turntable = new Product(turntablesPrice * turntablesQuantity);

  const speakerCalcPrice = document.querySelector(".speakers-calc-price");
  const turntableCalcPrice = document.querySelector(".turntables-calc-price");

  if (speaker.getPrice() > 0) {
    musicStoreProduct.push(speaker);
    musicStore.addProduct(speaker);
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
function calculateMusicStore() {
  const musicStoreTotal = document.querySelector(".music-store-total");
  musicStoreTotal!.innerHTML = `${musicStore.getPrice()}`;
  const currentMusicTrends = document.querySelector(".current-music-trends");
  musicStoreProduct.forEach((product) => {
    let li = document.createElement("li");
    li.appendChild(
      document.createTextNode(
        `${musicStoreIndex}) Music Product: ${product.getPrice()}`
      )
    );
    currentMusicTrends?.appendChild(li);
    musicStoreIndex += 1;
  });
  musicStoreProduct.length = 0;
}

let bookStoreIndex = 1;
function calculateBookStore() {
  const bookStoreTotal = document.querySelector(".book-store-total");
  bookStoreTotal!.innerHTML = `${bookStore.getPrice()}`;
  const currentBookTrends = document.querySelector(".current-book-trends");
  bookStoreProduct.forEach((product) => {
    let li = document.createElement("li");
    li.appendChild(
      document.createTextNode(
        `${bookStoreIndex}) Book Product: ${product.getPrice()}`
      )
    );
    currentBookTrends?.appendChild(li);
    bookStoreIndex += 1;
  });
  bookStoreProduct.length = 0;
}
