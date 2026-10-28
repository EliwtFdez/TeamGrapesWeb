import http from 'node:http';
import worker from '../dist/server/index.js';
const port = Number(process.env.PORT || 4320);
const server = http.createServer(async (incoming, outgoing) => {
  try {
    const response = await worker.fetch(new Request(`http://127.0.0.1:${port}${incoming.url}`, { method: incoming.method, headers: incoming.headers }));
    outgoing.writeHead(response.status, Object.fromEntries(response.headers));
    outgoing.end(Buffer.from(await response.arrayBuffer()));
  } catch {
    outgoing.writeHead(500).end('No se pudo atender la solicitud.');
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}/`));
