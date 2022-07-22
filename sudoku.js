function parseProblem(problem) {
  return problem.map((s) => s.split("").map((c) => Number.parseInt(c)));
}

function getSetOf1To9() {
  return new Set(Array.from({ length: 9 }, (_, i) => i + 1));
}

function get3x3SquareOrigin(n) {
  return Math.floor(n / 3) * 3;
}

function calculateValidNumbers(problem, x = 0, y = 0) {
  const validNumbers = getSetOf1To9();

  problem[x].forEach((v) => {
    validNumbers.delete(v);
  });

  problem
    .map((row) => row[y])
    .forEach((v) => {
      validNumbers.delete(v);
    });

  const i0 = get3x3SquareOrigin(x);
  const j0 = get3x3SquareOrigin(y);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      validNumbers.delete(problem[i0 + i][j0 + j]);
    }
  }

  return Array.from(validNumbers);
}

function getNextSquare(x, y) {
  if (y < 8) return [x, y + 1];

  if (x < 8) return [x + 1, 0];

  return [-1, -1];
}

function solve(problem, x = 0, y = 0) {
  // Current square does not exist, done
  if (x === -1 && y === -1) return problem;

  if (problem[x][y]) {
    // Indicated square already filled
    const [x1, y1] = getNextSquare(x, y);
    if (x1 === -1 && y1 === -1) {
      // No more empty squares, done
      return problem;
    }

    // Go to next empty square
    return solve(problem, x1, y1);
  }

  // Current square is empty

  const validNumbers = calculateValidNumbers(problem, x, y);

  for (const number in validNumbers) {
    const copy = JSON.parse(JSON.stringify(problem));
    copy[x][y] = validNumbers[number];

    const solution = solve(copy, x, y);

    if (solution) {
      return solution;
    }
  }

  // No valid solutions/child solutions, fail
  return null;
}

function main() {
  const problem = [
    "000002100",
    "004008700",
    "020300900",
    "602003040",
    "000000000",
    "050600301",
    "003005080",
    "008200500",
    "009700000",
  ];

  let parsedProblem = parseProblem(problem);
  parsedProblem = solve(parsedProblem);

  console.table(parsedProblem);
}

main();
