export type Phase = 'idle' | 'running' | 'paused' | 'over';
export interface GameView { phase: Phase; score: number; best: number; message: string }
interface Obstacle { x: number; y: number; w: number; h: number }
export const initialView: GameView = { phase: 'idle', score: 0, best: 0, message: 'Demo creada para esta web. ¿Hasta dónde llegas?' };
export const pad = (value: number) => String(Math.floor(value)).padStart(3, '0');

/** Canvas owns frame-by-frame drawing; React receives only meaningful UI changes. */
export class GrapeRunEngine {
  private ctx: CanvasRenderingContext2D;
  private width = 1000;
  private readonly height = 360;
  private readonly ground = 287;
  private phase: Phase = 'idle';
  private frame = 0;
  private previous = 0;
  private elapsed = 0;
  private score = 0;
  private best = 0;
  private spawnIn = 1.9;
  private speed = 245;
  private obstacles: Obstacle[] = [];
  private player = { x: 135, y: 243, vy: 0, w: 34, h: 44 };
  private resizeObserver: ResizeObserver;
  private visibilityObserver: IntersectionObserver;
  private onVisibility = () => { if (document.hidden && this.phase === 'running') this.togglePause(); };
  private onKey = (event: KeyboardEvent) => {
    if (this.phase !== 'running' || !['Space', 'ArrowUp'].includes(event.code)) return;
    const target = event.target;
    if (target instanceof HTMLElement && target.closest('dialog[open],input,textarea,select,a,#pause-game,.menu-toggle')) return;
    event.preventDefault();
    this.jump();
  };

  constructor(private canvas: HTMLCanvasElement, private onChange: (view: GameView) => void) {
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas 2D no disponible.');
    this.ctx = context;
    try { this.best = Number(localStorage.getItem('team-grapes-best')) || 0; } catch { /* Storage is optional. */ }
    this.best = Number.isFinite(this.best) ? Math.max(0, Math.min(999999, this.best)) : 0;
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    this.visibilityObserver = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting && this.phase === 'running') this.togglePause();
    }, { threshold: 0.1 });
    this.visibilityObserver.observe(canvas);
    document.addEventListener('visibilitychange', this.onVisibility);
    document.addEventListener('keydown', this.onKey);
    this.resize();
    this.publish(initialView.message);
  }

  destroy() {
    cancelAnimationFrame(this.frame);
    this.resizeObserver.disconnect();
    this.visibilityObserver.disconnect();
    document.removeEventListener('visibilitychange', this.onVisibility);
    document.removeEventListener('keydown', this.onKey);
  }

  start() {
    cancelAnimationFrame(this.frame);
    this.phase = 'running';
    this.elapsed = 0; this.score = 0; this.spawnIn = 1.9; this.obstacles = [];
    this.player.y = this.ground - this.player.h; this.player.vy = 0;
    this.publish('¡Vamos! Pulsa Saltar, toca el juego o usa Espacio para esquivar los bloques.');
    this.previous = performance.now();
    this.frame = requestAnimationFrame(this.tick);
  }

  jump() {
    if (this.phase === 'running' && this.player.y >= this.ground - this.player.h - 1) this.player.vy = -535;
  }

  togglePause() {
    if (this.phase !== 'running' && this.phase !== 'paused') return;
    this.phase = this.phase === 'running' ? 'paused' : 'running';
    if (this.phase === 'paused') cancelAnimationFrame(this.frame);
    else { this.previous = performance.now(); this.frame = requestAnimationFrame(this.tick); }
    this.publish(this.phase === 'paused' ? 'Partida en pausa. Pulsa Continuar para seguir.' : '¡A seguir! Salta los bloques.');
  }

  private publish(message = '¡Vamos! Pulsa Saltar, toca el juego o usa Espacio para esquivar los bloques.') {
    this.onChange({ phase: this.phase, score: this.score, best: this.best, message });
  }

  private finish() {
    this.phase = 'over';
    cancelAnimationFrame(this.frame);
    if (this.score > this.best) {
      this.best = this.score;
      try { localStorage.setItem('team-grapes-best', String(this.best)); } catch { /* Optional. */ }
    }
    this.publish(`Fin de la partida. Tu puntuación: ${pad(this.score)}. Récord: ${pad(this.best)}.`);
  }

  private tick = (now: number) => {
    if (this.phase !== 'running') return;
    const dt = Math.min((now - this.previous) / 1000, 0.035);
    this.previous = now; this.elapsed += dt;
    this.speed = 245 + Math.min(this.elapsed * 3, 145);
    const nextScore = Math.floor(this.elapsed * 10);
    if (nextScore !== this.score) { this.score = nextScore; this.publish(); }
    this.player.vy += 1250 * dt; this.player.y += this.player.vy * dt;
    if (this.player.y > this.ground - this.player.h) { this.player.y = this.ground - this.player.h; this.player.vy = 0; }
    this.spawnIn -= dt;
    if (this.spawnIn <= 0) {
      const h = 28 + Math.floor(Math.random() * 15);
      this.obstacles.push({ x: this.width + 20, y: this.ground - h, w: 25, h });
      this.spawnIn = 1.4 + Math.random() * 0.65;
    }
    this.obstacles.forEach((o) => { o.x -= this.speed * dt; });
    this.obstacles = this.obstacles.filter((o) => o.x + o.w > 0);
    const p = this.player;
    const collision = this.obstacles.some((o) => p.x + 6 < o.x + o.w && p.x + p.w - 5 > o.x && p.y + p.h - 3 > o.y && p.y + 5 < o.y + o.h);
    this.draw();
    if (collision) { this.finish(); return; }
    this.frame = requestAnimationFrame(this.tick);
  };

  private resize() {
    const next = Math.max(420, Math.round(this.canvas.clientWidth / Math.max(1, this.canvas.clientHeight) * this.height));
    if (next !== this.width && this.phase === 'running') this.togglePause();
    this.width = next; this.canvas.width = next;
    this.player.x = Math.min(135, next * 0.2);
    this.draw();
  }

  private rect(x: number, y: number, w: number, h: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(Math.round(x), Math.round(y), w, h);
  }

  private grape(x: number, y: number, scale = 1) {
    const pixels = ['000LL000', '000LLL00', '0PPP PPP', 'PPPPPPP0', '0PPPPP00', '00PPP000', '000P0000'];
    pixels.forEach((row, dy) => [...row].forEach((cell, dx) => {
      if (cell === 'P') this.rect(x + dx * 5 * scale, y + dy * 5 * scale, 5 * scale, 5 * scale, (dx + dy) % 3 === 0 ? '#c4b5fd' : '#8b5cf6');
      if (cell === 'L') this.rect(x + dx * 5 * scale, y + dy * 5 * scale, 5 * scale, 5 * scale, '#c4f564');
    }));
  }

  private draw() {
    const W = this.width, H = this.height, g = this.ground, t = this.elapsed;
    const gradient = this.ctx.createLinearGradient(0, 0, 0, H);
    gradient.addColorStop(0, '#42305b'); gradient.addColorStop(1, '#9b6b9a');
    this.ctx.fillStyle = gradient; this.ctx.fillRect(0, 0, W, H);
    this.rect(W * 0.75, 43, 69, 69, '#d1b1db'); this.rect(W * 0.75 - 13, 56, 95, 43, '#d1b1db');
    for (let i = 0; i < 27; i++) {
      const x = (i * 137 + 73) % W, y = (i * 59 + 17) % 185;
      this.rect(x, y, 3, 3, '#e1c8e3');
      if (i % 5 === 0) { this.rect(x - 3, y + 1, 9, 1, '#e1c8e3'); this.rect(x + 1, y - 3, 1, 9, '#e1c8e3'); }
    }
    const shift = (t * 15) % 240;
    for (let i = -1; i < 6; i++) {
      const x = i * 240 - shift;
      this.rect(x, 215, 240, 75, '#574269'); this.rect(x + 32, 183, 176, 40, '#574269');
      this.rect(x + 66, 156, 108, 40, '#574269'); this.rect(x + 96, 135, 48, 40, '#574269');
    }
    for (let i = -1; i < 7; i++) {
      const x = i * 180 - (t * 30) % 180;
      this.rect(x, 254, 180, 40, '#3f3454'); this.rect(x + 20, 235, 140, 20, '#3f3454'); this.rect(x + 50, 216, 80, 20, '#3f3454');
    }
    this.rect(0, g, W, 8, '#b8d57e'); this.rect(0, g + 8, W, H - g - 8, '#2a2d26');
    for (let i = 0; i < 22; i++) {
      const x = i * 52 - (t * this.speed) % 52;
      this.rect(x, g + 8, 26, 5, '#707a4e'); this.rect(x + 15, g + 26, 7, 5, '#484c38'); this.rect(x + 33, g + 47, 9, 5, '#484c38');
    }
    if (this.phase === 'idle') { this.grape(101, g - 68, 1.8); this.grape(855, g - 52, 1.3); return; }
    const p = this.player, bob = p.y >= g - p.h ? Math.floor(t * 10) % 2 * 2 : 0;
    this.grape(p.x - 3, p.y + bob, 1.1);
    this.rect(p.x + 8, p.y + 37 + bob, 7, 7, '#e0f3bd'); this.rect(p.x + 23, p.y + 37 - bob, 7, 7, '#e0f3bd');
    this.obstacles.forEach((o) => {
      this.rect(o.x, o.y, o.w, o.h, '#b9db80'); this.rect(o.x + 5, o.y + 5, o.w - 10, 6, '#e0f3bd'); this.rect(o.x + o.w - 6, o.y + 10, 6, o.h - 10, '#7fa052');
    });
  }
}
