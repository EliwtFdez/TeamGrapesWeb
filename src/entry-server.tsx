import { StrictMode, Suspense } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import { ConsentBanner } from './components/ConsentBanner';
import { MotionProvider } from './MotionProvider';

export function render(path: string) {
  const Page = path === '/' ? App : path === '/privacidad/' ? Privacy : path === '/terminos/' ? Terms : NotFound;
  return renderToString(<StrictMode><MotionProvider><Suspense fallback={<p className="page-loading" role="status">Cargando Team Grapes…</p>}><Page /></Suspense><ConsentBanner /></MotionProvider></StrictMode>);
}
