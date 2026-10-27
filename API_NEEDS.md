# API Needs Statements

> **Before submitting:** these statements were reconstructed from the endpoints our downstream partner relies on. The rubric checks that they reflect your **actual interview**, so replace `[Downstream team]` with their name, and replace each bracketed "in order to" reason with what they really told you. Delete any need they never mentioned. Then delete this note.

Format: "[Consumer team] needs to [verb] [resource] in order to [reason]."

## 1. Rewards on returned items

"[Downstream team] needs to read a list of claims with status `claimed`, including each claim's reward amount in cents, in order to [their reason, e.g. show how much finders have been rewarded]."

- Freshness: updated within the hour is fine
- Volume: once per page load
- Auth: yes, reward amounts are financial data

## 2. A student's claim history

"[Downstream team] needs to read one student's claims with each claim's current status and submission time, in order to [their reason, e.g. show a student whether their claims are still pending]."

- Freshness: near real-time, since status changes when the finder decides
- Volume: once per page load per student
- Auth: yes, it is personal data

## 3. School-wide statistics

"[Downstream team] needs to read a school's totals of items reported, items returned, and rewards paid, in order to [their reason, e.g. display a school lost-property summary]."

- Freshness: daily is fine
- Volume: low, a few times a day
- Auth: yes, but low sensitivity (totals only)

## 4. Fees and refunds on a claim

"[Downstream team] needs to read the handling fee payable on an approved claim and every refund issued against it, in order to [their reason, e.g. show what a student still owes]."

- Freshness: near real-time
- Volume: once per claim viewed
- Auth: yes, financial data

## 5. Recording claims and decisions

"[Downstream team] needs to create a claim for a student on a found item, update its status, and withdraw it, in order to [their reason, e.g. let students claim items from inside their own app]."

- Freshness: real-time (writes)
- Volume: occasional, one call per user action
- Auth: yes, writes must be authenticated

## 6. Issuing refunds

"[Downstream team] needs to create a partial or full refund of a claim's fee, with a reason, in order to [their reason, e.g. compensate a student when a returned item was damaged]."

- Freshness: real-time (writes)
- Volume: rare
- Auth: yes, financial write

## Gaps checked against our Week 1 audit

Every need above maps to something in the audit (claims, claim status, fees and refunds, schools). No need required data our app doesn't store. [Add any gap your partner raised that we couldn't support.]

## Reflection

[Write one genuine paragraph about what surprised your team in the partner interviews. For example: a need you assumed they had that they didn't, data they expected that our app doesn't store, or how often they said they'd call us. "Nothing surprised us" will lose marks.]
