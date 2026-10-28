import http from 'node:http';
import worker from '../dist/server/index.js';
import { gzipSync } from 'node:zlib';
const port = Number(process.env.PORT || 4320);
const server = http.createServer(async (incoming, outgoing) => {
  try {
    const response = await worker.fetch(new Request(`http://127.0.0.1:${port}${incoming.url}`, { method: incoming.method, headers: incoming.headers }));
    let body = Buffer.from(await response.arrayBuffer());
    const headers = Object.fromEntries(response.headers);
    // The preview's HTTP server simulates edge transport compression. The Worker
    // itself always returns decoded resources so Sites can manage that layer.
    if (/\bgzip\b/.test(incoming.headers['accept-encoding'] || '') && /text\/|javascript|svg|xml|json/.test(headers['content-type'] || '') && body.length > 1024) {
      body = gzipSync(body, { level: 9 }); headers['content-encoding'] = 'gzip'; headers.vary = 'Accept-Encoding';
    }
    outgoing.writeHead(response.status, headers);
    outgoing.end(body);
  } catch {
    outgoing.writeHead(500).end('No se pudo atender la solicitud.');
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}/`));
