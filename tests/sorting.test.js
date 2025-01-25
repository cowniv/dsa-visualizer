import test from "node:test";
import assert from "node:assert/strict";

import { ALGORITHMS } from "../js/sorting.js";

for (const [name, algorithm] of Object.entries(ALGORITHMS)) {
  test(`${name} sort orders values`, () => {
    const values = [8, 3, 5, 1, 9, 2, 3];

    [...algorithm.fn(values)];
