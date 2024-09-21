import { input } from "./input.js";

const steps = [];

for (const line of input.split("\n")) {
  const [name, requirementFor] = [...line.matchAll(/(?<!^)[A-Z]/g)].map(
    (x) => x[0]
  );

  let step = steps.find((x) => x.name === name);
  let requiringStep = steps.find((x) => x.name === requirementFor);

  if (!step) {
    step = { name, requirements: [] };
    steps.push(step);
  }

  if (!requiringStep) {
    requiringStep = { name: requirementFor, requirements: [] };
    steps.push(requiringStep);
  }

  requiringStep.requirements.push(step);
}

// --- PART 1 ---

let remainingSteps = structuredClone(
  steps.filter((x) => x.requirements.length)
);

let availableSteps = steps
  .filter((x) => !x.requirements.length)
  .toSorted((a, b) => b.name.localeCompare(a.name));

let finishedSteps = [];

while (availableSteps.length) {
  finishedSteps.push(availableSteps.pop());

  for (let i = 0; i < remainingSteps.length; i++) {
    if (
      remainingSteps[i].requirements.every((x) =>
        finishedSteps.some((y) => y.name === x.name)
      )
    ) {
      availableSteps.push(...remainingSteps.splice(i, 1));
      i--;
    }
  }

  availableSteps.sort((a, b) => b.name.localeCompare(a.name));
}

console.log(finishedSteps.map((x) => x.name).join(""));

// --- PART 2 ---

remainingSteps = structuredClone(steps.filter((x) => x.requirements.length));

availableSteps = steps
  .filter((x) => !x.requirements.length)
  .toSorted((a, b) => a.name.localeCompare(b.name));

finishedSteps = [];

let duration = 0;
let availableWorkers = 5;
const workingSteps = [];

while (availableSteps.length || workingSteps.length) {
  workingSteps.forEach((x) => x.duration--);

  for (let i = 0; i < workingSteps.length; i++) {
    if (workingSteps[i].duration === 0) {
      finishedSteps.push(...workingSteps.splice(i, 1));
      availableWorkers++;
      i--;
    }
  }

  for (let i = 0; i < remainingSteps.length; i++) {
    if (
      remainingSteps[i].requirements.every((x) =>
        finishedSteps.some((y) => y.name === x.name)
      )
    ) {
      availableSteps.push(...remainingSteps.splice(i, 1));
      i--;
    }
  }

  availableSteps.sort((a, b) => a.name.localeCompare(b.name));

  const startingSteps = availableSteps.splice(0, availableWorkers);
  availableWorkers -= startingSteps.length;
  workingSteps.push(
    ...startingSteps.map((x) => ({ ...x, duration: x.name.charCodeAt(0) - 4 }))
  );

  if (availableSteps.length || workingSteps.length) {
    duration++;
  }
}

console.log(duration);
