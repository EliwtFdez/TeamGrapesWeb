export const isLoopback = (hostname) => hostname === 'localhost' || hostname.endsWith('.localhost') || hostname === '127.0.0.1' || hostname === '[::1]';

export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: https://www.google-analytics.com https://*.google-analytics.com",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "frame-ancestors 'none'",
].join('; ');

export function securityHeaders(secure = true) {
  const headers = new Headers({
    'Content-Security-Policy': CONTENT_SECURITY_POLICY,
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'DENY',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  });
  // One day, without includeSubDomains/preload, until the final domain is verified.
  if (secure) headers.set('Strict-Transport-Security', 'max-age=86400');
  return headers;
}

/** Pure request handler shared by the Worker and its production-equivalent preview. */
export function createSiteWorker(assets) {
  return { async fetch(request) {
    const url = new URL(request.url);
    const headers = securityHeaders(url.protocol === 'https:');
    if (url.protocol === 'http:' && !isLoopback(url.hostname)) {
      url.protocol = 'https:';
      headers.set('Location', url.href);
      return new Response(null, { status: 308, headers });
    }
    if (!['GET', 'HEAD'].includes(request.method)) {
      headers.set('Allow', 'GET, HEAD');
      return new Response(null, { status: 405, headers });
    }
    if (['/privacidad', '/terminos'].includes(url.pathname)) {
      url.pathname += '/';
      headers.set('Location', url.pathname + url.search);
      return new Response(null, { status: 308, headers });
    }
    let pathname;
    try { pathname = decodeURIComponent(url.pathname); } catch { return new Response('Ruta no válida', { status: 400, headers }); }
    const aliases = { '/': '/index.html', '/privacidad/': '/privacidad/index.html', '/terminos/': '/terminos/index.html' };
    const key = aliases[pathname] || pathname;
    const exists = Object.hasOwn(assets, key);
    const record = exists ? assets[key] : assets['/404.html'];
    if (!record) return new Response('No encontrado', { status: 404, headers });
    headers.set('Content-Type', record.type);
    const notFound = !exists || key === '/404.html';
    headers.set('Cache-Control', notFound ? 'no-store' : key.endsWith('.html') ? 'no-cache' : /\/assets\/.+-[\w-]{8,}\./.test(key) ? 'public, max-age=31536000, immutable' : 'public, max-age=604800');
    if (notFound) headers.set('X-Robots-Tag', 'noindex, nofollow');
    // Sites owns transport encoding. Returning precompressed bytes through its
    // response proxy can lose Content-Encoding and expose gzip bytes as HTML.
    const data = Uint8Array.from(atob(record.body), (char) => char.charCodeAt(0));
    return new Response(request.method === 'HEAD' ? null : data, { status: notFound ? 404 : 200, headers });
  } };
}
