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

