# AppSec delivery loop

Training protocol for **one month** of AppSec-as-a-Service delivery.

Harbor Cart is a Juice Shop analog (Node + Angular storefront). This repo is
**not affiliated with any employer**. No customer data, no vendor tenants, no
logos.

The interactive bench is Cycle Desk (same fixtures). This repo is the portable
source of truth: how the month is done by hand, where a model is allowed to
help, and how we score whether the loop actually works.

## Why this exists

We need a way to **test the delivery loop** before anyone talks SKU, hours, or
platform.

Customer pains we will score (not GPS cost, not click-count):

1. The fix list is unusable — too long, too many fakes, no “do this first.”
2. Last month and this month don’t line up — they can’t see what actually closed.
3. Developers get tickets they can’t act on — no file, no “why us.”
4. They bought scanners and still feel uncovered — tools aren’t becoming decisions.
5. They’re shipping AI-written code and AppSec is the bottleneck *(not modeled in v1 fixtures).*

If none of 1–4 show up on a **real** engagement, there is no extra invoice line.
There is only a better way to deliver the existing contract.

## How to test (two cycles, same account)

1. **August** is the baseline (first month on the analog). Fixtures already include it.
2. **September** is the test month: delta, triage, tickets, closes, packet.
3. Run September **once by hand** (`node scripts/run-cycle.mjs sep`).
4. Run it again using only the fields the script prints, with a model **drafting sentences**. The model does not tally, rank, or write the ticket.
5. Score the four pains on the packet. Sign only if a human would send it.

```bash
node scripts/run-cycle.mjs sep
node --test scripts/delta.test.mjs
```

## Layout

| Path | What |
| --- | --- |
| [docs/analog.md](docs/analog.md) | What we emulate. What we invented. What we refuse to fake. |
| [docs/manual-cycle.md](docs/manual-cycle.md) | How the month is done with no model. |
| [docs/ai-assist.md](docs/ai-assist.md) | Where a model may draft. Where it may not. |
| [protocol/RULES.md](protocol/RULES.md) | Hard rules (counts, writes, reachability, bounty). |
| [fixtures/harbor-cart.json](fixtures/harbor-cart.json) | Account, findings, seed tickets. |
| [scripts/](scripts/) | Deterministic delta + worklist. No LLM. |

## What this is not

A scanner. A system of record. A SKU. A Jira replacement. A Wiz tenant.
A bug-bounty hunting program (intake only). A way to invoice someone for our
own typing speed.
