import { openCookiePreferences } from '../lib/consent';

export function SiteFooter() {
  return <nav className="legal-links" aria-label="Información legal"><a href="/privacidad/">Privacidad</a><a href="/terminos/">Términos y condiciones</a><button type="button" onClick={openCookiePreferences}>Preferencias de cookies</button></nav>;
}
