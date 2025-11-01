#!/usr/bin/env node
// Simple local publish server that writes POSTed pillar HTML into public/pillars/<pillar>/<slug>.html
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PUBLISH_PORT || 4000;
const PUBLIC_DIR = path.resolve(__dirname, '../public');
// PIN protection: default '0960' but can be overridden with PUBLISH_CODE env var
const PUBLISH_CODE = String(process.env.PUBLISH_CODE || '0960');

function respondJSON(res, code, obj) {
  const s = JSON.stringify(obj);
  res.writeHead(code, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(s);
}

function sanitizeName(name) {
  return name.replace(/[^a-z0-9-_]/gi, '-').replace(/^-+|-+$/g, '').toLowerCase();
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return respondJSON(res, 200, { ok: true });

  if (req.method === 'POST' && req.url === '/publish') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', async () => {
        try {
          const data = JSON.parse(body || '{}');

          // Accept PIN from body.code or header 'x-publish-code'
          const provided = String((data.code || req.headers['x-publish-code'] || '')).trim();
          if (!provided || provided !== PUBLISH_CODE) {
            console.warn('Publish attempt with invalid code from', req.socket.remoteAddress);
            return respondJSON(res, 401, { error: 'Unauthorized: invalid publish code' });
          }

          const pillar = sanitizeName(String(data.pillar || 'app-development'));
          const slug = sanitizeName(String(data.slug || 'new-article'));
          const html = String(data.html || '');

          if (!html.trim()) return respondJSON(res, 400, { error: 'Empty html' });

          const dir = path.join(PUBLIC_DIR, 'pillars', pillar);
          await fs.promises.mkdir(dir, { recursive: true });
          const filePath = path.join(dir, `${slug}.html`);

          await fs.promises.writeFile(filePath, html, 'utf8');
          return respondJSON(res, 200, { ok: true, message: `Wrote ${path.relative(process.cwd(), filePath)}` });
        } catch (err) {
          console.error(err);
          return respondJSON(res, 500, { error: String(err) });
        }
    });
    return;
  }

  respondJSON(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`Publish server running on http://localhost:${PORT} — writes to ${path.join(PUBLIC_DIR, 'pillars')}`);
});
