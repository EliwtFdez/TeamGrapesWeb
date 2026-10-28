'use strict';
const $ = (selector) => document.querySelector(selector);
$('#year').textContent = new Date().getFullYear();
const menu = $('.menu-toggle');
const nav = $('#navigation');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  nav.classList.toggle('is-open', open);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Abrir menú');
}));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    nav.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Abrir menú');
  }
});

// Local brief preparation: no network submission and no persisted personal data.
const dialog = $('#brief-dialog');
const form = $('#brief-form');
$('#open-brief').addEventListener('click', () => dialog.showModal());
$('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  }
});
function briefText() {
  return `IDEA PARA TEAM GRAPES\n\nDe: ${$('#brief-name').value.trim()}\nQuiero crear: ${$('#brief-type').value}\n\nLa idea:\n${$('#brief-idea').value.trim()}\n\nPreparado en la web de Team Grapes. Este documento no se ha enviado.\n`;
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const url = URL.createObjectURL(new Blob([briefText()], {type: 'text/plain;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Mi-idea-para-Team-Grapes.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  $('#brief-status').textContent = 'Brief descargado. Ya puedes compartirlo por el canal que acuerden con el team.';
});
$('#copy-brief').addEventListener('click', async () => {
  if (!form.reportValidity()) return;
  try {
    await navigator.clipboard.writeText(briefText());
    $('#brief-status').textContent = 'Texto copiado. Está listo para compartir; todavía no se ha enviado.';
  } catch {
    $('#brief-status').textContent = 'El navegador no permitió copiar. Puedes descargar el brief.';
  }
});

// Grape Run: one requestAnimationFrame loop, started only by the player.
const canvas = $('#game');
const ctx = canvas.getContext('2d');
const overlay = $('#game-overlay');
const play = $('#play-game');
const pause = $('#pause-game');
const jump = $('#jump-game');
const scoreLabel = $('#score');
const statusLabel = $('#game-status');
let W = 1000;
const H = 360, ground = 287;
let running = false, paused = false, dead = false, frame = 0, previous = 0;
let elapsed = 0, score = 0, spawnIn = 1.9, speed = 245, obstacles = [];
let best = 0;
try { best = Number(localStorage.getItem('team-grapes-best')) || 0; } catch { /* Storage is optional. */ }
best = Math.min(999999, Math.max(0, best));
const player = {x: 135, y: ground - 44, vy: 0, w: 34, h: 44};
const pad = (value) => String(Math.floor(value)).padStart(3, '0');
function updateBest() { $('#best-score').textContent = `RÉCORD ${pad(best)}`; }
updateBest();
function rect(x,y,w,h,color) {ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),w,h);}
function grape(x,y,scale=1) {
  const pixels = ['000LL000','000LLL00','0PPP PPP','PPPPPPP0','0PPPPP00','00PPP000','000P0000'];
  pixels.forEach((row,dy) => [...row].forEach((cell,dx) => {
    if(cell==='P') rect(x+dx*5*scale,y+dy*5*scale,5*scale,5*scale,(dx+dy)%3===0?'#c4b5fd':'#8b5cf6');
    if(cell==='L') rect(x+dx*5*scale,y+dy*5*scale,5*scale,5*scale,'#c4f564');
  }));
}
function landscape() {
  ctx.fillStyle='#35264c';ctx.fillRect(0,0,W,H);
  const glow=ctx.createLinearGradient(0,0,0,H);glow.addColorStop(0,'#42305b');glow.addColorStop(1,'#9b6b9a');ctx.fillStyle=glow;ctx.fillRect(0,0,W,H);
  rect(W*.75,43,69,69,'#d1b1db');rect(W*.75-13,56,95,43,'#d1b1db');
  for(let i=0;i<27;i++){const x=(i*137+73)%W,y=(i*59+17)%185;rect(x,y,3,3,'#e1c8e3');if(i%5===0){rect(x-3,y+1,9,1,'#e1c8e3');rect(x+1,y-3,1,9,'#e1c8e3');}}
  const shift=(elapsed*15)%240;
  for(let i=-1;i<6;i++){const x=i*240-shift;rect(x,215,240,75,'#574269');rect(x+32,183,176,40,'#574269');rect(x+66,156,108,40,'#574269');rect(x+96,135,48,40,'#574269');}
  for(let i=-1;i<7;i++){const x=i*180-(elapsed*30)%180;rect(x,254,180,40,'#3f3454');rect(x+20,235,140,20,'#3f3454');rect(x+50,216,80,20,'#3f3454');}
  rect(0,ground,W,8,'#b8d57e');rect(0,ground+8,W,H-ground-8,'#2a2d26');
  for(let i=0;i<22;i++){const x=i*52-(elapsed*speed)%52;rect(x,ground+8,26,5,'#707a4e');rect(x+15,ground+26,7,5,'#484c38');rect(x+33,ground+47,9,5,'#484c38');}
}
function draw() {
  landscape();
  if(!running&&!dead){grape(101,ground-68,1.8);grape(855,ground-52,1.3);return;}
  const bob = player.y >= ground-player.h ? Math.floor(elapsed*10)%2*2 : 0;
  grape(player.x-3,player.y+bob,1.1);
  rect(player.x+8,player.y+37+bob,7,7,'#e0f3bd');rect(player.x+23,player.y+37-bob,7,7,'#e0f3bd');
  obstacles.forEach(o => {rect(o.x,o.y,o.w,o.h,'#b9db80');rect(o.x+5,o.y+5,o.w-10,6,'#e0f3bd');rect(o.x+o.w-6,o.y+10,6,o.h-10,'#7fa052');});
}
function finish() {
  running=false;dead=true;cancelAnimationFrame(frame);
  if(score>best){best=score;updateBest();try{localStorage.setItem('team-grapes-best',String(best));}catch{/* Optional storage. */}}
  $('#game-title').textContent = `¡${pad(score)} puntos! ¿Otra ronda?`;
  play.textContent='Volver a jugar ↻';overlay.hidden=false;pause.disabled=true;jump.disabled=true;
  statusLabel.textContent=`Fin de la partida. Tu puntuación: ${pad(score)}. Récord: ${pad(best)}.`;
}
function tick(now) {
  if(!running||paused)return;
  const dt=Math.min((now-previous)/1000,0.035);previous=now;elapsed+=dt;
  speed=245+Math.min(elapsed*3,145);score=Math.floor(elapsed*10);scoreLabel.textContent=pad(score);
  player.vy+=1250*dt;player.y+=player.vy*dt;
  if(player.y>ground-player.h){player.y=ground-player.h;player.vy=0;}
  spawnIn-=dt;
  if(spawnIn<=0){const height=28+Math.floor(Math.random()*15);obstacles.push({x:W+20,y:ground-height,w:25,h:height});spawnIn=1.4+Math.random()*.65;}
  obstacles.forEach(o=>{o.x-=speed*dt;});obstacles=obstacles.filter(o=>o.x+o.w>0);
  const collision=obstacles.some(o=>player.x+6<o.x+o.w&&player.x+player.w-5>o.x&&player.y+player.h-3>o.y&&player.y+5<o.y+o.h);
  draw();if(collision){finish();return;}frame=requestAnimationFrame(tick);
}
function start() {
  cancelAnimationFrame(frame);running=true;paused=false;dead=false;elapsed=0;score=0;spawnIn=1.9;obstacles=[];
  player.y=ground-player.h;player.vy=0;overlay.hidden=true;pause.disabled=false;jump.disabled=false;pause.textContent='Pausar';
  statusLabel.textContent='¡Vamos! Pulsa Saltar, toca el juego o usa Espacio para esquivar los bloques.';
  previous=performance.now();frame=requestAnimationFrame(tick);jump.focus({preventScroll:true});
}
function doJump() {if(running&&!paused&&player.y>=ground-player.h-1)player.vy=-535;}
function togglePause() {
  if(!running)return;
  paused=!paused;pause.textContent=paused?'Continuar':'Pausar';
  statusLabel.textContent=paused?'Partida en pausa. Pulsa Continuar para seguir.':'¡A seguir! Salta los bloques.';
  if(paused)cancelAnimationFrame(frame);else{previous=performance.now();frame=requestAnimationFrame(tick);}
}
play.addEventListener('click',start);jump.addEventListener('click',doJump);pause.addEventListener('click',togglePause);
canvas.addEventListener('pointerdown',doJump);
document.addEventListener('keydown',event=>{
  const target=event.target;
  if(dialog.open||target instanceof HTMLInputElement||target instanceof HTMLTextAreaElement||target instanceof HTMLSelectElement)return;
  if(running&&!paused&&(event.code==='Space'||event.code==='ArrowUp')) {
    if(target===pause||target===menu||target.closest('a'))return;
    event.preventDefault();doJump();
  }
});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&running&&!paused)togglePause();});
const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting&&running&&!paused)togglePause();},{threshold:0.1});
observer.observe(canvas);
function resizeGame() {
  const nextWidth = Math.max(420, Math.round(canvas.clientWidth / canvas.clientHeight * H));
  if (nextWidth !== W && running && !paused) togglePause();
  W = nextWidth;
  canvas.width = W;
  player.x = Math.min(135, W * .2);
  draw();
}
const resizeObserver = new ResizeObserver(resizeGame);
resizeObserver.observe(canvas);
resizeGame();
