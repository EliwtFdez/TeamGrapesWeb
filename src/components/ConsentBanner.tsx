import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../site.config';
import { analytics } from '../lib/analytics';
import { readConsent, saveConsent, type ConsentChoice } from '../lib/consent';

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const firstAction = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const initial = requestAnimationFrame(() => { if (siteConfig.analytics.measurementId && readConsent() === null) setVisible(true); });
    const open = () => { setVisible(true); requestAnimationFrame(() => firstAction.current?.focus()); };
    window.addEventListener('team-grapes:privacy-preferences', open);
    return () => { cancelAnimationFrame(initial); window.removeEventListener('team-grapes:privacy-preferences', open); };
  }, []);
  if (!visible) return null;
  function choose(choice: ConsentChoice) {
    saveConsent(choice);
    analytics.consent(choice === 'granted');
    setVisible(false);
  }
  return <aside className="consent-banner" role="region" aria-labelledby="consent-title">
    <div><h2 id="consent-title">Tu privacidad también cuenta.</h2><p>{siteConfig.analytics.measurementId ? 'Sólo cargamos Google Analytics si aceptas. Puedes rechazarlo y seguir usando toda la web.' : 'La analítica está desactivada: actualmente no se carga Google Analytics. Puedes guardar tu preferencia para este navegador.'} <a href="/privacidad/">Consulta el aviso de privacidad.</a></p></div>
    <div className="consent-actions"><button ref={firstAction} className="consent-action" onClick={() => choose('granted')}>Aceptar analítica</button><button className="consent-action" onClick={() => choose('denied')}>Rechazar analítica</button></div>
  </aside>;
}
