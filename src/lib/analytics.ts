import { siteConfig } from '../site.config.ts';
import { readConsent } from './consent.ts';

type EventName = 'cta_click' | 'brief_open' | 'brief_download' | 'brief_copy' | 'contact_email_open' | 'game_start' | 'game_over' | 'outbound_click';
type Parameters = { location?: 'header' | 'hero' | 'contact'; score?: number; destination?: string };
interface AnalyticsPort {
  queue: (...args: unknown[]) => void;
  load: (id: string) => void;
  disable: (id: string, disabled: boolean) => void;
  clearCookies: () => void;
  pathname: () => string;
}
const denied = { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
export const safePagePath = (pathname: string) => ['/', '/privacidad/', '/terminos/'].includes(pathname) ? pathname : '/404.html';

export class AnalyticsClient {
  private allowed = false;
  private initialized = false;
  private id: string;
  private origin: string;
  private port: AnalyticsPort;
  private debug: boolean;
  constructor(id: string, origin: string, port: AnalyticsPort, debug = false) {
    this.id = id; this.origin = origin; this.port = port; this.debug = debug;
  }
  consent(granted: boolean) {
    this.allowed = granted;
    if (!this.id) return;
    this.port.disable(this.id, !granted);
    if (!granted) {
      if (this.initialized) this.port.queue('consent', 'update', denied);
      this.initialized = false;
      this.port.clearCookies();
      return;
    }
    if (!this.initialized) {
      this.port.queue('consent', 'default', denied);
      this.port.queue('set', 'ads_data_redaction', true);
      this.port.queue('set', { page_location: this.origin + safePagePath(this.port.pathname()), page_referrer: '', page_title: 'Team Grapes' });
      this.port.queue('consent', 'update', { ...denied, analytics_storage: 'granted' });
      this.port.queue('js', new Date());
      this.port.queue('config', this.id, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, debug_mode: this.debug, cookie_expires: 60 * 60 * 24 * 180, cookie_update: false });
      this.port.load(this.id);
      this.initialized = true;
    } else this.port.queue('consent', 'update', { ...denied, analytics_storage: 'granted' });
    this.port.queue('event', 'page_view', { page_location: this.origin + safePagePath(this.port.pathname()), page_referrer: '', page_title: 'Team Grapes', debug_mode: this.debug });
  }
  event(name: EventName, parameters: Parameters = {}) {
    if (!this.id || !this.allowed) return;
    // Only this closed schema is sent. Names, emails, ideas, queries and URLs are excluded.
    const safe: Record<string, string | number | boolean> = { page_location: this.origin + safePagePath(this.port.pathname()), page_referrer: '', debug_mode: this.debug };
    if (parameters.location && ['header', 'hero', 'contact'].includes(parameters.location)) safe.location = parameters.location;
    if (Number.isFinite(parameters.score)) safe.score = Math.max(0, Math.min(999999, Math.floor(parameters.score!)));
    if (parameters.destination && /^[a-z0-9.-]+$/i.test(parameters.destination)) safe.destination = parameters.destination;
    this.port.queue('event', name, safe);
  }
}

declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
}
const runtime: AnalyticsPort = {
  queue(...args) {
    window.dataLayer ??= [];
    // Google specifies an arguments object for gtag commands in dataLayer.
    // eslint-disable-next-line prefer-rest-params
    window.gtag ??= function () { window.dataLayer!.push(arguments); };
    window.gtag(...args);
  },
  load(id) {
    if (document.getElementById('team-grapes-ga')) return;
    const script = document.createElement('script');
    script.id = 'team-grapes-ga'; script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.append(script);
  },
  disable(id, disabled) {
    Object.assign(window, { [`ga-disable-${id}`]: disabled });
    if (disabled) document.getElementById('team-grapes-ga')?.remove();
  },
  clearCookies() {
    const names = document.cookie.split(';').map((cookie) => cookie.trim().split('=')[0]).filter((name) => /^_ga(?:_|$)/.test(name));
    const host = location.hostname.split('.');
    for (const name of names) {
      document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
      for (let i = 0; i < host.length - 1; i++) document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.${host.slice(i).join('.')}; SameSite=Lax`;
    }
  },
  pathname: () => location.pathname,
};
export const analytics = new AnalyticsClient(siteConfig.analytics.measurementId, siteConfig.origin, runtime, siteConfig.analytics.debug);
export function initializeAnalytics() {
  analytics.consent(readConsent() === 'granted');
  document.addEventListener('click', (event) => {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!(link instanceof HTMLAnchorElement)) return;
    const url = new URL(link.href);
    if (url.protocol === 'https:' && url.origin !== location.origin) analytics.event('outbound_click', { destination: url.hostname });
  });
}
