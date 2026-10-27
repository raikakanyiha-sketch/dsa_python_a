# Partner Test Results

## Our own automated tests

Run with `npm test` (Jest + Supertest, against a separate test database). Every endpoint in `openapi.yaml` is covered for:

- **Happy path**, with strong assertions: exact field names, types, and no extra fields (`__tests__/helpers.js` checks each response's keys against the contract)
- **Validation**: missing fields, wrong types, empty strings, decimals and zero where integers are required, invalid JSON
- **Not found**: IDs that don't exist and malformed IDs
- **Edge cases**: empty lists, a school with nothing claimed, refunding exactly the remaining fee (allowed) and one cent more (rejected), idempotent PATCH, deleting twice
- **Security**: missing and wrong keys, rate limit per key, CORS preflight
- **Website flows**: accounts, search, reporting with photos, claims with evidence, choosing the owner, notifications, profile, and the upstream partner panel (up, down, wrong key, renamed field)

Check the assertions are strong enough: rename a field in `src/mappers.js` (for example `rewardAmountCents`) and run `npm test`. Several tests should fail. Change it back afterwards.

---

> **Fill in the rest after the exchange.** Record what actually happened, including "all passed", which is a real result. Delete this note when done.

## Exchange

- Ring partner: [team name]
- We sent them: `openapi.yaml` version [x.y.z] (not our test files), on [date]
- They ran their tests against: [our URL, e.g. http://10.53.50.111:3000], on [date]
- We wrote tests from their contract in: [file, e.g. `__tests__/partner/<their-api>.test.js`] and ran them against [their URL]

## What their tests found in our API

| # | Their test | What happened | Classification | What we did |
|---|---|---|---|---|
| 1 | [e.g. GET /claims without status expects 200] | [e.g. got 400] | Real bug / Contract ambiguity / Misunderstanding | [Fixed in code / clarified contract / explained to them] |

## What our tests found in their API

| # | Our test | What happened | Classification | What they did |
|---|---|---|---|---|
| 1 | | | | |

Classifications:
- **Real bug:** the implementation doesn't match its own contract. Fix it.
- **Contract ambiguity:** the contract allowed two reasonable readings. Clarify the contract.
- **Misunderstanding:** the test expected something the contract never promised. Explain it to them.
