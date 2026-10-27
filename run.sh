#!/usr/bin/env bash
# Runs the project from a clean clone. Needs Node 18+ and a running MySQL server.
set -e
cd "$(dirname "$0")"

if [ ! -f .env ]; then
  echo "No .env found. Copy .env.example to .env and fill in your MySQL password and API key first."
  exit 1
fi

npm install
npm run db:setup
npm start
