// Builds the Express app (website + website JSON API + partner API) without starting it.
// server.js starts it; the tests import it directly: const app = require('../app');
const fs = require('fs');
const path = require('path');
const express = require('express');
const config = require('./src/config');
const { loadSession } = require('./src/middleware/session');
const { createRateLimiter, requestLogger } = require('./src/middleware/security');
const { errorHandler } = require('./src/errors');
const registerWebRoutes = require('./src/routes/web');
const registerUpstream = require('./src/routes/upstream');
const registerPartnerApi = require('./src/routes/partnerApi');

function createApp({ rateLimitPerMinute = config.rateLimitPerMinute, logRequests = process.env.NODE_ENV !== 'test' } = {}) {
  const app = express();
  app.disable('x-powered-by');

  // Basic browser security headers on every response.
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'same-origin');
    next();
  });

  // ---- The website (static files) ----
  app.use(express.static(path.join(__dirname, 'public')));
  // Item photos are public to the site; claim evidence (uploads/evidence) is NOT served here.
  app.use('/uploads/items', express.static(path.join(config.uploadDir, 'items')));

  // ---- API docs (Swagger UI) at /docs ----
  const sendContract = (req, res) => {
    res.setHeader('Content-Type', 'text/yaml; charset=utf-8');
    res.end(fs.readFileSync(path.join(__dirname, 'openapi.yaml')));
  };
  app.get('/openapi.yaml', sendContract);
  app.get('/docs/openapi.yaml', sendContract);
  app.use('/docs', express.static(path.join(__dirname, 'docs')));

  if (logRequests) app.use(requestLogger);
  app.use(express.json({ limit: '8mb' })); // room for a 5 MB file sent as base64

  // Public health check: lets partners confirm the server is up without a key.
  app.get('/health', (req, res) => res.json({ status: 'ok' }));

  // ---- Website JSON API (session cookie) ----
  app.use('/web', loadSession);
  registerWebRoutes(app);
  registerUpstream(app);

  // ---- Partner API (X-API-Key + rate limit), defined by openapi.yaml ----
  registerPartnerApi(app, { rateLimit: createRateLimiter(rateLimitPerMinute) });

  // Unknown paths: a friendly page for browsers, JSON for everything else.
  app.use((req, res) => {
    if (req.method === 'GET' && (req.headers.accept || '').includes('text/html')) {
      res.status(404);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.end(fs.readFileSync(path.join(__dirname, 'public', '404.html')));
    }
    res.status(404).json({ error: `no route for ${req.method} ${req.path}` });
  });

  app.use(errorHandler);
  return app;
}

const app = createApp();
module.exports = app;
module.exports.createApp = createApp;
