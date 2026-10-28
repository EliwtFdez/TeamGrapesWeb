import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AnalyticsClient, safePagePath } from '../src/lib/analytics.ts';
import { parseConsent, CONSENT_MAX_AGE } from '../src/lib/consent.ts';
import { buildMailto, canOpenContact } from '../src/lib/contact.ts';
import { defineSiteConfig } from '../src/site.config.ts';

function harness(id = 'G-TEST123456') {
  const calls: unknown[][] = [], loads: string[] = [], disables: boolean[] = [];
  const client = new AnalyticsClient(id, 'https://example.com', { queue: (...args) => calls.push(args), load: (id) => loads.push(id), disable: (_, disabled) => disables.push(disabled), clearCookies() {}, pathname: () => '/?email=private@example.com' });
  return { client, calls, loads, disables };
}
test('no ID means no Google tag or events, including after accepting', () => {
  const { client, calls, loads } = harness('');
  client.consent(true); client.event('brief_open');
  assert.equal(loads.length, 0); assert.equal(calls.length, 0);
});
test('before opt-in and after rejecting there is no script or event', () => {
  const { client, calls, loads } = harness();
  client.event('brief_open'); client.consent(false); client.event('game_start');
  assert.equal(loads.length, 0); assert.equal(calls.length, 0);
});
test('opt-in sets denied defaults first, keeps advertising denied and drops unknown fields', () => {
  const { client, calls, loads } = harness();
  client.consent(true);
  client.event('brief_open', { location: 'hero', email: 'private@example.com', idea: 'secret idea' } as never);
  assert.deepEqual(calls[0], ['consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }]);
  assert.equal(loads.length, 1);
  assert.doesNotMatch(JSON.stringify(calls), /private@example|secret idea|\?email/);
  assert.match(JSON.stringify(calls), /allow_google_signals.*false/);
});
test('withdrawing consent blocks future events and permits a later explicit opt-in', () => {
  const { client, calls, loads, disables } = harness();
  client.consent(true); client.consent(false);
  const count = calls.length;
  client.event('brief_download');
  assert.equal(calls.length, count); assert.equal(disables.at(-1), true);
  client.consent(true);
  assert.equal(loads.length, 2); assert.equal(disables.at(-1), false);
});
test('consent expires and invalid or future consent is denied', () => {
  const now = 2000000000000;
  assert.equal(parseConsent(JSON.stringify({ version: 1, analytics: 'granted', updatedAt: now - 1 }), now), 'granted');
  for (const value of ['invalid', null, JSON.stringify({ version: 1, analytics: 'granted', updatedAt: now - CONSENT_MAX_AGE - 1 }), JSON.stringify({ version: 1, analytics: 'granted', updatedAt: now + 1 })]) assert.equal(parseConsent(value, now), null);
});
test('analytics paths cannot contain a visitor-provided query or arbitrary route', () => {
  assert.equal(safePagePath('/privacidad/'), '/privacidad/');
  assert.equal(safePagePath('/person/private@example.com'), '/404.html');
});
test('mailto only creates a draft and safely encodes visitor text', () => {
  const mail = buildMailto('Idea & destinatario=otro@example.com\nHola');
  assert.match(mail, /^mailto:shadowkadizz@gmail\.com\?subject=/);
  assert.match(mail, /%26/); assert.match(mail, /%0A/);
  assert.doesNotMatch(mail, /\n/);
  assert.equal(canOpenContact('', 1000, 2500), true);
  assert.equal(canOpenContact('bot', 1000, 3000), false);
  assert.equal(canOpenContact('', 1000, 1100), false);
});
test('build settings reject insecure domains and fake analytics IDs', () => {
  assert.throws(() => defineSiteConfig({ VITE_SITE_URL: 'http://example.com' }));
  assert.throws(() => defineSiteConfig({ VITE_SITE_URL: 'https://example.com/?token=secret' }));
  assert.throws(() => defineSiteConfig({ VITE_GA_MEASUREMENT_ID: 'not-a-property' }));
  assert.equal(defineSiteConfig().analytics.measurementId, '');
});
