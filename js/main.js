import { ALGORITHMS } from "./sorting.js";
import { Stack, Queue } from "./structures.js";
import { binarySearch, sortedRandomArray } from "./search.js";

const $ = (id) => document.getElementById(id);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ================= tabs =================
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab, .view").forEach((el) => el.classList.remove("active"));
    tab.classList.add("active");
    $(tab.dataset.view).classList.add("active");
  });
});

// ================= sorting =================
const sort = {
  array: [],
  gen: null,       // the running generator
  playing: false,
  finished: false,
  stats: { steps: 0, cmp: 0, swp: 0 },
  doneSet: new Set(),
};

function delay() {
  // speed 1..100 -> 500ms..5ms
  return 505 - Number($("speed").value) * 5;
}

function newArray() {
  const size = Number($("size").value);
  sort.array = Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
  resetSort();
}

function resetSort() {
  sort.playing = false;
  sort.finished = false;
  sort.gen = null;
  sort.stats = { steps: 0, cmp: 0, swp: 0 };
  sort.doneSet = new Set();
  $("play").textContent = "Play";
  $("sort-msg").textContent = "";
  $("complexity").textContent = ALGORITHMS[$("algo").value].complexity;
  setSortControls(false);
  drawBars();
  drawStats();
}

function drawBars(step = null) {
  const max = Math.max(...sort.array);
  const showLabels = sort.array.length <= 30;
  $("bars").innerHTML = sort.array
    .map((v, i) => {
      let cls = "bar";
      if (sort.finished || sort.doneSet.has(i)) cls += " done";
      if (step) {
        if (step.type === "compare" && (i === step.i || i === step.j)) cls += " compare";
        if (step.type === "swap" && (i === step.i || i === step.j)) cls += " swap";
        if (step.type === "write" && i === step.i) cls += " swap";
        if (step.type === "pivot" && i === step.i) cls += " pivot";
      }
      return `<div class="${cls}" style="height:${(v / max) * 100}%">${showLabels ? `<span>${v}</span>` : ""}</div>`;
    })
    .join("");
}

function drawStats() {
  $("stat-steps").textContent = sort.stats.steps;
  $("stat-cmp").textContent = sort.stats.cmp;
