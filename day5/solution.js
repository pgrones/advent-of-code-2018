import { input } from "./input.js";

// --- PART 1 ---

let polymer = input;
let i = 0;

while (i < polymer.length - 1) {
  const currCharCode = polymer.charCodeAt(i);
  const nextCharCode = polymer.charCodeAt(i + 1);

  if (Math.abs(currCharCode - nextCharCode) === 32) {
    polymer = polymer.substring(0, i) + polymer.substring(i + 2);
    i -= 2;
  }

  i++;
}

console.log(polymer.length);

// --- PART 2 ---

let minLength = Infinity;

for (let charCode = 65; charCode <= 90; charCode++) {
  const upperCaseLetter = String.fromCharCode(charCode);
  const lowerCaseLetter = String.fromCharCode(charCode + 32);

  let polymer = input.replaceAll(
    new RegExp(`[${upperCaseLetter}${lowerCaseLetter}]`, "g"),
    ""
  );

  let i = 0;
  while (i < polymer.length - 1) {
    const currCharCode = polymer.charCodeAt(i);
    const nextCharCode = polymer.charCodeAt(i + 1);

    if (Math.abs(currCharCode - nextCharCode) === 32) {
      polymer = polymer.substring(0, i) + polymer.substring(i + 2);
      i -= 2;
    }

    i++;
  }

  minLength = Math.min(minLength, polymer.length);
}

console.log(minLength);
