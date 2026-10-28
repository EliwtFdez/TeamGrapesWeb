import { forwardRef, useRef, useState, useImperativeHandle } from 'react';
import { m as motion } from 'motion/react';
import { briefText, buildMailto, canOpenContact } from '../lib/contact';
import { analytics } from '../lib/analytics';

export interface BriefDialogHandle { open: () => void }

export const BriefDialog = forwardRef<BriefDialogHandle>(function BriefDialog(_, ref) {
  const dialog = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const openedAt = useRef(0);
  const [status, setStatus] = useState('');
  useImperativeHandle(ref, () => ({ open: () => { openedAt.current = Date.now(); setStatus(''); dialog.current?.showModal(); } }), []);

  function text() {
    const fields = new FormData(form.current!);
    return briefText(String(fields.get('name')), String(fields.get('type')), String(fields.get('idea')));
  }
  function download() {
    const url = URL.createObjectURL(new Blob([text()], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Mi-idea-para-Team-Grapes.txt';
    link.click();
    analytics.event('brief_download');
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('Brief descargado. Ya puedes compartirlo por el canal que acuerden con el team.');
  }
  async function copy() {
    if (!form.current?.reportValidity()) return;
    try {
      await navigator.clipboard.writeText(text());
      analytics.event('brief_copy');
      setStatus('Texto copiado. Está listo para compartir; todavía no se ha enviado.');
    } catch {
      setStatus('El navegador no permitió copiar. Puedes descargar el brief.');
    }
  }
  function openEmail() {
    if (!canOpenContact(String(new FormData(form.current!).get('website') || ''), openedAt.current)) {
      setStatus('Revisa tu propuesta y vuelve a intentarlo en un momento.');
      return;
    }
    const mailto = buildMailto(text());
    if (mailto.length > 6500) { setStatus('La propuesta es larga para abrirla por correo. Descarga el brief y adjúntalo a tu mensaje.'); return; }
    analytics.event('contact_email_open');
    window.location.href = mailto;
    setStatus('Se solicitó abrir tu aplicación de correo. Revisa el borrador y envíalo allí; la web no envía mensajes automáticamente. Si no se abre, puedes copiar o descargar el brief.');
  }
  return (
    <dialog ref={dialog} id="brief-dialog" aria-labelledby="brief-title" onClick={(event) => {
      if (event.target !== dialog.current) return;
      const box = dialog.current.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.current.close();
    }}>
      <form ref={form} id="brief-form" onSubmit={(event) => { event.preventDefault(); openEmail(); }}>
        <div className="dialog-top"><span className="eyebrow">EL SIGUIENTE «¿Y SI…?»</span><button className="close-dialog" type="button" aria-label="Cerrar formulario" onClick={() => dialog.current?.close()}>×</button></div>
        <h2 id="brief-title">Dale forma a tu <span className="serif">idea.</span></h2>
        <p>Cuéntanos qué imaginas. Abriremos un borrador en tu aplicación de correo para que lo revises y lo envíes al team.</p>
        <div className="contact-trap" aria-hidden="true"><label htmlFor="brief-website">Deja este campo vacío<input id="brief-website" name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <label htmlFor="brief-name">Tu nombre<input id="brief-name" name="name" autoComplete="name" maxLength={100} required placeholder="¿Cómo te llamas?" /></label>
        <label htmlFor="brief-type">¿Qué quieres crear?<select id="brief-type" name="type"><option>Un videojuego</option><option>Software / una app / una web</option><option>Un prototipo de mecatrónica</option><option>Algo que todavía no tiene categoría</option></select></label>
        <label htmlFor="brief-idea">Cuéntanos la idea<textarea id="brief-idea" name="idea" rows={4} minLength={10} maxLength={3000} required placeholder="Qué imaginas, para quién es y qué te gustaría lograr…" /></label>
        <p className="brief-privacy">Consulta nuestro <a href="/privacidad/">aviso de privacidad</a> antes de compartir datos. Abrir el correo no envía la propuesta.</p>
        <div className="brief-actions"><motion.button whileTap={{ scale: 0.97 }} type="submit" className="button button-lime">Abrir correo ↗</motion.button><button type="button" className="small-button" onClick={() => { if (form.current?.reportValidity()) download(); }}>Descargar brief ↓</button><button type="button" id="copy-brief" className="small-button" onClick={copy}>Copiar texto</button></div>
        <p id="brief-status" role="status" aria-live="polite">{status}</p>
      </form>
    </dialog>
  );
});
