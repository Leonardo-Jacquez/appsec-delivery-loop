import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import test from "node:test";
import { collapsedWorklist, delta, proposedCloses } from "./lib.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "fixtures/harbor-cart.json"), "utf8"));

test("august is baseline — no new, no gone", () => {
  const d = delta(data.findings, "aug");
  assert.equal(d.neu.length, 0);
  assert.equal(d.gone.length, 0);
  assert.ok(d.still.length > 0);
});

test("september delta has new and gone", () => {
  const d = delta(data.findings, "sep");
  assert.ok(d.neu.some((f) => f.id === "INV-SQLI-PRODUCTS"));
  assert.ok(d.neu.some((f) => f.id === "BB-IDOR-ORDERS"));
  assert.ok(d.gone.some((f) => f.id === "INV-OPEN-REDIRECT"));
  assert.ok(d.gone.some((f) => f.id === "SNYK-JS-COLORS-2331904"));
  assert.ok(d.still.some((f) => f.id === "CX-SQLI-PRODUCTS"));
});

test("worklist drops unreachable SCA/Wiz and low severity", () => {
  const ids = collapsedWorklist(data.findings, "sep", {}, data.tickets).map((r) => r.finding.id);
  assert.equal(ids.includes("SNYK-JS-MINIMIST-559764"), false);
  assert.equal(ids.includes("WIZ-IMAGE-CVE"), false);
  assert.equal(ids.includes("INV-CSP-MISSING"), false);
  assert.ok(ids.includes("INV-SQLI-PRODUCTS") || ids.includes("CX-SQLI-PRODUCTS"));
});

test("related SQLi collapses to one work item", () => {
  const rows = collapsedWorklist(data.findings, "sep", {}, data.tickets);
  const sqli = rows.filter(
    (r) => r.finding.id === "CX-SQLI-PRODUCTS" || r.finding.id === "INV-SQLI-PRODUCTS",
  );
  assert.equal(sqli.length, 1);
  assert.equal(sqli[0].ticket?.id, "HARBOR-104");
});

test("gone tickets are proposed closes", () => {
  const closes = proposedCloses(data.findings, data.tickets, "sep").map((t) => t.id);
  assert.ok(closes.includes("HARBOR-88"));
  assert.ok(closes.includes("HARBOR-91"));
  assert.equal(closes.includes("HARBOR-104"), false);
});

test("proven live ranks above unproven same-band", () => {
  const rows = collapsedWorklist(data.findings, "sep", {}, data.tickets);
  const provenIdx = rows.findIndex((r) => r.finding.proven);
  const firstHighUnproven = rows.findIndex((r) => r.finding.severity === "high" && !r.finding.proven);
  assert.ok(provenIdx >= 0);
  assert.ok(provenIdx < firstHighUnproven || firstHighUnproven === -1);
});
