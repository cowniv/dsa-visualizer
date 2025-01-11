// Binary search as a generator so every "look at the middle" can be shown.
export function* binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    yield { low, high, mid, found: arr[mid] === target };
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

export function sortedRandomArray(size = 16, max = 99) {
  if (!Number.isInteger(size) || !Number.isInteger(max) || size < 1 || max < 1) {
    throw new RangeError("Size and maximum must be positive integers.");
  }
  if (size > max) {
    throw new RangeError("Size cannot exceed the available number range.");
  }

  const set = new Set();
  while (set.size < size) set.add(Math.floor(Math.random() * max) + 1);
  return [...set].sort((a, b) => a - b);
}
