# Questions on Our Upstream Partner's Contract

> **Fill this in** after reading the `openapi.yaml` you received from [upstream team]. Each question must point at a specific endpoint or field. "Looks good" or "we don't understand it" won't earn marks. Delete this note when done.

Contract received from: [upstream team], version [x.y.z], on [date]

## Question 1

- **Where:** [endpoint and field, e.g. `GET /tasks`, field `dueDate`]
- **What's unclear:** [e.g. the type is `string` with no `format`, so we can't tell if it's a date like `2026-10-25` or a timestamp like `2026-10-25T17:00:00Z`]
- **Why it matters to us:** [e.g. we sort by it, and the two formats sort differently]

## Question 2

- **Where:**
- **What's unclear:**
- **Why it matters to us:**

## Question 3

- **Where:**
- **What's unclear:**
- **Why it matters to us:**

## Where to look for good questions

- A date or status field with no `format` or `enum`
- An endpoint that only documents its success response: what happens on a 404 or a bad request?
- An object with no `required` list: which fields can be missing?
- A field name that doesn't obviously say what it holds
- Anything that doesn't match what they told you in the Week 2 interview

## Answers received

| Question | Their answer | Contract updated? |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |
