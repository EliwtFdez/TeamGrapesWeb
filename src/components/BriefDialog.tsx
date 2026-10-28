import { forwardRef, useRef, useState, useImperativeHandle } from 'react';
import { motion } from 'motion/react';

export interface BriefDialogHandle { open: () => void }

export const BriefDialog = forwardRef<BriefDialogHandle>(function BriefDialog(_, ref) {
  const dialog = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState('');
  useImperativeHandle(ref, () => ({ open: () => dialog.current?.showModal() }), []);

  function text() {
    const fields = new FormData(form.current!);
    return `IDEA PARA TEAM GRAPES\n\nDe: ${String(fields.get('name')).trim()}\nQuiero crear: ${fields.get('type')}\n\nLa idea:\n${String(fields.get('idea')).trim()}\n\nPreparado en la web de Team Grapes. Este documento no se ha enviado.\n`;
  }
  function download() {
    const url = URL.createObjectURL(new Blob([text()], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Mi-idea-para-Team-Grapes.txt';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('Brief descargado. Ya puedes compartirlo por el canal que acuerden con el team.');
  }
  async function copy() {
    if (!form.current?.reportValidity()) return;
    try {
      await navigator.clipboard.writeText(text());
      setStatus('Texto copiado. Está listo para compartir; todavía no se ha enviado.');
    } catch {
      setStatus('El navegador no permitió copiar. Puedes descargar el brief.');
    }
  }
  return (
    <dialog ref={dialog} id="brief-dialog" aria-labelledby="brief-title" onClick={(event) => {
      if (event.target !== dialog.current) return;
      const box = dialog.current.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.current.close();
    }}>
      <form ref={form} id="brief-form" onSubmit={(event) => { event.preventDefault(); download(); }}>
        <div className="dialog-top"><span className="eyebrow">EL SIGUIENTE «¿Y SI…?»</span><button className="close-dialog" type="button" aria-label="Cerrar formulario" onClick={() => dialog.current?.close()}>×</button></div>
        <h2 id="brief-title">Dale forma a tu <span className="serif">idea.</span></h2>
        <p>Prepara un resumen para compartir con el team por el canal que acuerden. No se envía ni se almacena en un servidor.</p>
        <label htmlFor="brief-name">Tu nombre<input id="brief-name" name="name" autoComplete="name" maxLength={100} required placeholder="¿Cómo te llamas?" /></label>
        <label htmlFor="brief-type">¿Qué quieres crear?<select id="brief-type" name="type"><option>Un videojuego</option><option>Software / una app / una web</option><option>Un prototipo de mecatrónica</option><option>Algo que todavía no tiene categoría</option></select></label>
        <label htmlFor="brief-idea">Cuéntanos la idea<textarea id="brief-idea" name="idea" rows={4} minLength={10} maxLength={3000} required placeholder="Qué imaginas, para quién es y qué te gustaría lograr…" /></label>
        <div className="brief-actions"><motion.button whileTap={{ scale: 0.97 }} type="submit" className="button button-lime">Descargar brief ↓</motion.button><button type="button" id="copy-brief" className="small-button" onClick={copy}>Copiar texto</button></div>
        <p id="brief-status" role="status" aria-live="polite">{status}</p>
      </form>
    </dialog>
  );
});
