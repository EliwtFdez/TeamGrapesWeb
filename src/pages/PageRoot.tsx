import { lazy } from 'react';
import App from '../App';

const Privacy = lazy(() => import('./Privacy'));
const Terms = lazy(() => import('./Terms'));
const NotFound = lazy(() => import('./NotFound'));

export default function PageRoot() {
  const path = location.pathname.replace(/\/index\.html$/, '/');
  const Page = path === '/' ? App : /^\/privacidad\/?$/.test(path) ? Privacy : /^\/terminos\/?$/.test(path) ? Terms : NotFound;
  return <Page />;
}
