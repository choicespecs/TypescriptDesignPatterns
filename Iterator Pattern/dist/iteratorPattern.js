"use strict";
class LRUNode {
    constructor(key = "#", value = 0) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}
class LRULinkedList {
    constructor() {
        this.head = new LRUNode();
        this.tail = new LRUNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    remove(node) {
        const p = node.prev;
        const n = node.next;
        p.next = n;
        n.prev = p;
    }
    add(node) {
        const p = this.head.next;
        this.head.next = node;
        node.next = p;
        node.prev = this.head;
        p.prev = node;
    }
    getTail() {
        return this.tail;
    }
    getHead() {
        return this.head;
    }
}
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.linkedList = new LRULinkedList();
    }
    clear() {
        this.cache = new Map();
        this.linkedList = new LRULinkedList();
    }
    getList() {
        return this.linkedList;
    }
    get(key) {
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            if (node != null) {
                this.linkedList.remove(node);
                this.linkedList.add(node);
                return node.value;
            }
            return -1;
        }
        return -1;
    }
    put(key, value) {
        if ((key === null) || (value === null)) {
            return;
        }
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            if (node != null) {
                this.linkedList.remove(node);
            }
        }
        const node = new LRUNode(key, value);
        this.linkedList.add(node);
        this.cache.set(key, node);
        if (this.cache.size > this.capacity) {
            const tail = this.linkedList.getTail();
            const lru = tail === null || tail === void 0 ? void 0 : tail.prev;
            if (lru != null) {
                this.linkedList.remove(lru);
                this.cache.delete(lru.key);
            }
        }
    }
}
class LRUconcreteIterator {
    constructor(lruCache) {
        this.lruCache = lruCache;
        const list = this.lruCache.getList();
        const head = list.getHead();
        this.current = head.next;
    }
    reset() {
        const list = this.lruCache.getList();
        const head = list.getHead();
        this.current = head.next;
    }
    head() {
        const list = this.lruCache.getList();
        const head = list.getHead();
        return head;
    }
    getCurrent() {
        return this.current;
    }
    lru() {
        const list = this.lruCache.getList();
        const tail = list.getTail();
        return tail.prev;
    }
    mru() {
        const list = this.lruCache.getList();
        const head = list.getHead();
        return head.next;
    }
    next() {
        this.current = this.current.next;
        return this.current;
    }
    hasNext() {
        if (this.current.next != null) {
            return true;
        }
        return false;
    }
}
const displayLinkedList = document.querySelector(".linked-list");
const linkedListScreen = document.querySelector(".visual-linked-list");
const linkedListScreenTitle = document.querySelector(".info-screen");
const linkedListButtons = document.querySelector(".buttons-location");
const MRUTitle = document.querySelector(".current-mru");
const LRUTitle = document.querySelector(".current-lru");
const getLRUTitle = document.querySelector(".current-get-lru");
let cache;
let iterator;
const lruCapacityForm = document.querySelector(".lru-capacity");
const lruAddForm = document.querySelector(".lru-add-form");
const lruGetForm = document.querySelector(".lru-get-form");
const lruKey = document.querySelector(".lru-key");
const lruValue = document.querySelector(".lru-value");
const lruGetKey = document.querySelector(".lru-get-key");
lruCapacityForm === null || lruCapacityForm === void 0 ? void 0 : lruCapacityForm.addEventListener('submit', (e) => {
    e.preventDefault();
});
lruAddForm === null || lruAddForm === void 0 ? void 0 : lruAddForm.addEventListener('submit', (e) => {
    e.preventDefault();
});
lruGetForm === null || lruGetForm === void 0 ? void 0 : lruGetForm.addEventListener('submit', (e) => {
    e.preventDefault();
});
function myFunction() {
    const elements = lruCapacityForm.elements;
    const c = parseInt(elements[0].value);
    cache = new LRUCache(c);
    iterator = new LRUconcreteIterator(cache);
    if (c > 6) {
        displayLinkedList.style.width = `${100 * c}px`;
    }
    lruCapacityForm.style.display = "none";
    linkedListScreen.style.display = "block";
    linkedListScreenTitle.innerHTML = `LRU Cache Size: ${c}`;
    linkedListButtons.style.display = "flex";
    lruAddForm.style.display = "block";
    lruGetForm.style.display = "block";
}
function addLRU() {
    const elements = lruAddForm.elements;
    const key = elements[0].value;
    const value = parseInt(elements[1].value);
    if (cache !== null) {
        cache.put(key, value);
    }
    console.log(cache);
    lruKey.value = "";
    lruValue.value = "";
    const lru = iterator.lru();
    LRUTitle.innerHTML = `Current LRU: ${lru.key}:${lru.value}`;
    const mru = iterator.mru();
    MRUTitle.innerHTML = `Current MRU: ${mru.key}:${mru.value}`;
}
function printLRUCache() {
    displayLinkedList.innerHTML = "";
    iterator.reset();
    let node = iterator.getCurrent();
    while (iterator.hasNext()) {
        const n = document.createElement("div");
        n.classList.add("box");
        n.innerHTML = `${node.key}:${node.value}`;
        displayLinkedList.appendChild(n);
        node = iterator.next();
    }
}
function getLRU() {
    const elements = lruGetForm.elements;
    const key = elements[0].value;
    console.log(key);
    const value = cache.get(key);
    getLRUTitle.innerHTML = `Get ${key}:${value}`;
    const lru = iterator.lru();
    LRUTitle.innerHTML = `Current LRU: ${lru.key}:${lru.value}`;
    const mru = iterator.mru();
    MRUTitle.innerHTML = `Current MRU: ${mru.key}:${mru.value}`;
    lruGetKey.value = "";
}
const printButton = document.querySelector(".print");
const lruPrintButton = document.querySelector(".lru");
const mruPrintButton = document.querySelector(".mru");
printButton.addEventListener("click", () => printLRUCache());
