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
  $("stat-swp").textContent = sort.stats.swp;
}

function setSortControls(running) {
  // can't change the array or algorithm in the middle of a run
  $("algo").disabled = running;
  $("size").disabled = running;
  $("shuffle").disabled = running;
}

// Runs one step of the generator. Returns false when the sort is over.
function nextStep() {
  if (!sort.gen) {
    sort.gen = ALGORITHMS[$("algo").value].fn(sort.array);
    setSortControls(true);
  }
  const { value: step, done } = sort.gen.next();
  if (done) {
    sort.finished = true;
    sort.playing = false;
    $("play").textContent = "Play";
    $("play").disabled = true;
    $("step").disabled = true;
    setSortControls(false);
    $("sort-msg").textContent = `Sorted in ${sort.stats.steps} steps.`;
    drawBars();
    return false;
  }

  sort.stats.steps++;
  if (step.type === "compare") sort.stats.cmp++;
  if (step.type === "swap" || step.type === "write") sort.stats.swp++;
  if (step.type === "done") sort.doneSet.add(step.i);
  drawBars(step);
  drawStats();
  return true;
}

async function play() {
  sort.playing = true;
  $("play").textContent = "Pause";
  while (sort.playing && nextStep()) {
    await sleep(delay());
  }
}

$("play").addEventListener("click", () => {
  if (sort.playing) {
    sort.playing = false;
    $("play").textContent = "Play";
  } else {
    play();
  }
});

$("step").addEventListener("click", () => {
  sort.playing = false;
  $("play").textContent = "Play";
  nextStep();
});

$("shuffle").addEventListener("click", () => {
  $("play").disabled = false;
  $("step").disabled = false;
  newArray();
});
$("size").addEventListener("input", () => $("shuffle").click());
$("algo").addEventListener("change", () => $("shuffle").click());

newArray();

// ================= stack & queue =================
