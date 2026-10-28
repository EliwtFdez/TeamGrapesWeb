import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m as motion, useReducedMotion } from 'motion/react';
import { GrapeRunEngine, initialView, pad } from '../game/GrapeRunEngine';
import { Reveal } from './Reveal';
import { analytics } from '../lib/analytics';

export function Laboratory() {
  return (
    <Reveal id="laboratorio" className="lab-section" labelledBy="lab-title"><div className="wrap section">
      <div className="section-top"><p className="eyebrow">02 / EL LABORATORIO</p><span className="live-label mono"><span className="status-dot" /> LA CURIOSIDAD ESTÁ EN MARCHA</span></div>
      <div className="section-heading"><h2 id="lab-title">Menos «algún día».<br />Más <span className="serif">presiona play.</span></h2><p>Un experimento pequeño para empezar.<br />Porque las ideas también se prueban jugando.</p></div>
      <GrapeRun />
      <p className="lab-note mono"><span>↳</span> Este es nuestro espacio para experimentar. Pronto, más cosas hechas por el team.</p>
    </div></Reveal>
  );
}

function GrapeRun() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const jump = useRef<HTMLButtonElement>(null);
  const engine = useRef<GrapeRunEngine | null>(null);
  const [view, setView] = useState(initialView);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!canvas.current) return;
    const element = canvas.current;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting || engine.current) return;
      engine.current = new GrapeRunEngine(element, (next) => {
        if (next.phase === 'over') analytics.event('game_over', { score: next.score });
        setView(next);
      });
      observer.disconnect();
    }, { rootMargin: '200px' });
    observer.observe(element);
    return () => { observer.disconnect(); engine.current?.destroy(); engine.current = null; };
  }, []);
  const active = view.phase === 'running' || view.phase === 'paused';
  return (
    <div className="game-shell">
      <div className="game-toolbar mono"><span><span className="purple-dot" /> GRAPE RUN <span className="game-version">/ WEB EXPERIMENT 001</span></span><span id="best-score">RÉCORD {pad(view.best)}</span></div>
      <div className="game-stage">
        <canvas ref={canvas} id="game" width="1000" height="360" role="img" aria-label="Grape Run: un juego de saltar obstáculos. Usa el botón Saltar o la barra espaciadora." onPointerDown={() => engine.current?.jump()}>Tu navegador no admite canvas. Puedes explorar el resto del estudio.</canvas>
        <AnimatePresence>{!active && <motion.div id="game-overlay" className="game-overlay" initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.15 }}>
          <span className="mono">UN POCO DE DIVERSIÓN, DE PARTE DEL TEAM</span>
          <h3 id="game-title">{view.phase === 'over' ? `¡${pad(view.score)} puntos! ¿Otra ronda?` : <>Una uva.<br />Muchas posibilidades.</>}</h3>
          <motion.button whileTap={{ scale: 0.97 }} id="play-game" className="button button-lime" onClick={() => { analytics.event('game_start'); engine.current?.start(); jump.current?.focus({ preventScroll: true }); }}>{view.phase === 'over' ? 'Volver a jugar ↻' : <>Jugar un rato <span aria-hidden="true">▶</span></>}</motion.button>
          <span className="game-instructions mono">ESPACIO O TOCA SALTAR · ESQUIVA LOS BLOQUES</span>
        </motion.div>}</AnimatePresence>
      </div>
      <div className="game-footer"><p id="game-status" role="status" aria-live="polite">{view.message}</p><div className="game-controls"><span id="score" className="mono" aria-label="Puntuación">{pad(view.score)}</span><button id="pause-game" className="small-button" disabled={!active} onClick={() => engine.current?.togglePause()}>{view.phase === 'paused' ? 'Continuar' : 'Pausar'}</button><button ref={jump} id="jump-game" className="small-button" disabled={!active} onClick={() => engine.current?.jump()}>Saltar ↑</button></div></div>
    </div>
  );
}
