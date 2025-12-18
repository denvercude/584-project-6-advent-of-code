/*
 * Node.js documentation used:
 * - fs.readFileSync:
 *   https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
 * - path.join:
 *   https://nodejs.org/api/path.html#pathjoinpaths
 *
 * MDN documentation used:
 * - Map:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 * - Set:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 * - String.prototype.split:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
 * - String.prototype.trim:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
 * - Array.prototype.push:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
 */

const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "..", "inputs", "day07.txt");
const raw = fs.readFileSync(inputPath, "utf8").trim();

const lines = raw
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

// reverse graph: childColor -> Set of parentColors
const parentsOf = new Map();

function addParent(child, parent) {
  if (!parentsOf.has(child)) {
    parentsOf.set(child, new Set());
  }
  parentsOf.get(child).add(parent);
}

for (const line of lines) {
  // Example:
  // "light red bags contain 1 bright white bag, 2 muted yellow bags."
  const [outerPart, innerPartRaw] = line.split(" bags contain ");
  const outerColor = outerPart.trim();

  // If it contains no other bags, we can skip (no edges to add).
  if (innerPartRaw.startsWith("no other bags")) {
    continue;
  }

  // Split inner list by comma, parse each "N color color bag(s)".
  const innerParts = innerPartRaw.split(",");

  for (const piece of innerParts) {
    // Clean up punctuation and extra spaces.
    const cleaned = piece.replace(".", "").trim();

    // cleaned looks like: "1 bright white bag" or "2 muted yellow bags"
    // I don't actually need the number for Part 1, just the color.
    const words = cleaned.split(" ");

    // words: [count, adj, color, "bag"/"bags"]
    const childColor = `${words[1]} ${words[2]}`;

    // Reverse edge: child -> parent
    addParent(childColor, outerColor);
  }
}

// Now walk "upwards" from shiny gold to find all possible outer containers.
const target = "shiny gold";
const seen = new Set(); // all bag colors that can eventually contain target
const stack = [target]; // DFS stack (could also be a queue for BFS)

while (stack.length > 0) {
  const current = stack.pop();

  const parents = parentsOf.get(current);
  if (!parents) continue;

  for (const parent of parents) {
    // If we haven't counted this parent yet, add it and keep exploring upward.
    if (!seen.has(parent)) {
      seen.add(parent);
      stack.push(parent);
    }
  }
}

console.log(seen.size);