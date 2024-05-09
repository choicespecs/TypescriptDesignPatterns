
class LRUNode {
    public next: LRUNode | null;
    public prev: LRUNode | null;

    constructor(public key: string = "#", public value: number = 0) {
        this.next = null;
        this.prev = null;
    }
}

class LRULinkedList {
    private head: LRUNode | null;
    private tail: LRUNode | null;
    
    constructor() {
        this.head = new LRUNode();
        this.tail = new LRUNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    public remove(node: LRUNode) : void {
        const p = node.prev;
        const n = node.next;
        p!.next = n;
        n!.prev = p;
    }

    public add(node: LRUNode) : void {
       const p = this.head!.next;
       this.head!.next = node;
       node.next = p;
       node.prev = this.head;
       p!.prev = node;
    }

    public getTail(): LRUNode | null {
        return this.tail;
    }

    public getHead(): LRUNode | null {
        return this.head;
    }
}


class LRUCache {
    private linkedList: LRULinkedList | null;
    private cache: Map<string, LRUNode> | null;

    constructor(private capacity: number) {
        this.cache = new Map<string, LRUNode>();
        this.linkedList = new LRULinkedList();
    }

    public clear() {
        this.cache = new Map<string, LRUNode>();
        this.linkedList = new LRULinkedList();
    }

    public getList() : LRULinkedList | null {
        return this!.linkedList;
    }

    public get(key: string) {
        if (this.cache!.has(key)) {
            const node = this.cache!.get(key);
            if (node != null) {
                this.linkedList!.remove(node);
                this.linkedList!.add(node);
                return node.value;
            }
            return -1;
        }
        return -1;
    }

    public put(key: string | null, value: number | null) {
        if ((key === null) || (value === null)) {
            return;
        }
        if (this.cache!.has(key)) {
            const node = this.cache!.get(key);
            if (node != null) {
                this.linkedList!.remove(node);
            }
        }
        const node = new LRUNode(key, value);
        this.linkedList!.add(node);
        this.cache!.set(key, node);

        if (this.cache!.size > this.capacity) {
            const tail = this.linkedList!.getTail();
            const lru = tail?.prev;
            if (lru != null) {
                this.linkedList!.remove(lru);
                this.cache!.delete(lru.key);
            }
        }
    }
}

interface LRUIterator {
    reset(): void;
    lru(): LRUNode | null;
    mru(): LRUNode | null;
    next(): LRUNode | null;
    getCurrent(): LRUNode | null;
    hasNext(): boolean;
}

class LRUconcreteIterator implements LRUIterator {
    private current: LRUNode | null;
    constructor(private lruCache: LRUCache) {
        const list = this.lruCache!.getList();
        const head = list!.getHead();
        this.current = head!.next;
    }

    public reset() {
        const list = this.lruCache!.getList();
        const head = list!.getHead();
        this.current = head!.next;
    }

    public head() {
        const list = this.lruCache!.getList();
        const head = list!.getHead();
        return head;
    }

    public getCurrent() {
        return this.current;
    }

    public lru() {
        const list = this.lruCache!.getList();
        const tail = list!.getTail();
        return tail!.prev;
    }

    public mru() {
        const list = this.lruCache!.getList();
        const head = list!.getHead();
        return head!.next;
    }

    public next() {
        this.current = this.current!.next;
        return this.current;
    }

    public hasNext() {
        if (this.current!.next != null) {
            return true;
        }
        return false;
    }
}

const displayLinkedList = <HTMLElement>document.querySelector(".linked-list");
const linkedListScreen = <HTMLElement>document.querySelector(".visual-linked-list");
const linkedListScreenTitle = <HTMLElement>document.querySelector(".info-screen");
const linkedListButtons = <HTMLElement>document.querySelector(".buttons-location");
const MRUTitle = <HTMLElement>document.querySelector(".current-mru");
const LRUTitle = <HTMLElement>document.querySelector(".current-lru");
const getLRUTitle = <HTMLElement>document.querySelector(".current-get-lru");



let cache : LRUCache | null;
let iterator : LRUIterator | null;

const lruCapacityForm = <HTMLFormElement>document.querySelector(".lru-capacity")!;
const lruAddForm = <HTMLFormElement>document.querySelector(".lru-add-form")!;
const lruGetForm = <HTMLFormElement>document.querySelector(".lru-get-form")!;
const lruKey = <HTMLInputElement>document.querySelector(".lru-key")!;
const lruValue = <HTMLInputElement>document.querySelector(".lru-value")!;
const lruGetKey = <HTMLInputElement>document.querySelector(".lru-get-key")!;

lruCapacityForm?.addEventListener('submit', (e) => {
    e.preventDefault();
})

lruAddForm?.addEventListener('submit', (e) => {
    e.preventDefault();
})

lruGetForm?.addEventListener('submit', (e) => {
    e.preventDefault();
})

function myFunction() {
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
}

function addLRU() {
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
}

function printLRUCache() : void {
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
}

function getLRU() {
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
}


const printButton = document.querySelector(".print");
const lruPrintButton = document.querySelector(".lru");
const mruPrintButton = document.querySelector(".mru");

printButton!.addEventListener("click", () => printLRUCache());




