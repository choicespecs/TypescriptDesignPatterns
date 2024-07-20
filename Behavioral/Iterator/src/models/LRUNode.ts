export class LRUNode {
  public next: LRUNode | null;
  public prev: LRUNode | null;

  constructor(public key: string = "#", public value: number = 0) {
    this.next = null;
    this.prev = null;
  }
}
