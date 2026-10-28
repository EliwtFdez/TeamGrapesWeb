import { createServer } from 'vite';
import { readFile, writeFile } from 'node:fs/promises';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.tsx');
  for (const [file, route] of [['index.html', '/'], ['privacidad/index.html', '/privacidad/'], ['terminos/index.html', '/terminos/'], ['404.html', '/404.html']]) {
    const filename = '.sites-runtime/client/' + file;
    const html = await readFile(filename, 'utf8');
    const content = render(route);
    if (!content.includes('<h1')) throw new Error('La página debe incluir un título sin depender de JavaScript: ' + route);
    await writeFile(filename, html.replace('<div id="root"></div>', `<div id="root">${content}</div>`));
  }
  console.log('Cuatro páginas React prerenderizadas e hidratables.');
} finally { await server.close(); }
