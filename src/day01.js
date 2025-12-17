/**
 * Advent of Code 2020 — Day 1: Report Repair
 *
 * Node.js documentation used:
 * - fs.readFileSync: https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
 * - path.join: https://nodejs.org/api/path.html#pathjoinpaths
 *
 * MDN documentation used:
 * - String.prototype.split: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
 * - Array.prototype.map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 */

const fs = require("fs");
const path = require("path");

// Build the path to the input file.
// path.join is safer than hardcoding slashes and works across operating systems.
const inputPath = path.join(__dirname, "..", "inputs", "day01.txt");

// Read the entire file as a string.
// readFileSync is fine here since the input size is small and this is a script.
const rawInput = fs.readFileSync(inputPath, "utf8");

// Split the input into lines and convert each line to a number.
// map(Number) turns each string into a numeric value.
const numbers = rawInput.split("\n").map(Number);

// Loop through every possible pair of numbers.
// The outer loop picks the first number.
for (let i = 0; i < numbers.length; i++) {
  // The inner loop picks the second number.
  for (let j = i + 1; j < numbers.length; j++) {
    // Check if this pair adds up to 2020.
    if (numbers[i] + numbers[j] === 2020) {
      // If we found the correct pair, multiply them.
      const product = numbers[i] * numbers[j];

      // Print the answer to the console.
      console.log(product);

      // Once the answer is found, we can stop the program.
      process.exit(0);
    }
  }
}