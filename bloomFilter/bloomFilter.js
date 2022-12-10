const crypto = require("crypto");
const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

function md5(word) {
  return crypto.createHash("md5").update(word).digest("hex");
}

function sha1(word) {
  return crypto.createHash("sha1").update(word).digest("hex");
}

function asciiSum(word) {
  return word.split("").reduce((acc, curr) => acc + curr.charCodeAt(0), 0);
}

function getPositions(word) {
  word = word.toLowerCase().trim();
  const md5Int = parseInt(md5(word), 16);
  const sum = asciiSum(word);
  const shaInt = parseInt(sha1(word), 16);

  return [md5Int % 300000, sum % 300000, shaInt % 300000];
}

function readFile() {
  try {
    return fs
      .readFileSync("./wordlist.txt", "utf8")
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s);
  } catch (e) {
    return [];
  }
}

function main() {
  const filter = Array.from({ length: 300000 }).map(() => false);

  const words = readFile();

  words.flatMap(getPositions).forEach((position) => (filter[position] = true));

  console.log("Enter a word: ");
  readline.on("line", (word) => {
    console.log(getPositions(word).every((pos) => filter[pos]));
    readline.close();
  });
}

main();
