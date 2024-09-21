import { input } from "./input.js";

const keys = ["x", "y", "dx", "dy"];

const points = input
  .split("\n")
  .map((x) =>
    [...x.matchAll(/-*\d+/g)]
      .map((y) => y[0])
      .reduce((acc, curr, i) => ({ ...acc, [keys[i]]: parseInt(curr) }), {})
  );

const drawPoints = (points) => {
  const minX = Math.min(...points.map((x) => x.x));
  const maxX = Math.max(...points.map((x) => x.x));
  const minY = Math.min(...points.map((x) => x.y));
  const maxY = Math.max(...points.map((x) => x.y));

  for (let y = minY; y <= maxY; y++) {
    let line = "";

    for (let x = minX; x <= maxX; x++) {
      line += points.some((p) => p.x === x && p.y === y) ? "#" : ".";
    }

    console.log(line);
  }

  console.log();
};

// --- PART 1 & 2---

const offsets = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
];

const hasNeighbor = (point, points) => {
  for (const [dx, dy] of offsets) {
    if (points.some((p) => p.x === point.x + dx && p.y === point.y + dy))
      return true;
  }

  return false;
};

let seconds = 0;

while (!points.every((point) => hasNeighbor(point, points))) {
  seconds++;
  points.forEach((p) => {
    p.x += p.dx;
    p.y += p.dy;
  });
}

drawPoints(points);
console.log(seconds);
