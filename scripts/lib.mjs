export function inCycle(f, cycle) {
  return f.cycles.includes(cycle);
}

export function delta(findings, cycle) {
  const now = findings.filter((f) => inCycle(f, cycle));
  if (cycle === "aug") return { still: now, neu: [], gone: [] };
  const before = findings.filter((f) => inCycle(f, "aug"));
  const nowIds = new Set(now.map((f) => f.id));
  const beforeIds = new Set(before.map((f) => f.id));
  return {
    still: now.filter((f) => beforeIds.has(f.id)),
    neu: now.filter((f) => !beforeIds.has(f.id)),
    gone: before.filter((f) => !nowIds.has(f.id)),
  };
}

export function related(findings, id) {
  const f = findings.find((x) => x.id === id);
  if (!f) return [];
  return findings.filter((x) => f.relatedIds.includes(x.id) || x.relatedIds.includes(id));
}

function rank(f) {
  const sev = { critical: 0, high: 1, medium: 2, low: 3, info: 4 }[f.severity] ?? 9;
  const proven = f.proven ? -1 : 0;
  const reach = f.reachable === true ? -1 : 0;
  return sev * 10 + proven + reach;
}

export function worklist(findings, cycle, decisions = {}, tickets = []) {
  return findings
    .filter((f) => inCycle(f, cycle))
    .filter((f) => decisions[f.id] !== "drop")
    .filter((f) => {
      if (f.tool === "snyk" && f.reachable === false) return false;
      if (f.tool === "wiz" && f.reachable === false) return false;
      if (f.severity === "low" || f.severity === "info") return false;
      return true;
    })
    .sort((a, b) => rank(a) - rank(b))
    .map((f) => ({
      finding: f,
      ticket: tickets.find((t) => t.findingId === f.id),
      decision: decisions[f.id] ?? "pending",
    }));
}

export function collapsedWorklist(findings, cycle, decisions = {}, tickets = []) {
  const rows = worklist(findings, cycle, decisions, tickets);
  const seen = new Set();
  const out = [];
  for (const row of rows) {
    if (seen.has(row.finding.id)) continue;
    const kin = related(findings, row.finding.id).filter((k) => inCycle(k, cycle));
    kin.forEach((k) => seen.add(k.id));
    seen.add(row.finding.id);
    const kinTicket = kin.map((k) => tickets.find((t) => t.findingId === k.id)).find(Boolean);
    out.push({ ...row, ticket: row.ticket ?? kinTicket, kin });
  }
  return out;
}

export function proposedCloses(findings, tickets, cycle) {
  const goneIds = new Set(delta(findings, cycle).gone.map((f) => f.id));
  return tickets.filter((t) => t.status === "open" && goneIds.has(t.findingId));
}
