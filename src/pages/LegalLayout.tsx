import type { ReactNode } from 'react';
import { siteConfig } from '../site.config';
import { SiteFooter } from '../components/SiteFooter';

export function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return <><a className="skip-link" href="#main">Saltar al contenido</a><header className="legal-header"><a className="brand" href="/"><img src="/assets/grape.svg" width="28" height="37" alt="" /><span>TEAM<span className="lime">GRAPES</span></span></a><a className="text-link" href="/">← Volver al estudio</a></header><main id="main" className="legal-page"><p className="eyebrow">TEAM GRAPES / INFORMACIÓN LEGAL</p><h1>{title}</h1><p className="legal-date">Última actualización: {siteConfig.legal.updated}</p>{children}</main><footer className="legal-footer"><SiteFooter /><p>© {new Date().getFullYear()} Team Grapes</p></footer></>;
}
