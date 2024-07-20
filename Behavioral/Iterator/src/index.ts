import { LRUCache } from "./models/LRUCache";
import { LRUIterator, LRUconcreteIterator } from "./models/LRUIterator";

const displayLinkedList = <HTMLElement>document.querySelector(".linked-list");
const linkedListScreen = <HTMLElement>(
  document.querySelector(".visual-linked-list")
);
const linkedListScreenTitle = <HTMLElement>(
  document.querySelector(".info-screen")
);
const linkedListButtons = <HTMLElement>(
  document.querySelector(".buttons-location")
);
const MRUTitle = <HTMLElement>document.querySelector(".current-mru");
const LRUTitle = <HTMLElement>document.querySelector(".current-lru");
const getLRUTitle = <HTMLElement>document.querySelector(".current-get-lru");

let cache: LRUCache | null;
let iterator: LRUIterator | null;

const lruCapacityForm = <HTMLFormElement>(
  document.querySelector(".lru-capacity")!
);
const lruAddForm = <HTMLFormElement>document.querySelector(".lru-add-form")!;
const lruGetForm = <HTMLFormElement>document.querySelector(".lru-get-form")!;
const lruKey = <HTMLInputElement>document.querySelector(".lru-key")!;
const lruValue = <HTMLInputElement>document.querySelector(".lru-value")!;
const lruGetKey = <HTMLInputElement>document.querySelector(".lru-get-key")!;

lruCapacityForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const elements = lruCapacityForm.elements!;
  const c = parseInt((elements[0] as HTMLFormElement).value);
  cache = new LRUCache(c);
  iterator = new LRUconcreteIterator(cache);
  if (c > 6) {
    displayLinkedList!.style.width = `${100 * c}px`;
  }
  lruCapacityForm.style.display = "none";
  linkedListScreen.style.display = "block";
  linkedListScreenTitle.innerHTML = `LRU Cache Size: ${c}`;
  linkedListButtons.style.display = "flex";
  lruAddForm.style.display = "block";
  lruGetForm.style.display = "block";
});

lruAddForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const elements = lruAddForm.elements!;
  const key = (elements[0] as HTMLFormElement).value;
  const value = parseInt((elements[1] as HTMLFormElement).value);
  if (cache !== null) {
    cache.put(key, value);
  }
  console.log(cache);
  lruKey.value = "";
  lruValue.value = "";
  const lru = iterator!.lru();
  LRUTitle!.innerHTML = `Current LRU: ${lru!.key}:${lru!.value}`;
  const mru = iterator!.mru();
  MRUTitle!.innerHTML = `Current MRU: ${mru!.key}:${mru!.value}`;
});

lruGetForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const elements = lruGetForm.elements!;
  const key = (elements[0] as HTMLFormElement).value;
  console.log(key);
  const value = cache!.get(key);
  getLRUTitle!.innerHTML = `Get ${key}:${value}`;
  const lru = iterator!.lru();
  LRUTitle!.innerHTML = `Current LRU: ${lru!.key}:${lru!.value}`;
  const mru = iterator!.mru();
  MRUTitle!.innerHTML = `Current MRU: ${mru!.key}:${mru!.value}`;
  lruGetKey.value = "";
});

const printButton = document.querySelector(".print");

printButton!.addEventListener("click", () => {
  displayLinkedList!.innerHTML = "";
  iterator!.reset();
  let node = iterator!.getCurrent();
  while (iterator!.hasNext()) {
    const n = document.createElement("div");
    n.classList.add("box");
    n.innerHTML = `${node!.key}:${node!.value}`;
    displayLinkedList!.appendChild(n);
    node = iterator!.next();
  }
});
