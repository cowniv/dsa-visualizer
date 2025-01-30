# DSA Visualizer

**Inspired by:** the DSA Visualizer we made as a group project for Data Structures and Algorithms ([live site](https://dsa-mu-12.vercel.app/))

This is a separate solo follow-up to the January 2025 group project. I wanted to understand how the animation layer works, so I rebuilt the concept in plain JavaScript with ES modules and no framework. Every algorithm is a generator that pauses on each comparison or mutation, and the page draws one step at a time.

### Features
- Sorting: bubble, selection, insertion, merge and quick sort
- Play / pause, single step, speed and array size sliders
- Live counters for steps, comparisons and swaps/writes, plus each algorithm's time complexity
- Colors for comparing, swapping, pivot and sorted bars
- Stack (push, pop, peek) and queue (enqueue, dequeue, front) with overflow/underflow messages
- Binary search on a sorted array, showing low / mid / high on every step

### Run
ES modules don't load from `file://`, so serve the folder:
```bash
npx serve .
```
or open `index.html` with VS Code Live Server.

Run the algorithm and data-structure tests with:

```bash
npm test
