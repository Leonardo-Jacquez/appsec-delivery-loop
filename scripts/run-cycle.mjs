#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { collapsedWorklist, delta, proposedCloses } from "./lib.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "fixtures/harbor-cart.json"), "utf8"));
const cycle = process.argv[2] === "aug" ? "aug" : "sep";
const d = delta(data.findings, cycle);
const wl = collapsedWorklist(data.findings, cycle, {}, data.tickets);
const closes = proposedCloses(data.findings, data.tickets, cycle);

const lines = [
  `${data.account.name} — ${cycle === "sep" ? "September" : "August (baseline)"} packet skeleton`,
  `SOW analog: ${data.account.tier}`,
  `Delta (script): still ${d.still.length}, new ${d.neu.length}, gone ${d.gone.length}`,
  `Sprint list (${wl.length}):`,
  ...wl.map((w, i) => `  ${i + 1}. [${w.finding.severity}] ${w.finding.title} — ${w.finding.id}${w.ticket ? ` (${w.ticket.id})` : ""}`),
  `Propose close (${closes.length}):`,
  ...closes.map((t) => `  ${t.id} · ${t.findingId} — needs evidence comment before transition`),
  "Coverage: DAST auth on review POST still missing. Batch image is not on the storefront path.",
  "Unsigned. A model may draft prose from this skeleton. It may not change the counts.",
];
console.log(lines.join("\n"));
