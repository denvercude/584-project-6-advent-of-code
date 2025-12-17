/**
 * Advent of Code 2020 — Day 2: Password Philosophy (Part 1)
 *
 * Each line looks like:
 *   "1-3 a: abcde"
 * Meaning:
 * - the letter is 'a'
 * - it must appear at least 1 time and at most 3 times in the password
 *
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
 * - Array.prototype.length:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length
 */

const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "..", "inputs", "day02.txt");
const raw = fs.readFileSync(inputPath, "utf8").trim();

// Split into lines, and ignore any accidental blank lines.
const lines = raw
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

let validCount = 0;

for (const line of lines) {
  // Example line: "1-3 a: abcde"
  // Split into the policy part and the password part.
  const [policyPart, password] = line.split(": ").map((s) => s.trim());

  // policyPart is like "1-3 a"
  const [rangePart, letter] = policyPart.split(" ");

  // rangePart is like "1-3"
  const [minStr, maxStr] = rangePart.split("-");
  const min = Number(minStr);
  const max = Number(maxStr);

  // Count how many times `letter` appears in the password.
  // I'm doing this with a simple loop because it's super clear what's happening.
  let count = 0;
  for (const ch of password) {
    if (ch === letter) count++;
  }

  // Valid if count is within the [min, max] range (inclusive).
  if (count >= min && count <= max) {
    validCount++;
  }
}

console.log(validCount);