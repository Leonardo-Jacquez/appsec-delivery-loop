#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { collapsedWorklist } from "./lib.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "fixtures/harbor-cart.json"), "utf8"));
const cycle = process.argv[2] === "aug" ? "aug" : "sep";
const rows = collapsedWorklist(data.findings, cycle, {}, data.tickets);

const out = rows.map((r, i) => ({
  rank: i + 1,
  id: r.finding.id,
  severity: r.finding.severity,
  tool: r.finding.tool,
  title: r.finding.title,
  location: r.finding.location,
  proven: Boolean(r.finding.proven),
  reachable: r.finding.reachable ?? null,
  related: r.kin.map((k) => k.id),
  ticket: r.ticket?.id ?? null,
}));
console.log(JSON.stringify({ cycle, count: out.length, items: out }, null, 2));
