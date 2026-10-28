import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gzipSync, gunzipSync } from 'node:zlib';
// @ts-expect-error The Worker is plain ESM and tested through the same runtime entry point.
import { createSiteWorker } from '../worker/security.mjs';

const assets = Object.fromEntries([['/index.html', '<h1>Home</h1>'], ['/privacidad/index.html', '<h1>Privacidad</h1>'], ['/terminos/index.html', '<h1>Términos</h1>'], ['/404.html', '<h1>404</h1>']].map(([path, body]) => [path, { type: 'text/html; charset=utf-8', body: Buffer.from(body).toString('base64') }]));
const worker = createSiteWorker(assets);

test('HTTPS preserves the entire request destination and uses a permanent redirect', async () => {
  const response = await worker.fetch(new Request('http://example.com/privacidad/?campaign=test'));
  assert.equal(response.status, 308);
  assert.equal(response.headers.get('location'), 'https://example.com/privacidad/?campaign=test');
});
test('loopback previews do not redirect to TLS', async () => {
  assert.equal((await worker.fetch(new Request('http://127.0.0.1:4320/'))).status, 200);
});
test('unknown paths return the branded page with an actual 404 and noindex', async () => {
  const response = await worker.fetch(new Request('https://example.com/no-existe'));
  assert.equal(response.status, 404);
  assert.match(response.headers.get('x-robots-tag') || '', /noindex/);
  assert.match(await response.text(), /404/);
});
test('all HTML pages have security headers and short initial HSTS', async () => {
  for (const route of ['/', '/privacidad/', '/terminos/', '/404.html']) {
    const response = await worker.fetch(new Request('https://example.com' + route));
    assert.equal(response.headers.get('strict-transport-security'), 'max-age=86400');
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
    assert.match(response.headers.get('content-security-policy') || '', /object-src 'none'/);
    assert.equal(response.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
  }
});
test('the public website does not accept form submissions', async () => {
  const response = await worker.fetch(new Request('https://example.com/', { method: 'POST', body: 'personal data' }));
  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'GET, HEAD');
});
test('legal routes canonicalize and HEAD has no response body', async () => {
  const redirect = await worker.fetch(new Request('https://example.com/privacidad'));
  assert.equal(redirect.status, 308);
  assert.equal(redirect.headers.get('location'), '/privacidad/');
  const head = await worker.fetch(new Request('https://example.com/terminos/', { method: 'HEAD' }));
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
});
test('text compression is negotiated and respects gzip;q=0', async () => {
  const content = '<h1>Contenido comprimido</h1>';
  const compressed = createSiteWorker({ ...assets, '/index.html': { ...assets['/index.html'], body: Buffer.from(content).toString('base64'), gzip: gzipSync(content).toString('base64') } });
  const response = await compressed.fetch(new Request('https://example.com/', { headers: { 'Accept-Encoding': 'gzip, deflate, br' } }));
  assert.equal(response.headers.get('content-encoding'), 'gzip');
  assert.equal(gunzipSync(Buffer.from(await response.arrayBuffer())).toString(), content);
  const raw = await compressed.fetch(new Request('https://example.com/', { headers: { 'Accept-Encoding': 'gzip;q=0, br' } }));
  assert.equal(raw.headers.get('content-encoding'), null);
  assert.equal(await raw.text(), content);
});
