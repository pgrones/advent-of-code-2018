import { input } from "./input.js";

const events = input
  .split("\n")
  .map((x) => ({
    timestamp: new Date(x.substring(1, 17)),
    observation: x.substring(19),
  }))
  .toSorted((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

const shifts = new Map();
let i = 0;

while (i < events.length) {
  const event = events[i];
  const id = parseInt(event.observation.match(/\d+/)[0]);
  const shift = new Array(60).fill(false);

  let j = i + 1;
  let shiftEvent = events[j];
  while (j < events.length && !shiftEvent.observation.includes("#")) {
    if (shiftEvent.observation.includes("asleep")) {
      const wakeUpEvent = events[j + 1];
      const fallAsleepAt = shiftEvent.timestamp.getMinutes();
      const wakeUpAt = wakeUpEvent.timestamp.getMinutes();

      for (let k = fallAsleepAt; k < wakeUpAt; k++) {
        shift[k] = true;
      }
    }

    j += 2;
    shiftEvent = events[j];
  }

  shifts.set(id, [...(shifts.get(id) ?? []), shift]);

  i = j;
}

// --- PART 1 ---

const [sleepiestGuard, sleepiestShifts] = [...shifts.entries()].toSorted(
  ([_aId, aShifts], [_bId, bShifts]) =>
    bShifts.reduce(
      (acc, curr) => acc + curr.reduce((acc2, curr2) => acc2 + curr2, 0),
      0
    ) -
    aShifts.reduce(
      (acc, curr) => acc + curr.reduce((acc2, curr2) => acc2 + curr2, 0),
      0
    )
)[0];

let maxDays = 0;
let maxMinute = 0;

for (let i = 0; i < 60; i++) {
  const days = sleepiestShifts.reduce((acc, curr) => acc + curr[i], 0);

  if (days > maxDays) {
    maxDays = days;
    maxMinute = i;
  }
}

console.log(sleepiestGuard * maxMinute);

// --- PART 2 ---

let id = 0;
let maxFrequency = 0;
maxMinute = 0;

for (const [guard, nights] of [...shifts.entries()]) {
  for (let i = 0; i < 60; i++) {
    const frequency = nights.reduce((acc, curr) => acc + curr[i], 0);

    if (frequency > maxFrequency) {
      maxFrequency = frequency;
      id = guard;
      maxMinute = i;
    }
  }
}

console.log(id * maxMinute);
