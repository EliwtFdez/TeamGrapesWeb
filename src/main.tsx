import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import App from './App';
import './styles/original.css';
import './styles/site.css';
import '@fontsource-variable/dm-sans/latin.css';
import '@fontsource-variable/space-grotesk/latin.css';
import { ConsentBanner } from './components/ConsentBanner';
import { initializeAnalytics } from './lib/analytics';

const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));
const path = location.pathname.replace(/\/index\.html$/, '/');
const Page = path === '/' ? App : /^\/privacidad\/?$/.test(path) ? Privacy : /^\/terminos\/?$/.test(path) ? Terms : NotFound;
initializeAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <Suspense fallback={<p className="page-loading" role="status">Cargando Team Grapes…</p>}><Page /></Suspense>
      <ConsentBanner />
    </MotionConfig>
  </StrictMode>,
);
