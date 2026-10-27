# Endpoint List

Every endpoint maps to a need in [API_NEEDS.md](./API_NEEDS.md). Identifiers go in the path; filters go in the query string. Nesting is at most one level.

| Method | Path | Purpose | Maps to Need |
|---|---|---|---|
| GET | `/claims?status={status}` | List claims with a given status (pending, claimed, rejected), including reward amounts | 1. Rewards on returned items |
| GET | `/students/{studentId}/claims` | List one student's claims with current status and submission time | 2. A student's claim history |
| GET | `/schools/{schoolId}/item-statistics` | Totals of items reported, items returned, and rewards paid for one school | 3. School-wide statistics |
| GET | `/claims/{claimId}/fees` | The handling fee payable on one approved claim | 4. Fees and refunds on a claim |
| GET | `/claims/{claimId}/refunds` | Every refund issued on one claim (a claim can have several) | 4. Fees and refunds on a claim |
| POST | `/claims` | Submit a new claim by a student on a found item | 5. Recording claims and decisions |
| PATCH | `/claims/{claimId}` | Set a claim's status; approving selects the item's owner | 5. Recording claims and decisions |
| DELETE | `/claims/{claimId}` | Withdraw a claim | 5. Recording claims and decisions |
| POST | `/claims/{claimId}/refunds` | Refund part or all of a claim's fee, with a reason | 6. Issuing refunds |
| GET | `/health` | Check the server is running (no key needed) | Supports every need: lets partners tell "server down" from "my bug" (added in Week 10) |

Totals: 10 endpoints, 4 of them writes (POST, PATCH, DELETE, POST).

## Design notes

- `/claims?status=claimed` uses a query parameter because status filters the claims collection; it doesn't identify one claim.
- Fees and refunds are nested under a claim because they only exist in the context of that claim.
- `item-statistics` is a noun (the statistics resource of a school), not an action like `/getStats`.
- PATCH sets an absolute status, so sending the same request twice gives the same result (idempotent).

## Peer review

> Fill this in during Part C/D. The rubric checks for visible revision: every comment either fixed or answered.

Reviewed by: [team name, not our ring partner]

| # | Reviewer's comment | What we did |
|---|---|---|
| 1 | [comment] | [Fixed: what changed] or [Kept because: one-line reason] |
| 2 | | |
| 3 | | |
