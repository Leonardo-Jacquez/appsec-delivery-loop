# Analog — what we emulate, what we don’t

Built from **public** AppSec-as-a-Service language (SAST / SCA / DAST, triage,
tickets, reporting; Basic / Standard / Premium shape) plus common delivery
practice. **Not** from a live SOW, a live Jira project, or a live tool tenant.

## We emulate

| Reality | Analog |
| --- | --- |
| Monthly ASaaS cycle on customer-licensed tools | Harbor Cart, Standard tier |
| SAST | Checkmarx-shaped findings |
| SCA + reachability | Snyk-shaped findings; `reachable: false` is dropped from the sprint list |
| DAST, including proven vs hygiene | Invicti-shaped findings; `proven: true` ranks higher |
| Cloud/code adjacent (same apps) | Wiz-shaped findings on the same API; offline batch image is **not** sprint work |
| Bug bounty **intake** (hunters find; we triage the report) | Two reports: one with PoC, one with none |
| Tickets in **customer** Jira; delivery engineer comments and transitions | Project `HARBOR`; GPS-analog cannot change workflow |
| Update packet the engineer signs | Packet page / `run-cycle.mjs` skeleton |
| Same bug in two tools = one ticket | `CX-SQLI-PRODUCTS` + `INV-SQLI-PRODUCTS` |
| Gone from export ≠ fixed | `HARBOR-88` open redirect, `HARBOR-91` colors — need evidence to close |

## We do not emulate (and will not fake)

- Live customer names, exports, or Jira
- Vendor logos, tenants, or API keys
- Wiz as if we owned the tenant
- Hours as the sell unit
- A model that “closes” tickets
- A new system of record the customer must log into
- Bug-bounty **hunting** (we are not the hunter)

## Account card (Harbor Cart)

- Stack: Node + Angular storefront (OWASP Juice Shop analog)
- Customer licensed Snyk, Checkmarx One, Invicti
- Delivery engineer operates the consoles
- Adjacent: Wiz Secure Code-style findings that land on the same apps
- Bounty: intake queue, not a GPS-run hunting program
- First month: August (baseline). Test month: September.

If a real engagement’s tools, Jira ownership, or SOW differ, **change the
fixture**. Do not pretend this analog is the customer.
