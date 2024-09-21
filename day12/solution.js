import { input } from "./input.js";

const inputs = input.split("\n\n");

const initialPots = [...inputs[0].split(" ")[2]];
const rules = inputs[1].split("\n").map((x) => ({
  pattern: x.substring(0, x.indexOf(" ")),
  nextState: x.substring(x.lastIndexOf(" ") + 1),
}));

// --- PART 1 ---

let pots = [...initialPots];
let leftMostPot = 0;

for (let i = 0; i < 20; i++) {
  const expandedPots = [...".".repeat(4), ...pots, ...".".repeat(4)];
  const nextGeneration = [];

  let indexFound = false;
  for (let j = 2; j < expandedPots.length - 2; j++) {
    const nextState =
      rules.find((x) => x.pattern === expandedPots.slice(j - 2, j + 3).join(""))
        ?.nextState ?? ".";

    if (!indexFound && nextState === "#") {
      indexFound = true;
      leftMostPot += j - 4;
    }

    nextGeneration.push(nextState);
  }

  pots = nextGeneration.slice(
    nextGeneration.indexOf("#"),
    nextGeneration.lastIndexOf("#") + 1
  );
}

console.log(
  pots.reduce((acc, curr, i) => acc + (curr === "." ? 0 : i + leftMostPot), 0)
);

// --- PART 2 ---

pots = [...initialPots];
leftMostPot = 0;
let lastLeftMostPot = 0;

const seenPatterns = new Set([pots.join()]);
let cycleFound = false;

for (let i = 0; i < 50_000_000_000; i++) {
  const expandedPots = [...".".repeat(4), ...pots, ...".".repeat(4)];
  const nextGeneration = [];

  let indexFound = false;
  for (let j = 2; j < expandedPots.length - 2; j++) {
    const nextState =
      rules.find((x) => x.pattern === expandedPots.slice(j - 2, j + 3).join(""))
        ?.nextState ?? ".";

    if (!indexFound && nextState === "#") {
      indexFound = true;
      lastLeftMostPot = leftMostPot;
      leftMostPot += j - 4;
    }

    nextGeneration.push(nextState);
  }

  const nextPots = nextGeneration.slice(
    nextGeneration.indexOf("#"),
    nextGeneration.lastIndexOf("#") + 1
  );

  const pattern = nextPots.join();

  if (!cycleFound && seenPatterns.has(pattern)) {
    cycleFound = true;
    const delta = leftMostPot - lastLeftMostPot;
    const patterns = [...seenPatterns];
    const cycleLength = patterns.length - patterns.indexOf(pattern);
    const lastPatternIndex = patterns.indexOf(pattern) + cycleLength - 1;

    const offset = leftMostPot + (50_000_000_000 - i - 1) * delta;

    console.log(
      patterns[lastPatternIndex]
        .split(",")
        .reduce((acc, curr, i) => acc + (curr === "." ? 0 : i + offset), 0)
    );

    break;
  }

  seenPatterns.add(pattern);
  pots = nextPots;
}
