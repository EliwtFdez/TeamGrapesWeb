import { StrictMode, Suspense } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import PageRoot from './pages/PageRoot';
import './styles/original.css';
import './styles/site.css';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/space-grotesk';
import { ConsentBanner } from './components/ConsentBanner';
import { initializeAnalytics } from './lib/analytics';
import { MotionProvider } from './MotionProvider';

initializeAnalytics();

const app = (
  <StrictMode>
    <MotionProvider>
      <Suspense fallback={<p className="page-loading" role="status">Cargando Team Grapes…</p>}><PageRoot /></Suspense>
      <ConsentBanner />
    </MotionProvider>
  </StrictMode>
);
const root = document.getElementById('root')!;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
