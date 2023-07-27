"use strict";
const musicShopForm = document.querySelector(".music-shop-form");
const bookShopForm = document.querySelector(".book-shop-form");
const speakersPriceInput = document.getElementById("speakers-price");
const speakersQuantityInput = document.getElementById("speakers-quantity");
const turntablesPriceInput = document.getElementById("turntables-price");
const turntablesQuantityInput = document.getElementById("turntables-quantity");
const notebookPriceInput = document.getElementById("notebook-price");
const notebookQuantityInput = document.getElementById("notebook-quantity");
const textbookPriceInput = document.getElementById("textbook-price");
const textbookQuantityInput = document.getElementById("textbook-quantity");
const musicShopInputs = [
    speakersPriceInput,
    speakersQuantityInput,
    turntablesPriceInput,
    turntablesQuantityInput
];
const bookShopInputs = [
    notebookPriceInput,
    notebookQuantityInput,
    textbookPriceInput,
    textbookQuantityInput
];
musicShopForm === null || musicShopForm === void 0 ? void 0 : musicShopForm.addEventListener('submit', (e) => {
    e.preventDefault();
});
bookShopForm === null || bookShopForm === void 0 ? void 0 : bookShopForm.addEventListener('submit', (e) => {
    e.preventDefault();
});
function getValue(input) {
    if (input.value.length > 0) {
        return Number(input.value);
    }
    return 0;
}
class Product {
    constructor(price) {
        this.price = price;
    }
    getPrice() {
        return this.price;
    }
}
class Store {
    constructor(products) {
        this.products = products;
        this.total = 0;
        if (Array.isArray(products)) {
            for (const p of products) {
                this.total += p.getPrice();
            }
        }
    }
    getPrice() {
        return this.total;
    }
    addProduct(storeProduct) {
        this.products.push(storeProduct);
        this.total += storeProduct.getPrice();
    }
}
const musicStore = new Store([]);
const bookStore = new Store([]);
const musicStoreProduct = [];
const bookStoreProduct = [];
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
        speakerCalcPrice.innerHTML = speaker.getPrice().toString();
    }
    if (turntable.getPrice() > 0) {
        musicStoreProduct.push(turntable);
        musicStore.addProduct(turntable);
        turntableCalcPrice.innerHTML = turntable.getPrice().toString();
    }
    musicShopInputs.forEach(input => {
        input.value = "";
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
        notebookCalcPrice.innerHTML = notebook.getPrice().toString();
    }
    if (textbook.getPrice() > 0) {
        bookStore.addProduct(textbook);
        bookStoreProduct.push(textbook);
        textbookCalcPrice.innerHTML = textbook.getPrice().toString();
    }
    bookShopInputs.forEach(input => {
        input.value = "";
    });
}
let musicStoreIndex = 1;
function calculateMusicStore() {
    const musicStoreTotal = document.querySelector(".music-store-total");
    musicStoreTotal.innerHTML = `${musicStore.getPrice()}`;
    const currentMusicTrends = document.querySelector(".current-music-trends");
    musicStoreProduct.forEach(product => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(`${musicStoreIndex}) Music Product: ${product.getPrice()}`));
        currentMusicTrends === null || currentMusicTrends === void 0 ? void 0 : currentMusicTrends.appendChild(li);
        musicStoreIndex += 1;
    });
    musicStoreProduct.length = 0;
}
let bookStoreIndex = 1;
function calculateBookStore() {
    const bookStoreTotal = document.querySelector(".book-store-total");
    bookStoreTotal.innerHTML = `${bookStore.getPrice()}`;
    const currentBookTrends = document.querySelector(".current-book-trends");
    bookStoreProduct.forEach(product => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(`${bookStoreIndex}) Book Product: ${product.getPrice()}`));
        currentBookTrends === null || currentBookTrends === void 0 ? void 0 : currentBookTrends.appendChild(li);
        bookStoreIndex += 1;
    });
    bookStoreProduct.length = 0;
}
