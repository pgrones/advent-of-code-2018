import { input } from "./input.js";

const [players, lastMarble] = [...input.matchAll(/\d+/g)].map((x) =>
  parseInt(x[0])
);

const play = (players, lastMarble) => {
  let pointer = 0;
  const marbles = [0];
  const scores = new Array(players).fill(0);

  for (let i = 1; i <= lastMarble; i++) {
    const n = marbles.length;

    if (i % 23 === 0) {
      let score = i;
      pointer = (((pointer - 7) % n) + n) % n;
      score += marbles.splice(pointer, 1)[0];
      scores[i % players] += score;
      continue;
    }

    pointer = (((pointer + 1) % n) + n) % n;

    marbles.splice(pointer + 1, 0, i);
    pointer++;
  }

  return Math.max(...scores);
};

// --- PART 1 ---

console.log(play(players, lastMarble));

// --- PART 2 ---

console.log(play(players, lastMarble * 100));
