import { motion, useReducedMotion } from 'motion/react';
import { Reveal } from './Reveal';
import { siteConfig } from '../site.config';
import { SiteFooter } from './SiteFooter';

export function Hero({ onOpen }: { onOpen: () => void }) {
const reduced = useReducedMotion();
return (<section className="hero wrap" id="inicio" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot"></span> UN PEQUEÑO ESTUDIO. MUCHA CURIOSIDAD.</p>
        <h1 id="hero-title">Ideas que<br />se <span className="serif">juegan.</span><span className="pixel-spark" aria-hidden="true">✳</span></h1>
        <p className="hero-description">Creamos videojuegos, software y cosas que todavía no sabemos cómo llamar.<br /><strong>Si nos da curiosidad, lo construimos.</strong></p>
        <div className="hero-actions"><motion.button whileTap={{ scale: 0.97 }} className="button button-lime" onClick={onOpen}>{siteConfig.primaryCta} <span aria-hidden="true">↗</span></motion.button><a className="text-link" href="#laboratorio">Ver el laboratorio <span aria-hidden="true">↗</span></a></div>
        <div className="hero-footnote"><span className="tiny-cross" aria-hidden="true">+</span> Dos primos. Muchas ideas. Un mismo racimo.</div>
      </div>
      <div className="hero-art" aria-label="Ilustración del universo creativo de Team Grapes">
        <span className="art-coordinate mono">TG—001 / CREATIVE PLAYGROUND</span>
        <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
        <div className="art-grid"></div>
        <span className="art-star star-one" aria-hidden="true">✳</span><span className="art-star star-two" aria-hidden="true">+</span>
        <span className="art-label label-code mono">&lt; curiosity /&gt;</span>
        <div className="grape-sticker"><motion.img animate={reduced ? undefined : { y: [0, -7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} whileHover={reduced ? undefined : { scale: 1.04 }} src="/assets/grape.svg" alt="Uvas pixeladas del logo de Team Grapes" width="220" height="291" /></div>
        <span className="art-label label-play mono">BUILT TO PLAY ↗</span>
        <div className="mini-window"><div className="mini-window-bar"><span></span><span></span><span></span><small>idea.exe</small></div><div className="mini-window-body"><span aria-hidden="true">&gt;_</span><p>¿Y si lo<br /><em>hacemos?</em></p></div></div>
        <span className="art-caption mono"><span className="status-dot"></span> ALWAYS IN EXPERIMENT MODE</span>
      </div>
    </section>);
}

export function Disciplines() { return (<Reveal id="hacemos" className="section wrap" labelledBy="what-title">
      <div className="section-top"><p className="eyebrow">01 / LO QUE NOS MUEVE</p><span className="mono muted">DISEÑAR. CONSTRUIR. REPETIR.</span></div>
      <div className="section-heading"><h2 id="what-title">No nos cabe la curiosidad<br />en una sola <span className="serif">categoría.</span></h2><p>Nos gusta cruzar disciplinas.<br />Ahí suelen aparecer las buenas ideas.</p></div>
      <div className="disciplines">
        <article className="discipline"><div className="discipline-top"><span className="mono">[ 01 ]</span><svg viewBox="0 0 80 64" aria-hidden="true"><path d="M17 14h46l12 38H55L46 42H34L25 52H5z"/><path d="M23 24v19M14 33h19M54 28h2M63 36h2"/></svg></div><h3>Videojuegos</h3><p>Mundos por descubrir. Mecánicas que enganchan. Experiencias que queremos jugar tanto como crear.</p><span className="discipline-tag mono">GAME DESIGN · DESARROLLO</span></article>
        <article className="discipline"><div className="discipline-top"><span className="mono">[ 02 ]</span><svg viewBox="0 0 80 64" aria-hidden="true"><rect x="5" y="6" width="70" height="52" rx="2"/><path d="M5 17h70M15 12h1m7 0h1m7 0h1M30 28l-9 9 9 9m20-18 9 9-9 9m-7-20-6 22"/></svg></div><h3>Software</h3><p>Ideas que se vuelven herramientas. Aplicaciones y experiencias digitales con intención, utilidad y personalidad.</p><span className="discipline-tag mono">APPS · WEB · HERRAMIENTAS</span></article>
        <article className="discipline"><div className="discipline-top"><span className="mono">[ 03 ]</span><svg viewBox="0 0 80 64" aria-hidden="true"><rect x="18" y="10" width="44" height="44"/><rect x="29" y="21" width="22" height="22"/><path d="M27 2v8m13-8v8m13-8v8M27 54v8m13-8v8m13-8v8M10 20h8m-8 12h8m-8 12h8m44-24h8m-8 12h8m-8 12h8"/></svg></div><h3>Mecatrónica <span>& más</span></h3><p>Del código al mundo físico. Electrónica, mecanismos y prototipos para explorar qué pasa cuando todo se conecta.</p><span className="discipline-tag mono">HARDWARE · EXPERIMENTACIÓN</span></article>
      </div>
    </Reveal>); }

export function About() { return (<Reveal id="nosotros" className="about-section section wrap" labelledBy="about-title">
      <div className="about-art"><span className="mono about-file">team_grapes / player_select</span><div className="player-pair"><div className="player"><div className="pixel-person player-one" aria-hidden="true"><i /><b /></div><span className="mono">PLAYER 01</span><h3>Emmanuel</h3></div><span className="player-plus" aria-hidden="true">+</span><div className="player"><div className="pixel-person player-two" aria-hidden="true"><i /><b /></div><span className="mono">PLAYER 02</span><h3>Eliw</h3></div></div><span className="mono about-bottom">CO-OP MODE: <strong>ALWAYS ON</strong></span></div>
      <div className="about-copy"><p className="eyebrow">03 / LAS PERSONAS DETRÁS DE LAS UVAS</p><h2 id="about-title">Dos jugadores.<br /><span className="serif">Un solo team.</span></h2><p>Somos Emmanuel y Eliw. Diseñamos videojuegos y software, exploramos la mecatrónica y nos emocionamos con un poco de todo.</p><p>Team Grapes nace de esas ganas de hacer cosas juntos. De tomarnos nuestras ideas en serio y conservar lo que más nos gusta: divertirnos construyéndolas.</p><blockquote>«Si nos da curiosidad,<br />vale la pena intentarlo.»</blockquote></div>
    </Reveal>); }

export function Process() { return (<Reveal className="process wrap" labelledBy="process-title"><div><p className="eyebrow">ASÍ EMPIEZA TODO</p><h2 id="process-title">De «¿y si…?»<br />a <span className="serif">«ya funciona».</span></h2></div><ol><li><span className="mono">01</span><div><h3>Una buena pregunta</h3><p>Entendemos la idea y lo que la hace interesante.</p></div></li><li><span className="mono">02</span><div><h3>Algo que se pueda probar</h3><p>Construimos una primera versión para aprender.</p></div></li><li><span className="mono">03</span><div><h3>Jugar, ajustar, volver a crear</h3><p>Probamos, pulimos y damos el siguiente paso.</p></div></li></ol></Reveal>); }

export function Contact({ onOpen }: { onOpen: () => void }) { return (<Reveal id="colaborar" className="contact-section wrap" labelledBy="contact-title"><div className="contact-top mono"><span>¿TIENES ALGO EN MENTE?</span><span>INSERT YOUR IDEA ↙</span></div><h2 id="contact-title">Las buenas ideas<br />crecen <span className="serif">en racimo.</span><img src="/assets/grape.svg" alt="" width="80" height="106" /></h2><div className="contact-bottom"><p>Un juego, una herramienta, un invento extraño.<br />Todo empieza con una idea que vale la pena explorar.</p><button className="button button-dark" id="open-brief" onClick={onOpen}>{siteConfig.primaryCta} <span aria-hidden="true">↗</span></button></div><p className="contact-note mono">Prepara tu propuesta y ábrela en tu aplicación de correo para enviarla al team.</p></Reveal>); }

export function Footer() { return (<footer className="footer wrap"><a className="brand" href="#inicio"><img src="/assets/grape.svg" alt="" width="25" height="34" /><span>TEAM<span className="lime">GRAPES</span></span></a><span className="mono">© <span id="year">{new Date().getFullYear()}</span> TEAM GRAPES. HECHO CON CURIOSIDAD.</span><a className="text-link" href="#inicio">Volver arriba ↑</a><SiteFooter /></footer>); }
