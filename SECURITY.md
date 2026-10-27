# Security

How the Prestige Lost & Found API and website are protected.

> Week 9 was presentations, so there was no lab handout for security. The Week 10 handout expects the API to already be "locked behind a key" with a rate limit and secrets kept out of code; this file records how that is done.

## Partner API

| Threat | Protection | Where |
|---|---|---|
| Anyone who reads our public docs can call the API | Every route except `/health` needs an `X-API-Key` header; missing or wrong key gives `401` | `src/middleware/security.js` |
| Guessing a key by timing the responses | Keys are compared in constant time | `keyMatches()` in the same file |
| One partner flooding us (by accident or not) | 60 requests per minute per key; over that gives `429` with `Retry-After` | `createRateLimiter()` |
| Keys leaking through the code or git | Keys live only in `.env`, which `.gitignore` excludes; `.env.example` holds placeholders | `.env.example`, `.gitignore` |
| Keys leaking through logs | The request log records method, path, status and time only, never headers or bodies | `requestLogger()` |
| Browser preflight blocked by the key check | CORS runs before the key check, and only for origins listed in `CORS_ORIGINS` | `cors()` |
| Bad input reaching the database | Every write validates presence, type and value before writing; all SQL uses `?` placeholders, never string-built values | `src/routes/partnerApi.js` |
| Internal details leaking in errors | Unexpected errors return a generic `500 {"error":"internal server error"}`; details go to the server log only. The `X-Powered-By` header is turned off. | `src/errors.js`, `app.js` |

Each partner team gets its own key, so one key can be replaced without affecting the others. To replace a key: generate a new one, swap it in `API_KEYS`, restart, and send the new key to that team privately.

## Website

| Threat | Protection |
|---|---|
| Stolen passwords | Passwords are hashed with scrypt and a random salt per user; the plain password is never stored or returned |
| Finding out which emails have accounts | A wrong email and a wrong password give the same `401` message |
| Stolen session cookies | The cookie is `HttpOnly` (JavaScript can't read it) and `SameSite=Lax` (not sent on cross-site form posts); the database stores only a SHA-256 hash of the token; sessions expire after 7 days and are deleted on logout |
| Seeing another school's items | Every website query is limited to the logged-in student's school |
| Acting on someone else's claim or item | Only the finder can decide claims or remove an item; only the claimant can withdraw a claim (`403` otherwise) |
| Claim evidence being public | Evidence files are stored outside the public folder and served only to the claimant and the finder; item photos are the only public uploads |
| Malicious uploads | Files are limited to 5 MB, their real type is checked from their first bytes (JPG, PNG, GIF, WEBP, and PDF for evidence), and they get random names |
| Script injection in pages | Every piece of user text is HTML-escaped before it's put on a page; responses send `X-Content-Type-Options: nosniff` and `X-Frame-Options: DENY` |
| Partner's key exposed in our pages | Our server calls the upstream partner; the browser only ever calls our own server |

## Known limits

- The site runs over plain HTTP on the lab network, so traffic (including the key and session cookie) is not encrypted. A real deployment needs HTTPS.
- Rate-limit counters are kept in memory and reset when the server restarts.
- There is no lockout after repeated failed logins.
