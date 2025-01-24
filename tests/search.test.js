import test from "node:test";
import assert from "node:assert/strict";

import { binarySearch, sortedRandomArray } from "../js/search.js";

function finish(generator) {
  let result = generator.next();
  while (!result.done) result = generator.next();
  return result.value;
}

test("binary search returns a matching index", () => {
  const values = [2, 5, 8, 13, 21, 34];

  assert.equal(finish(binarySearch(values, 13)), 3);
