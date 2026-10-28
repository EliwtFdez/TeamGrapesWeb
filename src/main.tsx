import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import PageRoot from './pages/PageRoot';
import './styles/original.css';
import './styles/site.css';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/space-grotesk';
import { ConsentBanner } from './components/ConsentBanner';
import { initializeAnalytics } from './lib/analytics';

initializeAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <Suspense fallback={<p className="page-loading" role="status">Cargando Team Grapes…</p>}><PageRoot /></Suspense>
      <ConsentBanner />
    </MotionConfig>
  </StrictMode>,
);
