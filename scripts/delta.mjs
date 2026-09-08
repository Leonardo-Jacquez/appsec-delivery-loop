#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { delta } from "./lib.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "fixtures/harbor-cart.json"), "utf8"));
const cycle = process.argv[2] === "aug" ? "aug" : "sep";
const d = delta(data.findings, cycle);

const out = {
  cycle,
  still: d.still.map((f) => f.id),
  new: d.neu.map((f) => f.id),
  gone: d.gone.map((f) => f.id),
  counts: { still: d.still.length, new: d.neu.length, gone: d.gone.length },
};
console.log(JSON.stringify(out, null, 2));
