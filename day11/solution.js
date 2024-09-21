const input = 42;

const getPowerLevel = (x, y, serialNumber) => {
  const rackId = x + 10;
  const powerLevel = ((rackId * y + serialNumber) * rackId).toString();

  if (powerLevel.length < 3) return -5;

  return parseInt(powerLevel.charAt(powerLevel.length - 3)) - 5;
};

// --- PART 1 ---

let maxPowerLevel = -Infinity;
let coordinates;

for (let y = 1; y <= 300 - 2; y++) {
  for (let x = 1; x <= 300 - 2; x++) {
    let totalPower = 0;

    for (let subY = y; subY <= y + 2; subY++) {
      for (let subX = x; subX <= x + 2; subX++) {
        totalPower += getPowerLevel(subX, subY, input);
      }
    }

    if (totalPower > maxPowerLevel) {
      maxPowerLevel = totalPower;
      coordinates = `${x},${y}`;
    }
  }
}

console.log(coordinates);

// --- PART 2 ---

maxPowerLevel = -Infinity;
coordinates = null;

for (let size = 0; size < 300; size++) {
  for (let y = 1; y <= 300 - size; y++) {
    for (let x = 1; x <= 300 - size; x++) {
      let totalPower = 0;

      for (let subY = y; subY <= y + size; subY++) {
        for (let subX = x; subX <= x + size; subX++) {
          totalPower += getPowerLevel(subX, subY, input);
        }
      }

      if (totalPower > maxPowerLevel) {
        maxPowerLevel = totalPower;
        coordinates = `${x},${y},${size}`;
      }
    }
  }
}

console.log(coordinates);
