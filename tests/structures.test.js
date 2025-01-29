import test from "node:test";
import assert from "node:assert/strict";

import { Queue, Stack } from "../js/structures.js";

test("stack follows last-in, first-out order", () => {
  const stack = new Stack(2);
  stack.push("first");
  stack.push("second");

  assert.equal(stack.peek(), "second");
  assert.equal(stack.pop(), "second");
  assert.equal(stack.pop(), "first");
  assert.throws(() => stack.pop(), /underflow/i);
});

test("queue follows first-in, first-out order", () => {
  const queue = new Queue(2);
  queue.enqueue("first");
  queue.enqueue("second");

  assert.equal(queue.front(), "first");
  assert.equal(queue.dequeue(), "first");
  assert.equal(queue.dequeue(), "second");
  assert.throws(() => queue.dequeue(), /empty/i);
});

test("bounded structures reject overflow", () => {
  const stack = new Stack(1);
  const queue = new Queue(1);
  stack.push(1);
  queue.enqueue(1);

  assert.throws(() => stack.push(2), /overflow/i);
  assert.throws(() => queue.enqueue(2), /full/i);
});
