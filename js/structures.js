// Small Stack and Queue classes. The visualizer only reads .items to draw them.

export class Stack {
  constructor(limit = 8) {
    this.items = [];
    this.limit = limit;
  }
  push(value) {
    if (this.isFull()) throw new Error("Stack overflow — the stack is full.");
    this.items.push(value);
  }
  pop() {
    if (this.isEmpty()) throw new Error("Stack underflow — nothing to pop.");
    return this.items.pop();
  }
  peek() {
    if (this.isEmpty()) throw new Error("The stack is empty.");
    return this.items[this.items.length - 1];
  }
  isEmpty() { return this.items.length === 0; }
  isFull() { return this.items.length >= this.limit; }
