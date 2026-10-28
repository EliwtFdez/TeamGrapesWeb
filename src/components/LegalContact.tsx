import { useState } from 'react';
import { buildMailto, contactAddress } from '../lib/contact';

export function LegalContact() {
  const [revealed, setRevealed] = useState(false);
  return <span className="legal-contact">{revealed ? <a href={buildMailto('', 'Solicitud de privacidad / Team Grapes')}>{contactAddress()}</a> : <button type="button" className="legal-contact-button" onClick={() => setRevealed(true)}>Mostrar correo de contacto</button>}</span>;
}
