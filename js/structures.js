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
