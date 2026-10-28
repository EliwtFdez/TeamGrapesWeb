import { loadEnv } from 'vite';
import { defineSiteConfig } from '../src/site.config.ts';

export const config = defineSiteConfig({ ...loadEnv('production', process.cwd(), 'VITE_'), ...process.env });
