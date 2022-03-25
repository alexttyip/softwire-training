const fs = require("fs");

const checkUnitDigitForModeAndReturnValue = (parameters, array, param) =>
  parameters % 10 === 0 ? array[param] : param;

const process = (array, idx, userInput) => {
  const [opcodeAndParameters, param1, param2, param3] = array.slice(idx);

  const opcode = opcodeAndParameters % 100;
  let parameters = Math.floor(opcodeAndParameters / 100);

  if (opcode === 99) return;

  const v1 = checkUnitDigitForModeAndReturnValue(parameters, array, param1);
  parameters = Math.floor(parameters / 10);
  const v2 = checkUnitDigitForModeAndReturnValue(parameters, array, param2);

  switch (opcode) {
    case 1:
      array[param3] = v1 + v2;
      idx += 4;
      break;
    case 2:
      array[param3] = v1 * v2;
      idx += 4;
      break;
    case 3:
      array[param1] = userInput;
      idx += 2;
      break;
    case 4:
      if (v1) console.log(v1);
      idx += 2;
      break;
    case 5:
    case 6:
      if ((v1 && opcode === 5) || (!v1 && opcode === 6)) idx = v2;
      else idx += 3;
      break;
    case 7:
      array[param3] = v1 < v2 ? 1 : 0;
      idx += 4;
      break;
    case 8:
      array[param3] = v1 === v2 ? 1 : 0;
      idx += 4;
      break;
  }

  process(array, idx, userInput);
};

const input = fs.readFileSync("./day5.txt", "utf8").trim();
const array = input.split(",").map((v) => parseInt(v));

// Part 1
const part1 = Array.from(array);
process(part1, 0, 1);
console.log("part 1: check the line above");

// Part 2
const part2 = Array.from(array);
process(part2, 0, 5);
console.log("part 2: check the line above");
