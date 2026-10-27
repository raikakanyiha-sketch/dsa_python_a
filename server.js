// Starts the server. Run with: npm start
const os = require('os');
const config = require('./src/config');
const app = require('./app');
const db = require('./src/db');

async function start() {
  if (config.apiKeys.length === 0) {
    console.error('No API_KEYS set in .env. Copy .env.example to .env and add at least one key.');
    process.exit(1);
  }

  try {
    await db.query('SELECT 1 FROM schools LIMIT 1');
  } catch (err) {
    console.error('Cannot use the database:', err.code || err.message);
    if (err.code === 'ER_BAD_DB_ERROR' || err.code === 'ER_NO_SUCH_TABLE') console.error('Run: npm run db:setup');
    if (err.code === 'ER_ACCESS_DENIED_ERROR') console.error('Check DB_USER and DB_PASSWORD in .env');
    if (err.code === 'ECONNREFUSED') console.error('Is MySQL running? Check DB_HOST and DB_PORT in .env');
    process.exit(1);
  }

  // Listen on all network interfaces so partners on the same Wi-Fi can reach us.
  app.listen(config.port, '0.0.0.0', () => {
    console.log(`Campus Lost and Found running at http://localhost:${config.port}`);
    console.log(`API docs:                      http://localhost:${config.port}/docs`);
    const ips = Object.values(os.networkInterfaces())
      .flat()
      .filter((i) => i && i.family === 'IPv4' && !i.internal)
      .map((i) => i.address);
    for (const ip of ips) console.log(`Partners on your network use:  http://${ip}:${config.port}`);
    if (!config.partner.url) console.log('Upstream partner not configured yet (PARTNER_URL in .env).');
  });
}

start();
