const CURRENT_ORIGIN = 'https://team-grapes-studio.glassy-lamp-0223.chatgpt.site';

export function defineSiteConfig(env: Record<string, string | undefined> = {}) {
  let origin = CURRENT_ORIGIN;
  if (env.VITE_SITE_URL) {
    const candidate = new URL(env.VITE_SITE_URL);
    if (candidate.protocol !== 'https:' || candidate.username || candidate.password || candidate.pathname !== '/' || candidate.search || candidate.hash) {
      throw new Error('VITE_SITE_URL debe ser un origen HTTPS, sin ruta, credenciales ni parámetros.');
    }
    origin = candidate.origin;
  }
  const measurementId = env.VITE_GA_MEASUREMENT_ID?.trim() ?? '';
  if (measurementId && !/^G-[A-Z0-9]{6,20}$/.test(measurementId)) throw new Error('ID de GA4 no válido.');
  return {
    name: 'Team Grapes',
    origin,
    title: 'Team Grapes — Ideas que se juegan.',
    description: 'Somos Emmanuel y Eliw. Creamos videojuegos, software y prototipos de mecatrónica. Si nos da curiosidad, lo construimos.',
    locale: 'es_MX',
    contact: { local: 'asesor', domain: 'teamgrapes.com' },
    legal: {
      responsible: 'Eliwt Rosales Fernandez',
      location: 'Veracruz, México',
      address: env.VITE_LEGAL_ADDRESS?.trim() || '[PENDIENTE: domicilio completo para solicitudes de privacidad]',
      updated: '28 de octubre de 2026',
    },
    analytics: { measurementId, debug: env.VITE_GA_DEBUG === 'true' },
    primaryCta: 'Cuéntanos tu idea',
  } as const;
}

export const siteConfig = defineSiteConfig(import.meta.env ?? {});
