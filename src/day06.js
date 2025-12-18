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
 * - Set:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 * - Set.prototype.add:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add
 * - Set.prototype.size:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size
 */

const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "..", "inputs", "day06.txt");
const raw = fs.readFileSync(inputPath, "utf8").trim();

// Split groups by blank lines (one or more).
const groups = raw.split(/\n\s*\n/);

let total = 0;

for (const group of groups) {
  // Each group has multiple lines (one per person).
  // For Part 1, we just want the union of all letters across the whole group.
  const yesSet = new Set();

  // Split into lines and add each character to the set.
  for (const line of group.split("\n")) {
    const answers = line.trim();

    // Add each letter (a-z) the person answered yes to.
    for (const ch of answers) {
      yesSet.add(ch);
    }
  }

  // Set size = number of unique questions answered "yes" by anyone in the group.
  total += yesSet.size;
}

console.log(total);