// SPDX-License-Identifier: Apache-2.0
// Tests of the project rules of contracts/.spectral.yaml.
// - valid/*.yaml must produce no result at all;
// - each invalid/*.yaml declares, on a line "# expect: rule-a, rule-b", the rules it must trigger.
// The documents are linted in a temporary directory next to a copy of events/envelope.json.
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, readdirSync, readFileSync, realpathSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const contracts = join(here, '..');
const spectral = join(contracts, 'node_modules', '@stoplight', 'spectral-cli', 'dist', 'index.js');
const ruleset = join(contracts, '.spectral.yaml');

function lint(file) {
  // Long path: a Windows short name ("~1") would be read as a JSON Pointer escape.
  const work = mkdtempSync(join(realpathSync.native(tmpdir()), 'kicksaas-rules-'));
  try {
    copyFileSync(join(contracts, 'events', 'envelope.json'), join(work, 'envelope.json'));
    const target = join(work, 'document.yaml');
    copyFileSync(file, target);
    let out;
    try {
      out = execFileSync(process.execPath, [spectral, 'lint', target, '--ruleset', ruleset, '--format', 'json', '--quiet'], { encoding: 'utf8' });
    } catch (error) {
      out = error.stdout; // Spectral exits with 1 when it finds results.
    }
    return JSON.parse(out || '[]');
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}

let failures = 0;
for (const name of readdirSync(join(here, 'valid')).filter((n) => n.endsWith('.yaml'))) {
  const results = lint(join(here, 'valid', name));
  if (results.length > 0) {
    failures += 1;
    console.error(`FAIL valid/${name}: ${results.map((r) => `${r.code} at ${r.path.join('.')}`).join('; ')}`);
  } else {
    console.log(`ok   valid/${name}`);
  }
}
for (const name of readdirSync(join(here, 'invalid')).filter((n) => n.endsWith('.yaml'))) {
  const file = join(here, 'invalid', name);
  const line = readFileSync(file, 'utf8').split('\n').find((l) => l.startsWith('# expect:'));
  const expected = line ? line.slice('# expect:'.length).split(',').map((s) => s.trim()).filter(Boolean) : [];
  const codes = new Set(lint(file).map((r) => r.code));
  const missing = expected.filter((code) => !codes.has(code));
  if (expected.length === 0 || missing.length > 0) {
    failures += 1;
    console.error(`FAIL invalid/${name}: not triggered: ${missing.join(', ') || '(no expectation declared)'}`);
  } else {
    console.log(`ok   invalid/${name}`);
  }
}
process.exit(failures === 0 ? 0 : 1);
