import { useEffect, useState } from 'react';
import { m as motion } from 'motion/react';
import { siteConfig } from '../site.config';

export function Header({ onOpen }: { onOpen: () => void }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);
  return (
    <header className="header wrap">
      <a className="brand" href="#inicio" aria-label="TEAMGRAPES, inicio"><img src="/assets/grape.svg" alt="" width="27" height="36" /><span>TEAM<span className="lime">GRAPES</span><small>INDEPENDENT CREATIVE STUDIO</small></span></a>
      <nav aria-label="Navegación principal" id="navigation" className={open ? 'is-open' : ''} onClick={() => setOpen(false)}><a href="#hacemos">Qué hacemos</a><a href="#laboratorio">El laboratorio</a><a href="#nosotros">El team</a></nav>
      <motion.button whileTap={{ scale: 0.97 }} onClick={onOpen} className="nav-cta">{siteConfig.primaryCta} <span aria-hidden="true">↗</span></motion.button>
      <button className="menu-toggle" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-controls="navigation" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button>
    </header>
  );
}
