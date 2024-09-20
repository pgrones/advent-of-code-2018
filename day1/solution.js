import { input } from "./input.js";

const frequencyChanges = input.split("\n");

// --- PART 1 ---

console.log(frequencyChanges.reduce((acc, curr) => acc + parseInt(curr), 0));

// --- PART 2 ---

const frequencies = new Set();
let currentFrequency = 0;
let i = 0;
const n = frequencyChanges.length;

while (!frequencies.has(currentFrequency)) {
  frequencies.add(currentFrequency);
  currentFrequency += parseInt(frequencyChanges[i]);
  i = (((i + 1) % n) + n) % n;
}

console.log(currentFrequency);
