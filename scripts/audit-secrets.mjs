import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const patterns = [
  /(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}/,
  /github_pat_[A-Za-z0-9_]{40,}/,
  /AKIA[0-9A-Z]{16}/,
  /sk_(?:live|test)_[A-Za-z0-9]{20,}/,
  /sk-[A-Za-z0-9_-]{40,}/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
];
const commits = execFileSync('git', ['rev-list', '--all'], { encoding: 'utf8' }).trim().split(/\r?\n/).filter(Boolean);
const findings = new Set();
for (const commit of commits) {
  const files = execFileSync('git', ['ls-tree', '-r', '--name-only', commit], { encoding: 'utf8' }).trim().split(/\r?\n/).filter(Boolean);
  for (const file of files) {
    if (/\.(?:png|ico|woff2?|tar|gz)$/.test(file)) continue;
    const content = execFileSync('git', ['show', `${commit}:${file}`], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
    if (patterns.some((pattern) => pattern.test(content))) findings.add(`${commit.slice(0, 8)}:${file}`);
  }
}
const files = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], { encoding: 'utf8' }).trim().split(/\r?\n/).filter(Boolean);
for (const file of files) {
  if (/\.(?:png|ico|woff2?|tar|gz)$/.test(file)) continue;
  try { if (patterns.some((pattern) => pattern.test(readFileSync(file, 'utf8')))) findings.add('workspace:' + file); } catch { /* Removed tracked files are scanned in history. */ }
}
if (findings.size) {
  console.error('Posibles secretos (sólo ubicaciones; nunca valores):\n' + [...findings].join('\n'));
  process.exitCode = 1;
} else console.log(`Sin coincidencias de patrones de credenciales en ${commits.length} commits y el árbol de trabajo. Esto no sustituye secret scanning del proveedor.`);
