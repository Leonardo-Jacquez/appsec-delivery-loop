# Manual cycle (no model)

This is the job as it is done today. Do this once on Harbor Cart before
turning assist on.

## 1. Open the consoles

For each tool in the account (Snyk, Checkmarx, Invicti, Wiz, bounty intake):

- Copy or export **open** findings for the apps in scope
- Keep vendor IDs. Do not rename them.

In this repo that step is already done: `fixtures/harbor-cart.json`.

## 2. Diff last month (script, not memory)

```bash
node scripts/delta.mjs sep
```

You get **still / new / gone** by vendor ID.

- **Still** — was open last cycle, still open. Chase or re-state.
- **New** — first seen this cycle. Triage.
- **Gone** — missing from this export. **Not a close.** Propose a close only
  with evidence (scan id, last-seen, code gone, 404, lockfile bump).

August has no gone list. It is the baseline.

## 3. Build the working list (script)

```bash
node scripts/worklist.mjs sep
```

Rules (deterministic — do not override with a “gut model”):

- Drop SCA / Wiz items with `reachable: false`
- Drop `low` / `info`
- Rank: critical → high → medium; proven live beats unproven; reachable beats unknown
- Collapse related IDs into **one** ticket (SAST sink + DAST proof)

You may still **drop** remaining noise by hand (admin-only false positive,
bounty with no PoC). That is a human decision, recorded as `drop`.

## 4. Tickets a developer can use

Each shipped item gets one ticket (or a comment on the existing one):

- Finding ID
- File or route
- One next action (fix, waive, or “already on HARBOR-nnn”)

Do not open a second ticket for the Invicti proof of a Checkmarx sink.

## 5. Propose closes

For seed tickets whose finding is **gone**:

- `HARBOR-88` open redirect — September crawl 404, route removed
- `HARBOR-91` colors protestware — removed from lockfile

Write the evidence **in the comment**, then transition. Customer owns Jira.

## 6. Packet, then sign

Short story of the month:

- Scripted delta counts (copy, do not re-count in prose)
- Sprint list (the worklist, not the raw queue)
- Coverage gaps you actually observed (example: DAST still blocked on review POST;
  batch image not on the storefront path)

Sign only if you would send it.

## Expected Harbor Cart moves (September)

These are in the fixture so you can check yourself. They are not a live scan.

| Do | Don’t |
| --- | --- |
| Ship proven SQLi (`INV-SQLI-PRODUCTS` + `CX-SQLI-PRODUCTS`) as **one** ticket (`HARBOR-104` already exists) | Open a second SQLi ticket |
| Ship hardcoded JWT + new reachable `jsonwebtoken` as related | Treat lockfile-only `minimist` as sprint work |
| Ship Wiz public S3 + env key (same API) | Rank the offline batch image with the storefront |
| Ship bounty IDOR **with PoC** | Accept the homepage XSS claim with no payload |
| Drop Checkmarx admin debug XSS (stripped in production) | Close `HARBOR-88` / `HARBOR-91` with no comment |
