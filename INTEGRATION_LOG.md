# Integration Log

> **Write this as you go during the Week 10 lab.** Record every bug or surprise, whoever's code it was in. Don't invent bugs: if things went smoothly, say so and record what you tested on purpose. Delete this note when done.

- Upstream partner: [team name], [what their API does]
- Their base URL: [URL]
- Header name and path (from their README): [e.g. `X-API-Key`, `GET /tasks`]
- Our feature using their data: the side panel on the Browse page (`/portal.html`), fed by our route `GET /web/partner-data`
- Contacts: ours [name], theirs [name], channel [WhatsApp group]

## First call (Part B), from the terminal

- Time: [hh:mm]
- Command: `curl -i -H "X-API-Key: <our key>" <their URL><path>` (key removed)
- Status: [200 / 401 / …]
- Matches their contract? [status, field names, types, shape: plain list or wrapped]

## Deliberate tests

| Test | Expected (their contract) | What happened |
|---|---|---|
| No key | 401 | |
| Wrong key | 401 | |
| An ID that doesn't exist | 404 | |
| Field-shape check (our panel's check of `PARTNER_TITLE_FIELD`) | Panel shows data | |
| Partner server stopped (Part D) | Our page shows "Partner data is unavailable right now", our server keeps running | |
| Partner restarted | Data comes back with no code change | |

## Bugs and surprises

| # | What broke (symptom) | Root cause | Fix | Whose code, and who fixed it |
|---|---|---|---|---|
| 1 | | | | |

## Supporting our downstream partner (Part E)

Watch our server's terminal: every request prints one line with its status. Look for 401s (their key or header is wrong), 404s (a path our contract doesn't have) and 429s (they're over the rate limit).

| # | What they reported or what we saw | Root cause | Fix | Whose code, and who fixed it |
|---|---|---|---|---|
| 1 | | | | |
