# Contract Deviations

Changes to `openapi.yaml` after the Week 4 handoff (version 1.0.0), and why. Our downstream partner built against 1.0.0, so every change here must be sent to them directly.

The current contract is **version 2.0.0**. Every path and every response field name from 1.0.0 is unchanged, so code written against 1.0.0 keeps working, apart from the two points marked **Behaviour change**.

## Changes

| # | Endpoint | What changed | Why the original didn't hold up |
|---|---|---|---|
| 1 | All except `/health` | Now require an `X-API-Key` header; `401` added to every endpoint | The API must be locked behind a key before partners integrate (Week 10). 1.0.0 had no authentication at all. |
| 2 | All except `/health` | `429` with `Retry-After` added | Protects us from a partner calling too often (Week 10 lists 429s as something to watch for). 60 requests per minute per key. |
| 3 | `GET /claims` | `status` enum widened from `[claimed]` to `[pending, claimed, rejected]` | 1.0.0 had a TODO here. The app stores all three statuses and PATCH already accepted all three, so the GET was inconsistent with the PATCH. |
| 4 | `GET /claims` | **Behaviour change:** a missing or unknown `status` now returns `400` (it used to return `200 []`) | The contract always said `status` was required; the old code didn't enforce it. A silent empty list hid caller mistakes. |
| 5 | `GET /claims` | `submittedAt` added to each claim and listed as required | The server already returned it, but 1.0.0 didn't list it, so a partner couldn't rely on it. Adding a field doesn't break existing callers. |
| 6 | `POST /claims`, `PATCH /claims/{claimId}` | Success responses now have a full schema (the created or updated claim) | 1.0.0 only had a description, so callers couldn't know the response shape. |
| 7 | `POST /claims` | `404` (unknown student or item) and `409` (item already returned, finder claiming own item, duplicate active claim) added; optional `description` field added | Building real claims against a database showed these cases. 1.0.0 accepted claims for students and items that didn't exist. |
| 8 | `PATCH /claims/{claimId}` | `409` added when another claim on the item is already approved; approving now rejects rival pending claims | Two owners for one item is impossible. 1.0.0 didn't say what approving did. |
| 9 | `GET /students/{studentId}/claims` | **Behaviour change:** a real student with no claims now gets `200 []`; `404` only for unknown students | The old code returned `404` for both, so callers couldn't tell "no claims yet" from "wrong ID". This now matches what 1.0.0's 404 description promised. |
| 10 | `GET /schools/{schoolId}/item-statistics` | `schoolName` now required; totals are calculated live | It was always returned. The old totals were fixed sample numbers. |
| 11 | `GET /claims/{claimId}/fees` | `404` can also mean "no fee has been charged on this claim yet" | Fees only exist once a claim is approved; the message distinguishes this from an unknown claim. |
| 12 | `POST /claims/{claimId}/refunds` | `amountCents` must be at least 1; `studentId` must be the claim's student; `409` added when the claim has no fee or the refund exceeds what's left of it | 1.0.0 allowed refunds of 0, negative refunds, and refunds larger than the fee. |
| 13 | `GET /claims/{claimId}/refunds` | `refundedAt` now required | Every refund has one; listing it as required tells partners they can rely on it. |
| 14 | New: `GET /health` | Public health check, no key | Lets partners check reachability before debugging their key (Week 10 debugging ladder, step 1). |

## Told our downstream partner

- [ ] Sent them openapi.yaml 2.0.0 and this file on [date], via [channel]
- [ ] Confirmed the two behaviour changes (#4, #9) don't break their code
