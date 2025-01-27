import test from "node:test";
import assert from "node:assert/strict";

import { Queue, Stack } from "../js/structures.js";

test("stack follows last-in, first-out order", () => {
  const stack = new Stack(2);
  stack.push("first");
  stack.push("second");
