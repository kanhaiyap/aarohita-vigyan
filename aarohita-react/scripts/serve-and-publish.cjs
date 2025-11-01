#!/usr/bin/env node
/*
  Simple single-process server to serve the built site (or public folder)
  and accept PIN-protected POST /publish requests that write HTML files
  into public/pillars/<pillar>/<slug>.html.

  Usage:
    # serve built dist (recommended for production)
    PUBLISH_CODE=0960 node ./scripts/serve-and-publish.cjs

    # or serve directly from the project (dev-like)
    PUBLISH_CODE=0960 node ./scripts/serve-and-publish.cjs --serve-public

  Notes:
  - Default port: 4000 (PUBLISH_PORT env to override)
  - Default PIN: 0960 (PUBLISH_CODE env to override)
  - This is intended for self-hosting (VPS) where you want the site and admin on the same host.
*/

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PUBLISH_PORT || 4000;
const PUBLISH_CODE = String(process.env.PUBLISH_CODE || '0960');

const base = path.resolve(__dirname, '..');
const distDir = path.join(base, 'dist');
const publicDir = path.join(base, 'public');

const servePublicFlag = process.argv.includes('--serve-public');

// Decide where to serve static files from: prefer dist (build output), otherwise public or project root
let rootDir = distDir;
if (servePublicFlag) rootDir = publicDir;
else if (!fs.existsSync(distDir)) {
  // fallback to project root (this serves index.html at aarohita-react/index.html)
  rootDir = base;
}

function contentTypeFromExt(ext) {
  const map = {
    '.html': 'text/html; charset=UTF-8',
    '.js': 'application/javascript; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain; charset=UTF-8',
  };
  return map[ext.toLowerCase()] || 'application/octet-stream';
}

function respondJSON(res, code, obj) {
  const s = JSON.stringify(obj);
  res.writeHead(code, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
    'Access-Control-Allow-Headers': 'Content-Type, X-PUBLISH-CODE',
  });
  res.end(s);
}

function sanitizeName(name) {
  return name.replace(/[^a-z0-9-_]/gi, '-').replace(/^-+|-+$/g, '').toLowerCase();
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url || '/', true);
  const pathname = parsed.pathname || '/';

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
      'Access-Control-Allow-Headers': 'Content-Type, X-PUBLISH-CODE',
    });
    return res.end();
  }

  // Publish endpoint
  if (req.method === 'POST' && pathname === '/publish') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const data = JSON.parse(body || '{}');
        const provided = String((data.code || req.headers['x-publish-code'] || '')).trim();
        if (!provided || provided !== PUBLISH_CODE) {
          console.warn('Publish attempt with invalid code from', req.socket.remoteAddress);
          return respondJSON(res, 401, { error: 'Unauthorized: invalid publish code' });
        }

        const pillar = sanitizeName(String(data.pillar || 'app-development'));
        const slug = sanitizeName(String(data.slug || 'new-article'));
        const html = String(data.html || '');

        if (!html.trim()) return respondJSON(res, 400, { error: 'Empty html' });

        const dir = path.join(publicDir, 'pillars', pillar);
        await fs.promises.mkdir(dir, { recursive: true });
        const filePath = path.join(dir, `${slug}.html`);
        await fs.promises.writeFile(filePath, html, 'utf8');
        return respondJSON(res, 200, { ok: true, message: `Wrote ${filePath}` });
      } catch (err) {
        console.error(err);
        return respondJSON(res, 500, { error: String(err) });
      }
    });
    return;
  }

  // Serve static files from rootDir; if not found, fall back to index.html for SPA
  const safeJoin = (baseDir, requested) => {
    const decoded = decodeURIComponent(requested);
    const full = path.join(baseDir, decoded);
    if (!full.startsWith(baseDir)) return null;
    return full;
  };

  let filePath = null;
  // map '/' to index.html
  if (pathname === '/' || pathname === '') {
    filePath = path.join(rootDir, 'index.html');
  } else {
    const candidate = safeJoin(rootDir, pathname);
    if (candidate && fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      filePath = candidate;
    } else {
      // try under rootDir + pathname + '/index.html'
      const idx = safeJoin(rootDir, path.join(pathname, 'index.html'));
      if (idx && fs.existsSync(idx) && fs.statSync(idx).isFile()) filePath = idx;
    }
  }

  if (filePath) {
    const ext = path.extname(filePath);
    const ct = contentTypeFromExt(ext);
    res.writeHead(200, { 'Content-Type': ct });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
    stream.on('error', (err) => {
      console.error('Stream error', err);
      res.writeHead(500); res.end('Server error');
    });
    return;
  }

  // SPA fallback: serve index.html from dist or public or root
  const fallback = fs.existsSync(path.join(distDir, 'index.html'))
    ? path.join(distDir, 'index.html')
    : fs.existsSync(path.join(publicDir, 'index.html'))
    ? path.join(publicDir, 'index.html')
    : path.join(base, 'index.html');

  if (fs.existsSync(fallback)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    fs.createReadStream(fallback).pipe(res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Serve-and-publish running at http://localhost:${PORT}`);
  console.log(`Serving from ${rootDir}`);
  console.log(`Publishing writes to ${path.join(publicDir, 'pillars')}`);
});
