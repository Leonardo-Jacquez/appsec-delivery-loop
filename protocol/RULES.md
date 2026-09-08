# Hard rules

1. **Scanners stay.** This loop does not replace Snyk, Checkmarx, Invicti, or Wiz.
2. **Scripts count.** `still` / `new` / `gone` and the ranked worklist are deterministic. A model does not compute them.
3. **Reachability is an engine field.** SCA/Wiz `reachable: false` is excluded from the sprint list. Present-in-lockfile is not “in prod.”
4. **Proven live ranks.** DAST/bounty with a PoC outranks an unproven SAST hit of the same CWE, but related IDs collapse to one ticket.
5. **Gone ≠ fixed.** Propose close only with evidence in the comment.
6. **Human on writes.** No unattended Jira transition, no unattended packet send.
7. **Bounty is intake.** We triage reports. We do not hunt.
8. **Customer owns Jira.** We comment and transition inside their workflow.
9. **No fake tenants.** Fixtures only, until a real export is in the store.
10. **No hours SKU.** If the packet is the same as today, this is delivery leverage, not a new line item.
11. **Don’t invoice internal efficiency.** Faster clicks are GPS-analog cost, not customer value.
12. **Don’t invent a system of record.** Signed working list + helper. The tools and Jira remain the systems.
