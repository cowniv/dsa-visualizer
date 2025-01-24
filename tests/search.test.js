import test from "node:test";
import assert from "node:assert/strict";

import { binarySearch, sortedRandomArray } from "../js/search.js";

function finish(generator) {
  let result = generator.next();
  while (!result.done) result = generator.next();
