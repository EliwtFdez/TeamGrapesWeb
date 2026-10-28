import { useRef } from 'react';
import { Header } from './components/Header';
import { Hero, Disciplines, About, Process, Contact, Footer } from './components/Sections';
import { BriefDialog, type BriefDialogHandle } from './components/BriefDialog';
import { Laboratory } from './components/Laboratory';

export default function App() {
const brief = useRef<BriefDialogHandle>(null);
return (<>
<a className="skip-link" href="#main">Saltar al contenido</a>
<Header />
<main id="main">
<Hero />
<div className="ticker" aria-label="Videojuegos, software, mecatrónica y un poco de todo"><div className="ticker-content mono"><span>VIDEOJUEGOS</span><b>✳</b><span>SOFTWARE</span><b>✳</b><span>MECATRÓNICA</span><b>✳</b><span>UN POCO DE TODO</span><b>✳</b><span>MUCHAS GANAS DE CREAR</span><b>✳</b></div></div>
    
<Disciplines />
<Laboratory />
<About />
<Process />
<Contact onOpen={() => brief.current?.open()} />
</main>
<Footer />
<BriefDialog ref={brief} />
</>);
}
