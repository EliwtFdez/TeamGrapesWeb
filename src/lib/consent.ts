export const CONSENT_KEY = 'team-grapes-consent-v1';
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export type ConsentChoice = 'granted' | 'denied';

export function openCookiePreferences() {
  window.dispatchEvent(new Event('team-grapes:privacy-preferences'));
}

export function parseConsent(value: string | null, now = Date.now()): ConsentChoice | null {
  try {
    const record = JSON.parse(value || 'null');
    if (record?.version !== 1 || !['granted', 'denied'].includes(record.analytics) || !Number.isFinite(record.updatedAt) || record.updatedAt > now || now - record.updatedAt > CONSENT_MAX_AGE) return null;
    return record.analytics;
  } catch { return null; }
}

export function readConsent(): ConsentChoice | null {
  try { return parseConsent(localStorage.getItem(CONSENT_KEY)); } catch { return null; }
}

export function saveConsent(choice: ConsentChoice) {
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ version: 1, analytics: choice, updatedAt: Date.now() })); } catch { /* Choice still applies in this tab. */ }
}
