import { readFile, readdir, mkdir, writeFile, cp } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const client = path.join(root, '.sites-runtime/client');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.webmanifest': 'application/manifest+json', '.woff2': 'font/woff2' };
const assets = {};
async function visit(folder) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const filename = path.join(folder, entry.name);
    if (entry.isDirectory()) await visit(filename);
    else if (entry.isFile()) assets['/' + path.relative(client, filename).split(path.sep).join('/')] = { type: types[path.extname(filename)] || 'application/octet-stream', body: (await readFile(filename)).toString('base64') };
    else throw new Error('El build no admite symlinks.');
  }
}
await visit(client);
for (const required of ['/index.html', '/privacidad/index.html', '/terminos/index.html', '/404.html', '/sitemap.xml', '/robots.txt']) {
  if (!assets[required]) throw new Error('Falta ' + required);
}
const security = await readFile(path.join(root, 'worker/security.mjs'), 'utf8');
const worker = `${security}\nconst assets = ${JSON.stringify(assets)};\nexport default createSiteWorker(assets);\n`;
await mkdir(path.join(root, 'dist/server'), { recursive: true });
await mkdir(path.join(root, 'dist/.openai'), { recursive: true });
await writeFile(path.join(root, 'dist/server/index.js'), worker);
await cp(path.join(root, '.openai/hosting.json'), path.join(root, 'dist/.openai/hosting.json'));
const module = await import(`data:text/javascript;base64,${Buffer.from(worker).toString('base64')}`);
if (typeof module.default?.fetch !== 'function') throw new Error('Worker ESM no válido.');
console.log(`Worker ESM válido: ${Object.keys(assets).length} recursos integrados, ${(Buffer.byteLength(worker) / 1024).toFixed(0)} KiB. Sin backend de formularios.`);
