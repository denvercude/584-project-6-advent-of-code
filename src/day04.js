/**
 * Advent of Code 2020 — Day 4: Passport Processing (Part 1)
 *
 * Part 1 rules:
 * - Each passport is a bunch of key:value fields separated by spaces and/or newlines.
 * - Passports are separated by a blank line.
 * - A passport is valid if it has ALL required fields.
 * - cid is optional (so we ignore it for validity).
 *
 * Required fields:
 * byr, iyr, eyr, hgt, hcl, ecl, pid
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
 * - Array.prototype.every:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
 * - Set:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 */

const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "..", "inputs", "day04.txt");
const raw = fs.readFileSync(inputPath, "utf8").trim();

// Split passports by blank lines.
// This regex handles one or more blank lines.
const passportBlocks = raw.split(/\n\s*\n/);

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

let validCount = 0;

for (const block of passportBlocks) {
  // Each block has fields separated by spaces and/or newlines,
  // so splitting on whitespace grabs everything cleanly.
  const parts = block.split(/\s+/);

  // Grab just the keys (stuff before ':') and put them in a Set for fast lookup.
  const keys = new Set(parts.map((kv) => kv.split(":")[0]));

  // If we have every required field, it's valid. cid doesn't matter.
  const isValid = requiredFields.every((field) => keys.has(field));

  if (isValid) validCount++;
}

console.log(validCount);