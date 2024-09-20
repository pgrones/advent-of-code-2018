import { input } from "./input.js";

const ids = input.split("\n");

// --- PART 1 ---

const letterCounts = new Map();
let twoLetterCount = 0;
let threeLetterCount = 0;

for (const id of ids) {
  for (const letter of id) {
    letterCounts.set(letter, (letterCounts.get(letter) ?? 0) + 1);
  }

  const counts = [...letterCounts.values()];

  if (counts.includes(2)) twoLetterCount++;
  if (counts.includes(3)) threeLetterCount++;

  letterCounts.clear();
}

console.log(twoLetterCount * threeLetterCount);

// --- PART 2 ---

outer: for (let i = 0; i < ids.length - 1; i++) {
  for (let j = i + 1; j < ids.length; j++) {
    let differences = 0;

    for (let k = 0; k < ids[0].length; k++) {
      if (differences > 1) break;

      if (ids[i].charAt(k) !== ids[j].charAt(k)) differences++;
    }

    if (differences === 1) {
      console.log([...ids[i]].filter((x) => ids[j].includes(x)).join(""));

      break outer;
    }
  }
}
