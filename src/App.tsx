import { useRef } from 'react';
import { Header } from './components/Header';
import { Hero, Disciplines, About, Process, Contact, Footer } from './components/Sections';
import { BriefDialog, type BriefDialogHandle } from './components/BriefDialog';
import { Laboratory } from './components/Laboratory';
import { analytics } from './lib/analytics';

export default function App() {
const brief = useRef<BriefDialogHandle>(null);
const openBrief = (location: 'header' | 'hero' | 'contact') => {
  analytics.event('cta_click', { location });
  analytics.event('brief_open', { location });
  brief.current?.open();
};
return (<>
<a className="skip-link" href="#main">Saltar al contenido</a>
<Header onOpen={() => openBrief('header')} />
<main id="main">
<Hero onOpen={() => openBrief('hero')} />
<div className="ticker" aria-label="Videojuegos, software, mecatrónica y un poco de todo"><div className="ticker-content mono"><span>VIDEOJUEGOS</span><b>✳</b><span>SOFTWARE</span><b>✳</b><span>MECATRÓNICA</span><b>✳</b><span>UN POCO DE TODO</span><b>✳</b><span>MUCHAS GANAS DE CREAR</span><b>✳</b></div></div>
    
<Disciplines />
<Laboratory />
<About />
<Process />
<Contact onOpen={() => openBrief('contact')} />
</main>
<Footer />
<BriefDialog ref={brief} />
</>);
}
