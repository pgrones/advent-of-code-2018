import { input } from "./input.js";

const claims = input.split("\n");

// --- PART 1 & 2 ---

const fabricMap = new Map();
const claimedPatches = new Set();
const duplicates = new Set();
let overlaps = 0;

for (const claim of claims) {
  const [id, _, coords, size] = claim.split(" ");
  const [x, y] = coords.split(",").map((x) => parseInt(x));
  const [w, h] = size.split("x").map((x) => parseInt(x));

  const area = [];
  for (let width = 0; width < w; width++) {
    for (let height = 0; height < h; height++) {
      const pos = [x + width, y + height].join();
      area.push(pos);

      if (claimedPatches.has(pos)) {
        if (duplicates.has(pos)) continue;

        overlaps++;
        duplicates.add(pos);
        continue;
      }

      claimedPatches.add(pos);
    }
  }

  fabricMap.set(id, area);
}

console.log(overlaps);
console.log(
  parseInt(
    [...fabricMap.entries()]
      .filter(([_, area], i, arr) =>
        arr.every(
          ([_, otherArea], j) =>
            i === j || area.every((x) => !otherArea.includes(x))
        )
      )[0][0]
      .substring(1)
  )
);
