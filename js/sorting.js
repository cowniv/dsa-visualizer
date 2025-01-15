// Each sort is a generator. Instead of sorting all at once, it "yields" a step
// every time it compares or moves something, so the UI can draw it one frame at a time.
// Step shapes:
//   { type: "compare", i, j }
//   { type: "swap", i, j }        (array already swapped)
//   { type: "write", i, value }   (merge sort overwrite)
//   { type: "pivot", i }
//   { type: "done", i }           (index is in its final place)

export function* bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      yield { type: "compare", i: j, j: j + 1 };
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        yield { type: "swap", i: j, j: j + 1 };
      }
    }
    yield { type: "done", i: n - i - 1 };
    if (!swapped) break; // already sorted, stop early
  }
}

export function* selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      yield { type: "compare", i: min, j };
      if (arr[j] < arr[min]) min = j;
    }
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
      yield { type: "swap", i, j: min };
    }
    yield { type: "done", i };
  }
}

export function* insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0) {
      yield { type: "compare", i: j - 1, j };
      if (arr[j - 1] <= arr[j]) break;
      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      yield { type: "swap", i: j - 1, j };
      j--;
    }
  }
