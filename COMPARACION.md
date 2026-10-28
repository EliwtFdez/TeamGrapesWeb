# Dos versiones de Team Grapes

Ambas usan React 19, TypeScript, Vite y Motion para React. Conservan el contenido del estudio, Emmanuel y Eliw, Grape Run y el preparador de propuestas sin envío a servidores.

| | `main` | `codex/design-md` |
|---|---|---|
| Enlace privado | [Original en React](https://team-grapes-studio.glassy-lamp-0223.chatgpt.site) | [Variante DESIGN.md](https://team-grapes-design-study.glassy-lamp-0223.chatgpt.site) |
| Identidad | Estudio de videojuegos, píxeles y laboratorio | Galería editorial centrada en el logo y la demo |
| Superficies | Carbón, lima y violeta originales | Blanco, pergamino y secciones oscuras alternadas |
| Tipografía | DM Sans, Space Grotesk, serif y monoespaciada originales | Pila de sistema SF Pro / system-ui; títulos 600 y cuerpo 17px |
| Acciones | Botones y enlaces originales | Azul `#0066cc`, variante azul clara en superficies oscuras y botones cápsula |
| Portada | Composición lateral, órbitas y ventana `idea.exe` | Composición centrada, gran espacio y logo aislado |
| Navegación | Cabecera original y menú móvil | Barra negra de 44px y subnavegación translúcida de 52px |
| Movimiento | Flotación suave del símbolo, entrada de secciones y respuesta al pulsar | Entrada contenida, revelado de secciones y pulsación a escala 0.95 |
| Preferencias | Respeta movimiento reducido | Respeta movimiento reducido |

Los enlaces son privados y requieren iniciar sesión con la cuenta propietaria. Cada versión tiene su propia publicación: la alternativa no sustituye la web de `main`.

## Elegir una rama

```bash
git switch main
npm ci
npm start
```

Para probar la otra versión, detener el servidor y ejecutar:

```bash
git switch codex/design-md
npm ci
npm start
```

`npm run check` ejecuta lint y TypeScript. `npm run build` genera la versión publicable en `dist/`.

## Alcance del documento de diseño

`DESIGN.md` se conserva sin modificar y sólo se aplica visualmente en `codex/design-md`. Se traduce su enfoque de producto a los recursos reales del estudio: logo, ilustraciones y demo jugable, sin inventar fotografías, proyectos o clientes. Los colores de las uvas y del videojuego forman parte de esos recursos, no de los controles de la interfaz. Los píxeles de los avatares se dibujan con rectángulos CSS; no se añaden sombras a tarjetas, botones o texto en la variante.

## Verificación

- Lint sin advertencias, TypeScript y compilación de producción en ambas ramas.
- Revisión de escritorio a 1280px y móvil a 390px.
- Menú móvil, navegación entre secciones, inicio/salto/pausa del juego y preparación de propuestas.
- Copia del brief en `main` y descarga de texto en la alternativa.
- Sin errores de consola observados durante la revisión.
- Hoja de estilos de `main` idéntica a la entrega estática, conservada también en la etiqueta `codex/pre-react`.
