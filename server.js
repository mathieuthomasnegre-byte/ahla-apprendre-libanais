// Petit serveur local sans dépendance : sert les fichiers de l'appli sur http://localhost:5173
// Écoute uniquement sur cette machine (127.0.0.1).

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = __dirname;
const PORT = 5173;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
};
const PUBLIC = ['index.html', 'css', 'js'];

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const rel = path.normalize(urlPath === '/' ? 'index.html' : urlPath.slice(1));
    const file = path.join(ROOT, rel);
    const allowed = PUBLIC.includes(rel.split(path.sep)[0]) && file.startsWith(ROOT + path.sep);
    if (!allowed || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Introuvable');
      return;
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, '127.0.0.1', () => console.log(`Appli disponible sur http://localhost:${PORT}`));
