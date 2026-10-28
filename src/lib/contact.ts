import { siteConfig } from '../site.config.ts';

export const contactAddress = () => `${siteConfig.contact.local}@${siteConfig.contact.domain}`;

export function buildMailto(body: string, subject = 'Una idea para Team Grapes') {
  return `mailto:${contactAddress()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function canOpenContact(honeypot: string, openedAt: number, now = Date.now()) {
  return honeypot.trim() === '' && now - openedAt >= 1500;
}

export function briefText(name: string, type: string, idea: string) {
  return `IDEA PARA TEAM GRAPES\n\nDe: ${name.trim()}\nQuiero crear: ${type}\n\nLa idea:\n${idea.trim()}\n\nPreparado en la web de Team Grapes. Abrir el correo no lo envía automáticamente.\n`;
}
