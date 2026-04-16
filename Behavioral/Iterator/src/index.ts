// Iterator Pattern — Entry point / client
// Creates the LRUCache collection and an LRUconcreteIterator, then wires DOM controls.

import { LRUCache } from "./models/LRUCache";
import { LRUIterator } from "./interfaces/LRUIterator";
import { LRUconcreteIterator } from "./models/LRUIterator";

const displayLinkedList = <HTMLElement>document.querySelector(".linked-list");
const linkedListScreen = <HTMLElement>(
  document.querySelector(".visual-linked-list")
);
const linkedListScreenTitle = <HTMLElement>(
  document.querySelector(".info-screen")
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

const resetButton = <HTMLElement>document.querySelector(".reset-cache");

lruCapacityForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const elements = lruCapacityForm.elements!;
  const c = parseInt((elements[0] as HTMLFormElement).value);
  cache = new LRUCache(c);
  iterator = new LRUconcreteIterator(cache); // Bind the iterator to the newly created collection
  displayLinkedList!.style.width = c > 6 ? `${100 * c}px` : "";
  lruCapacityForm.style.display = "none";
  linkedListScreen.style.display = "flex";
  linkedListScreenTitle.innerHTML = `LRU Cache Size: ${c}`;
  lruAddForm.style.display = "flex";
  lruGetForm.style.display = "flex";
  resetButton.style.display = "inline-block";
});

resetButton?.addEventListener("click", () => {
  cache = null;
  iterator = null;
  displayLinkedList!.innerHTML = "";
  displayLinkedList!.style.width = "";
  MRUTitle!.innerHTML = "—";
  LRUTitle!.innerHTML = "—";
  getLRUTitle!.innerHTML = "—";
  linkedListScreenTitle.innerHTML = "";
  linkedListScreen.style.display = "none";
  lruAddForm.style.display = "none";
  lruGetForm.style.display = "none";
  resetButton.style.display = "none";
  lruCapacityForm.reset();
  lruCapacityForm.style.display = "flex";
});

/** Renders every node in the cache using the iterator (MRU → LRU order). */
function renderCache(): void {
  displayLinkedList!.innerHTML = "";
  iterator!.reset(); // Rewind to MRU before each visual render
  let node = iterator!.getCurrent();
  // Use the iterator interface to walk every node without touching LRULinkedList directly
  while (iterator!.hasNext()) {
    const n = document.createElement("div");
    n.classList.add("box");
    n.innerHTML = `${node!.key}:${node!.value}`;
    displayLinkedList!.appendChild(n);
    node = iterator!.next(); // Advance toward LRU
  }
}

lruAddForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const elements = lruAddForm.elements!;
  const key = (elements[0] as HTMLFormElement).value;
  const value = parseInt((elements[1] as HTMLFormElement).value);
  if (cache !== null) {
    cache.put(key, value);
  }
  lruKey.value = "";
  lruValue.value = "";
  const lru = iterator!.lru();
  LRUTitle!.innerHTML = `${lru!.key}:${lru!.value}`;
  const mru = iterator!.mru();
  MRUTitle!.innerHTML = `${mru!.key}:${mru!.value}`;
  renderCache();
});

lruGetForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const elements = lruGetForm.elements!;
  const key = (elements[0] as HTMLFormElement).value;
  const value = cache!.get(key);
  getLRUTitle!.innerHTML = `${key}:${value}`;
  const lru = iterator!.lru();
  LRUTitle!.innerHTML = `${lru!.key}:${lru!.value}`;
  const mru = iterator!.mru();
  MRUTitle!.innerHTML = `${mru!.key}:${mru!.value}`;
  lruGetKey.value = "";
  renderCache();
});
