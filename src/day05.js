/*
 * Node.js documentation used:
 * - fs.readFileSync:
 *   https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
 * - path.join:
 *   https://nodejs.org/api/path.html#pathjoinpaths
 *
 * MDN documentation used:
 * - String.prototype.split:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
 * - String.prototype.trim:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
 * - Array.prototype.reduce:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 * - Math.max:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
 */

const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "..", "inputs", "day05.txt");
const raw = fs.readFileSync(inputPath, "utf8").trim();

const passes = raw
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

// Helper: turn a string into a number by treating it as binary,
// but with custom "0" and "1" characters.
function parseBinaryLike(str, zeroChar, oneChar) {
  // I’m building the number bit-by-bit:
  // num = num * 2 + bit
  let num = 0;
  for (const ch of str) {
    num *= 2;
    if (ch === oneChar) {
      num += 1;
    } else if (ch !== zeroChar) {
      // If the input has some weird character, just let it fail
      throw new Error(`Unexpected character "${ch}" in "${str}"`);
    }
  }
  return num;
}

let maxSeatId = -Infinity;

for (const pass of passes) {
  const rowPart = pass.slice(0, 7);
  const colPart = pass.slice(7);

  // Row: F=0, B=1
  const row = parseBinaryLike(rowPart, "F", "B");

  // Column: L=0, R=1
  const col = parseBinaryLike(colPart, "L", "R");

  const seatId = row * 8 + col;

  if (seatId > maxSeatId) maxSeatId = seatId;
}

console.log(maxSeatId);