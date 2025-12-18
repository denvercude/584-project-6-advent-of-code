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
 * - Array.prototype.filter:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 */

const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "..", "inputs", "day03.txt");
const raw = fs.readFileSync(inputPath, "utf8").trim();

// Split into rows and ignore any accidental blank lines.
const rows = raw
  .split("\n")
  .map((r) => r.trim())
  .filter((r) => r.length > 0);

const height = rows.length;
const width = rows[0].length;

// Slope for Part 1
const right = 3;
const down = 1;

// Start at the top-left corner.
let row = 0;
let col = 0;

let treeCount = 0;

// We stop once we move past the last row.
while (row < height) {
  // Check the current position.
  // col % width handles the "infinite repeat to the right" behavior.
  const spot = rows[row][col % width];
  if (spot === "#") {
    treeCount++;
  }

  // Move to the next position based on the slope.
  row += down;
  col += right;
}

console.log(treeCount);