import { SiteFooter } from '../components/SiteFooter';

export default function NotFound() {
  return <><main id="main" className="not-found"><img src="/assets/grape.svg" alt="Uva pixelada de Team Grapes" width="100" height="132" /><p className="eyebrow">TEAM GRAPES / 404</p><h1>Esta uva se cayó<br />del racimo.</h1><p>La página que buscas no está aquí. El laboratorio sigue abierto.</p><a className="button button-lime" href="/">Volver al inicio</a><nav aria-label="Explorar el estudio"><a href="/#laboratorio">Ver el laboratorio</a><a href="/#nosotros">Conoce al team</a></nav></main><footer className="legal-footer"><SiteFooter /></footer></>;
}
