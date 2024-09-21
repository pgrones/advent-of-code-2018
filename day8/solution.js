import { input } from "./input.js";

const numbers = input.split(" ").map((x) => parseInt(x));

const readNodes = (i, numbers, node) => {
  const childrenCount = numbers[i];
  const metaDataLength = numbers[i + 1];

  i += 2;

  for (let childCounter = 0; childCounter < childrenCount; childCounter++) {
    const childNode = { children: [] };
    node.children.push(childNode);
    i = readNodes(i, numbers, childNode);
  }

  node.metaData = numbers.slice(i, i + metaDataLength);
  return i + metaDataLength;
};

const root = { children: [] };

readNodes(0, numbers, root);

// --- PART 1 ---

const sumMetadata = (node) => {
  const sum = node.metaData.reduce((acc, curr) => acc + curr, 0);

  if (!node.children.length) return sum;

  return node.children.reduce((acc, curr) => acc + sumMetadata(curr), sum);
};

console.log(sumMetadata(root));

// --- PART 2 ---

const sumValue = (node) => {
  const sum = node.metaData.reduce((acc, curr) => acc + curr, 0);

  if (!node.children.length) return sum;

  const validChildren = node.metaData
    .map((index) => node.children[index - 1])
    .filter((x) => x);

  return validChildren.reduce((acc, curr) => acc + sumValue(curr), 0);
};

console.log(sumValue(root));
