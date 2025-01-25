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
  assert.equal(finish(binarySearch(values, 7)), -1);
});

test("random search data is sorted and unique", () => {
  const values = sortedRandomArray(12, 30);

  assert.equal(values.length, 12);
  assert.equal(new Set(values).size, 12);
  assert.deepEqual(values, [...values].sort((a, b) => a - b));
});

test("random data rejects impossible ranges", () => {
  assert.throws(() => sortedRandomArray(6, 5), /cannot exceed/i);
});
