const fs = require("fs");

const process = (array, idx) => {
  const opcode = array[idx];

  if (opcode === 99) return array[0];

  const v1 = array[array[idx + 1]];
  const v2 = array[array[idx + 2]];
  const dest = array[idx + 3];

  if (opcode === 1) array[dest] = v1 + v2;
  else array[dest] = v1 * v2;

  return process(array, idx + 4);
};

const input = fs.readFileSync("./day2.txt", "utf8").trim();
const array = input.split(",").map((v) => parseInt(v));

// Part 1
const part1 = Array.from(array);
part1[1] = 12;
part1[2] = 2;
console.log("part 1:", process(part1, 0));

// Part 2
for (let i = 0; i < 100; i++) {
  array[1] = i;

  for (let j = 0; j < 100; j++) {
    array[2] = j;

    if (process(Array.from(array), 0) === 19690720) {
      console.log("part 2:", 100 * i + j);
      return;
    }
  }
}
