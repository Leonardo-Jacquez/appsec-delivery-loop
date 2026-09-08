# AI assist (after one manual cycle)

Assist is **drafting**, not delivery. The control plane stays:

official extract → store → allowlisted query / script → **draft** → human → hooked write.

In this analog the “extract” is the fixture, the “store” is the JSON, the
“query” is `scripts/delta.mjs` + `scripts/worklist.mjs`, and the “write” is
the human pasting into Jira / the packet.

## Allowed

A model may draft, **from fields already in context**:

- A triage note (why ship / drop / already)
- Ticket body (file, ID, one next action)
- Close comment (only if evidence fields are present)
- Packet narrative that **repeats** scripted counts

Caps: small prompt, `max_tokens` ≤ 500, user-initiated only. No loop. No
page-load call.

## Forbidden

- Tally still / new / gone (the script already did)
- Rank the worklist
- Invent a CVE, file, scan id, or coverage claim
- Mark a ticket closed
- Talk to Jira, Snyk, Checkmarx, Invicti, or Wiz
- “Fix the code” as a substitute for a ticket the developer can use

If a field is missing, the draft says it is missing. It does not guess.

## How we test assist vs manual

Same September fixture.

1. Manual cycle → signed packet A. Time-to-sign and pain scores.
2. Reset. Assist on → signed packet B. Same decisions, less typing.
3. Diff A vs B. If B invents facts, assist failed — keep Manual.
4. If B is the same list with cleaner sentences, assist is leverage **inside
   the existing SOW**, not a new SKU.

We do not invoice the customer for our typing speed.
