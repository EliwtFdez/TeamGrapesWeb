---
version: alpha
name: Team-Grapes-design-system
description: Sistema de diseño base para las plataformas de Team Grapes. Un tema oscuro "carbón" con acentos lima y violeta, tipografía Space Grotesk con tracking negativo para titulares, DM Sans para lectura y detalles de terminal en monoespaciada. Estética de estudio indie de videojuegos — pixel art, etiquetas tipo código, bordes finos y sombras duras sin desenfoque — con interfaz sobria, accesible y de baja densidad.

colors:
  bg: "#11120f"
  panel: "#181a16"
  surface-raised: "#1b1d18"
  surface-ticker: "#191c14"
  surface-toolbar: "#272a20"
  surface-footer-bar: "#24271e"
  surface-menu: "#24271e"
  surface-consent: "#23291d"
  surface-input: "#11140e"
  surface-art: "#22271b"
  surface-stage: "#302547"
  surface-shadow: "#080a07"
  ink: "#f1f0e8"
  ink-soft: "#e0e2d5"
  ink-legal: "#d0d3c7"
  ink-nav: "#c4c5bb"
  ink-eyebrow: "#ced1bf"
  muted: "#a4a79b"
  muted-dim: "#8e9581"
  line: "#35382e"
  line-strong: "#545744"
  line-control: "#5b624e"
  line-input: "#4b5240"
  line-nav-cta: "#656c55"
  line-dialog: "#626b52"
  line-consent: "#6c775a"
  lime: "#c4f564"
  lime-hover: "#d5ff83"
  lime-wash: "#c4f56415"
  purple: "#b69aee"
  purple-ink: "#222019"
  sand: "#e5dfc5"
  on-lime: "#11120f"
  on-lime-dark: "#1a2111"
  button-dark: "#192010"
  on-button-dark: "#f2f5e8"
  backdrop: "#070907d9"

typography:
  hero-display:
    fontFamily: "Space Grotesk Variable, Arial, sans-serif"
    fontSize: clamp(65px, 7.6vw, 104px)
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: -6px
  display-xl:
    fontFamily: "Space Grotesk Variable, Arial, sans-serif"
    fontSize: clamp(48px, 5.7vw, 76px)
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: -3px
  display-lg:
    fontFamily: "Space Grotesk Variable, Arial, sans-serif"
    fontSize: 43px
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: -2px
  display-md:
    fontFamily: "Space Grotesk Variable, Arial, sans-serif"
    fontSize: 35px
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: -1.7px
  heading:
    fontFamily: "Space Grotesk Variable, Arial, sans-serif"
    fontSize: 23px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: -0.6px
  heading-sm:
    fontFamily: "Space Grotesk Variable, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  brand:
    fontFamily: "Space Grotesk Variable, Arial, sans-serif"
    fontSize: 21px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.8px
  serif-accent:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: inherit
    fontWeight: 400
    fontStyle: italic
    lineHeight: inherit
    letterSpacing: -5px
  quote:
    fontFamily: "Georgia, serif"
    fontSize: 24px
    fontWeight: 400
    fontStyle: italic
    lineHeight: 1.25
    letterSpacing: 0
  body:
    fontFamily: "DM Sans Variable, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-legal:
    fontFamily: "DM Sans Variable, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: 0
  body-small:
    fontFamily: "DM Sans Variable, Arial, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: 0
  lead:
    fontFamily: "DM Sans Variable, Arial, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: 0
  nav-link:
    fontFamily: "DM Sans Variable, Arial, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  button:
    fontFamily: "DM Sans Variable, Arial, sans-serif"
    fontSize: 13px
    fontWeight: 650
    lineHeight: 1.4
    letterSpacing: 0
  text-link:
    fontFamily: "DM Sans Variable, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  eyebrow:
    fontFamily: "Courier New, monospace"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 1px
  mono-label:
    fontFamily: "Courier New, monospace"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0.3px
  mono-ticker:
    fontFamily: "Courier New, monospace"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 1.5px

rounded:
  none: 0px
  xs: 4px
  sm: 5px
  md: 6px
  lg: 9px
  pill: 9999px
  full: 50%

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 88px
  gutter-mobile: 23px
  gutter-tablet: 36px
  gutter-desktop: 56px

components:
  header:
    backgroundColor: transparent
    textColor: "{colors.ink-nav}"
    typography: "{typography.nav-link}"
    height: 112px
  brand:
    textColor: "{colors.ink}"
    typography: "{typography.brand}"
  nav-cta:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.on-lime}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 11px 17px
    height: 44px
  button-lime:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.on-lime}"
    typography: "{typography.button}"
    rounded: "{rounded.xs}"
    padding: 14px 21px
    height: 48px
  button-lime-hover:
    backgroundColor: "{colors.lime-hover}"
    textColor: "{colors.on-lime}"
    rounded: "{rounded.xs}"
  button-dark:
    backgroundColor: "{colors.button-dark}"
    textColor: "{colors.on-button-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.xs}"
    padding: 14px 21px
    height: 48px
  button-small:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.text-link}"
    rounded: "{rounded.xs}"
    padding: 8px 12px
    height: 44px
  button-consent:
    backgroundColor: transparent
    textColor: "{colors.lime}"
    typography: "{typography.button}"
    rounded: "{rounded.xs}"
    padding: 12px 16px
    height: 44px
  text-link:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.text-link}"
    height: 44px
  text-link-hover:
    backgroundColor: transparent
    textColor: "{colors.lime}"
  eyebrow:
    textColor: "{colors.lime}"
    typography: "{typography.eyebrow}"
  status-dot:
    backgroundColor: "{colors.lime}"
    rounded: "{rounded.full}"
    size: 6px
  ticker:
    backgroundColor: "{colors.surface-ticker}"
    textColor: "{colors.ink-nav}"
    typography: "{typography.mono-ticker}"
    height: 61px
  section-panel:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: 88px 56px
  discipline-grid:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: 28px
  art-panel:
    backgroundColor: "{colors.surface-art}"
    textColor: "{colors.muted}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.xs}"
    padding: 23px
  game-shell:
    backgroundColor: "{colors.surface-footer-bar}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  game-toolbar:
    backgroundColor: "{colors.surface-toolbar}"
    textColor: "{colors.ink-eyebrow}"
    typography: "{typography.mono-label}"
    padding: 14px 20px
  game-stage:
    backgroundColor: "{colors.surface-stage}"
    textColor: "{colors.ink}"
  sticker-label-code:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.lime}"
    typography: "{typography.mono-label}"
    padding: 7px 12px
  sticker-label-play:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.on-lime}"
    typography: "{typography.mono-label}"
    padding: 7px 12px
  mini-window:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.purple-ink}"
    rounded: "{rounded.sm}"
    width: 208px
  contact-section:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.on-lime-dark}"
    typography: "{typography.display-xl}"
    rounded: "{rounded.md}"
    padding: 33px 56px
  process-step:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.heading-sm}"
    padding: 17px 0
  mobile-menu:
    backgroundColor: "{colors.surface-menu}"
    textColor: "{colors.ink-nav}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.sm}"
    padding: 20px
  dialog:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    typography: "{typography.body-small}"
    rounded: "{rounded.lg}"
    padding: 29px
  input:
    backgroundColor: "{colors.surface-input}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.xs}"
    padding: 12px
    height: 44px
  consent-banner:
    backgroundColor: "{colors.surface-consent}"
    textColor: "{colors.ink}"
    typography: "{typography.body-small}"
    rounded: "{rounded.md}"
    padding: 24px
  legal-page:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink-legal}"
    typography: "{typography.body-legal}"
    padding: 40px 24px 80px
  legal-draft-note:
    backgroundColor: transparent
    textColor: "{colors.ink-soft}"
    typography: "{typography.body-small}"
    rounded: "{rounded.md}"
    padding: 18px
  footer:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.mono-label}"
    padding: 32px 56px
---

## Overview

Team Grapes es un estudio independiente que hace videojuegos, software y prototipos de mecatrónica. Su lenguaje visual refleja esa mezcla: **un terminal oscuro con alma de arcade**. El fondo es carbón verdoso, la tinta es un crema cálido, y dos acentos — **lima** para acción y **violeta** para foco y juego — dan toda la energía de la marca. Las uvas pixeladas del logo son el único ornamento obligatorio; todo lo demás es estructura sobria.

Este documento es el **template** para cualquier plataforma futura de Team Grapes (landing de un juego, herramienta web, página de proyecto, panel interno). Una plataforma nueva debe sentirse inmediatamente parte de la misma familia: mismos colores, misma tipografía con tracking apretado, mismos detalles de terminal y las mismas reglas de accesibilidad.

La personalidad de marca es *cercana, curiosa, ingeniosa y clara* (ver [IDENTIDAD.md](IDENTIDAD.md)). El diseño la traduce así: titulares grandes y juguetones con un acento en serif cursiva, texto de apoyo discreto, etiquetas en monoespaciada que recuerdan a una consola, y pequeños elementos de juego (estrellas, pegatinas, ventanas pixel) que aparecen con moderación.

**Key Characteristics:**
- Tema oscuro único: carbón `{colors.bg}` con paneles ligeramente más claros; el color lo ponen los acentos, no las superficies.
- Dos acentos con roles distintos: **lima** `{colors.lime}` = acción, énfasis y marca; **violeta** `{colors.purple}` = foco de teclado, decoración de juego y detalles secundarios.
- Titulares en Space Grotesk peso 500 con tracking muy negativo (hasta -6px en héroe) y una palabra clave en Georgia cursiva color lima.
- Detalles de terminal: etiquetas en Courier New con tracking positivo (`// código`, coordenadas, versiones, `● online`).
- Bordes de 1px en tonos oliva (`{colors.line}`) en lugar de sombras suaves; la profundidad viene de superficies y de sombras duras sin desenfoque en elementos "pegatina".
- Esquinas casi rectas (4–6px). Nada de pills grandes salvo el punto de estado.
- Pixel art (`image-rendering: pixelated`) para uvas, avatares y 404.
- Movimiento mínimo y siempre respetando `prefers-reduced-motion`.
- Accesibilidad por defecto: objetivos táctiles de 44px, foco visible de 3px, enlace "saltar al contenido", tamaño de fuente mínimo de 11px.

## Colors

> **Fuente de verdad en código:** [src/styles/original.css](src/styles/original.css) (variables `:root`) y [src/styles/site.css](src/styles/site.css). Los valores de este documento son los que están en producción hoy.

### Variables CSS base (copiar tal cual en un proyecto nuevo)

```css
:root {
  --bg: #11120f;
  --panel: #181a16;
  --ink: #f1f0e8;
  --muted: #a4a79b;
  --line: #35382e;
  --lime: #c4f564;
  --purple: #b69aee;
  --mono: 'Courier New', monospace;
  --sans: 'DM Sans Variable', Arial, sans-serif;
  --display: 'Space Grotesk Variable', Arial, sans-serif;
}
```

### Brand & Accent
- **Lime** (`{colors.lime}` — #c4f564): El color de marca y de acción. Botones primarios, enlaces en hover, eyebrows, marcadores de estado, íconos principales, la palabra serif del titular y la selección de texto (`::selection`). Es el único color que invita a hacer clic.
- **Lime Hover** (`{colors.lime-hover}` — #d5ff83): Estado hover del botón lima.
- **Lime Wash** (`{colors.lime-wash}` — #c4f56415): Relleno translúcido al pasar el cursor sobre botones secundarios (`button-small`).
- **Purple** (`{colors.purple}` — #b69aee): Anillo de foco (`outline: 3px solid`), estrellas y chispas decorativas, ventana pixel, segundo ícono de las tarjetas. Nunca se usa para acciones primarias.
- **Purple Ink** (`{colors.purple-ink}` — #222019): Texto sobre superficies violeta.
- **Sand** (`{colors.sand}` — #e5dfc5): Tercer color de trazo en íconos (junto a lima y violeta) para rotar entre tarjetas.

### Surface
- **Bg / Charcoal** (`{colors.bg}` — #11120f): Lienzo de toda la página. También es el color de texto sobre botones lima.
- **Panel** (`{colors.panel}` — #181a16): Diálogos y etiquetas tipo código.
- **Surface Raised** (`{colors.surface-raised}` — #1b1d18): Secciones destacadas (laboratorio/juego) con borde superior e inferior.
- **Surface Ticker** (`{colors.surface-ticker}` — #191c14): Banda de cinta de texto entre secciones.
- **Surface Toolbar / Footer Bar** (`{colors.surface-toolbar}` #272a20 · `{colors.surface-footer-bar}` #24271e): Barra superior e inferior del recuadro de juego y menú móvil.
- **Surface Consent** (`{colors.surface-consent}` — #23291d): Banner de consentimiento flotante.
- **Surface Input** (`{colors.surface-input}` — #11140e): Campos de formulario, más oscuros que el panel para que se lean como "hundidos".
- **Surface Art** (`{colors.surface-art}` — #22271b): Ilustraciones con cuadrícula de fondo.
- **Surface Stage** (`{colors.surface-stage}` — #302547): Fondo del lienzo del juego (violeta profundo); es el único fondo "saturado" fuera de lima.
- **Surface Shadow** (`{colors.surface-shadow}` — #080a07): Color de las sombras duras de pegatinas y ventana.
- **Lime Section** (`{colors.lime}` como fondo): La sección de contacto invierte la página: fondo lima, texto `{colors.on-lime-dark}` (#1a2111), botón `{colors.button-dark}`.

### Text
- **Ink** (`{colors.ink}` — #f1f0e8): Titulares y texto principal. Crema cálido, no blanco puro.
- **Ink Soft** (`{colors.ink-soft}` — #e0e2d5): Énfasis dentro de párrafos atenuados.
- **Ink Legal** (`{colors.ink-legal}` — #d0d3c7): Cuerpo de páginas legales (lectura larga).
- **Ink Nav** (`{colors.ink-nav}` — #c4c5bb): Enlaces de navegación y ticker.
- **Ink Eyebrow** (`{colors.ink-eyebrow}` — #ced1bf): Eyebrow del héroe.
- **Muted** (`{colors.muted}` — #a4a79b): Descripciones, notas, texto secundario, pie de página.
- **Muted Dim** (`{colors.muted-dim}` — #8e9581): Coordenadas decorativas y metadatos mínimos.

### Hairlines & Borders
- **Line** (`{colors.line}` — #35382e): Borde estándar de 1px (rejillas, separadores de proceso, ticker, pie legal).
- **Line Strong** (`{colors.line-strong}` — #545744): Marco del recuadro de juego.
- **Line Control** (`{colors.line-control}` — #5b624e): Borde de botones pequeños.
- **Line Input** (`{colors.line-input}` — #4b5240): Borde de campos de formulario.
- **Line Nav CTA / Dialog / Consent** (#656c55 · #626b52 · #6c775a): Bordes más claros para elementos flotantes que deben despegarse del fondo.

### Gradients
**Sin gradientes decorativos.** Las únicas "texturas" son cuadrículas de líneas de 1px hechas con `linear-gradient` (24–32px) sobre ilustraciones, siempre a muy baja opacidad y con `mask-image` radial en el héroe. El color se aplica plano.

### Contraste
- Lima sobre `{colors.bg}` y `{colors.bg}` sobre lima cumplen AA con holgura; usarlos siempre en pareja.
- `{colors.muted}` sobre `{colors.bg}` es el piso para texto secundario: no usar nada más oscuro para texto legible.

## Typography

### Font Family
- **Display**: `Space Grotesk Variable, Arial, sans-serif` — titulares, nombre de marca, números grandes. Paquete `@fontsource-variable/space-grotesk`.
- **Body / UI**: `DM Sans Variable, Arial, sans-serif` — párrafos, navegación, botones, formularios. Paquete `@fontsource-variable/dm-sans`.
- **Mono**: `'Courier New', monospace` — eyebrows, etiquetas, ticker, metadatos, coordenadas. Sin descarga de fuente.
- **Serif accent**: `Georgia, 'Times New Roman', serif` en cursiva — una sola palabra por titular (clase `.serif`) y citas.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.hero-display}` | clamp(65px, 7.6vw, 104px) | 500 | 1.02 | -6px | Titular del héroe (106px ≥1440px) |
| `{typography.display-xl}` | clamp(48px, 5.7vw, 76px) | 500 | 1.04 | -3px | Titular de la sección de contacto |
| `{typography.display-lg}` | 43px | 500 | 1.12 | -2px | `h2` de sección |
| `{typography.display-md}` | 35–40px | 500 | 1.12 | -1.7px | `h2` en bloques secundarios, diálogos |
| `{typography.heading}` | 23px | 500 | 1.3 | -0.6px | `h3` de tarjetas |
| `{typography.heading-sm}` | 16px | 500 | 1.4 | 0 | Pasos de proceso |
| `{typography.brand}` | 21px | 700 | 1.25 | -0.8px | Nombre de marca (único uso de peso 700) |
| `{typography.quote}` | 24px | 400 italic | 1.25 | 0 | Citas en Georgia |
| `{typography.body}` | 16px | 400 | 1.6 | 0 | Base del `body` |
| `{typography.body-legal}` | 16px | 400 | 1.8 | 0 | Páginas legales |
| `{typography.lead}` | 15px | 400 | 1.8 | 0 | Descripción del héroe |
| `{typography.body-small}` | 13px | 400 | 1.8 | 0 | Descripciones de tarjeta, notas |
| `{typography.nav-link}` | 13px | 400 | 1.6 | 0 | Navegación |
| `{typography.button}` | 13px | 650 | 1.4 | 0 | Botones |
| `{typography.text-link}` | 12px | 400 | 1.6 | 0 | Enlaces de texto secundarios |
| `{typography.eyebrow}` | 11px | 400 | 1.6 | 1px | Etiquetas de sección en Courier |
| `{typography.mono-ticker}` | 11px | 400 | 1.6 | 1.5px | Ticker |

### Principles
- **Tracking negativo proporcional al tamaño.** ≈ -6% a -5% en el héroe, -4.5% en `h2`, -2.5% en `h3`. Cuanto más grande, más apretado. El texto de cuerpo nunca lleva tracking.
- **Un solo peso para titulares: 500.** El 700 queda reservado al nombre de marca; los botones usan 650. No usar 600 ni 800.
- **Una palabra serif por titular.** Se envuelve en `.serif` y se pinta de lima en el héroe. Más de una palabra rompe el efecto.
- **Mono para metadatos, nunca para párrafos.** Courier New aparece en eyebrows, etiquetas, coordenadas, ticker y notas de laboratorio. Siempre con tracking positivo (0.3–1.5px).
- **Tamaño mínimo 11px** en cualquier elemento visible (se ajustó en `site.css` por accesibilidad; antes había 6–9px). Los `input` en móvil son 16px para evitar el zoom de iOS.
- **Lectura larga**: 16px con interlineado 1.8 y color `{colors.ink-legal}`.
- `-webkit-font-smoothing: antialiased` global.

## Layout

### Spacing System
- **Base:** 4/8px, con ritmo principal en 12 · 16 · 24 · 32 · 48.
- **Tokens:** `{spacing.xxs}` 4 · `{spacing.xs}` 8 · `{spacing.sm}` 12 · `{spacing.md}` 16 · `{spacing.lg}` 24 · `{spacing.xl}` 32 · `{spacing.xxl}` 48 · `{spacing.section}` 88.
- **Sección:** padding vertical de ~88px en escritorio, 64px ≤800px, 55px ≤600px.
- **Gutters laterales (`.wrap`):** 56px escritorio (>1100px) · 36px tablet (601–1100px) · 23px móvil, siempre sumando `env(safe-area-inset-*)`.

### Grid & Container
- **Ancho máximo:** 1320px (`.wrap`), 1208px para el bloque de contacto, 1100px para encabezado legal y banner, 820px para texto legal.
- **Héroe:** 2 columnas `1.15fr / 1fr`; apila en una columna ≤600px.
- **Disciplinas / tarjetas:** rejilla de 3 columnas con un único borde exterior y divisores internos de 1px (no tarjetas separadas); en móvil pasa a bloque con divisores horizontales.
- **Sobre nosotros / Proceso:** 2 columnas con 90px de separación; 45px ≤1100px; 30–35px ≤800px; 1 columna ≤600px (el arte pasa debajo del texto).

### Whitespace Philosophy
Aire generoso alrededor de titulares (margen superior 25–40px, inferior 25–46px) pero **bloques de contenido compactos**. La densidad se concentra en micro-detalles de terminal (etiquetas, coordenadas) para dar sensación de "interfaz viva" sin ruido. Las secciones se separan con borde de 1px o con cambio de superficie (`{colors.bg}` → `{colors.surface-raised}`), no con espaciado enorme.

## Elevation & Depth

| Nivel | Tratamiento | Uso |
|---|---|---|
| Flat | Sin sombra, borde 1px `{colors.line}` | Rejillas, secciones, ticker, pie |
| Superficie elevada | Cambio de fondo + borde superior/inferior | `lab-section`, `game-shell` |
| Sombra dura | `7px 7px 0 {colors.surface-shadow}` (sin blur) | Ventana pixel violeta |
| Sombra dura grande | `drop-shadow(13px 15px 0 #080a07)` | Pegatina de uva del héroe |
| Resplandor | `drop-shadow(0 0 35px #8b5cf619)` | Halo violeta sutil de la uva |
| Flotante | `0 12px 48px #0007` | Banner de consentimiento |
| Backdrop | `#070907d9` + `backdrop-filter: blur(6px)` | Fondo de diálogos |

**Filosofía de sombras.** Las sombras *duras sin desenfoque* son la firma de "pegatina de videojuego" y se usan solo en elementos decorativos del héroe. Los elementos funcionales (botones, tarjetas, inputs) no llevan sombra: usan borde y contraste de superficie. La única sombra suave real es la del banner de consentimiento, que debe separarse del contenido.

### Decorative Depth
- **Cuadrícula en perspectiva** (`perspective(600px) rotateX(15deg) rotateZ(-8deg)`) detrás de la ilustración del héroe, con máscara radial.
- **Órbitas** de 1px (sólida y punteada) rotadas con `scaleY` para sugerir un diagrama espacial.
- **Pegatinas rotadas** (−11°, −10°, +10°, +7°) para romper la ortogonalidad; la tarjeta "sobre nosotros" rota −2° (−1° en móvil).
- **Estrellas / chispas** (`✦`, `+`) en lima y violeta.

## Shapes

### Border Radius Scale

| Token | Valor | Uso |
|---|---|---|
| `{rounded.none}` | 0 | Sombras duras, lienzo de juego |
| `{rounded.xs}` | 4px | Botones, botones pequeños, inputs, panel de arte |
| `{rounded.sm}` | 5px | Botón de nav, rejilla de disciplinas, ventana pixel, menú móvil |
| `{rounded.md}` | 6px | Recuadro de juego, sección de contacto, nota legal |
| `{rounded.lg}` | 9px | Diálogos (el radio más grande del sistema) |
| `{rounded.full}` | 50% | Punto de estado, puntos de la ventana pixel |

### Pixel art y geometría
- Las uvas, avatares y el icono del 404 usan `image-rendering: pixelated` y se escalan en múltiplos enteros cuando es posible.
- Los avatares son **ilustraciones decorativas**, no retratos de los fundadores.
- Los trazos de íconos SVG son `stroke-width: 2.3`, `stroke-linecap: square`, sin relleno; el cap cuadrado mantiene la estética de píxel.
- El lienzo del juego mantiene relación 1000:360 (alto fijo ≈310–330px en móvil).

## Components

### Header y Navegación

**`header`** — Altura 112px, transparente sobre `{colors.bg}`, flex con `gap: 35px`. Marca a la izquierda, enlaces `{typography.nav-link}` color `{colors.ink-nav}` a la derecha, seguidos de `{component.nav-cta}`. Hover de enlaces: `{colors.lime}`. Altura 88–90px ≤800px.

**`mobile-menu`** — ≤800px los enlaces se ocultan tras un botón hamburguesa (`menu-toggle`, 44px mínimo, borde `{colors.line}`, radio 4px). Al abrirse se muestra como panel absoluto de `{colors.surface-menu}` con borde `{colors.line}` y radio 5px. ≤600px el CTA ocupa una fila completa debajo de la marca.

**`brand`** — Logo de uvas pixeladas + nombre en `{typography.brand}` y una línea `small` en mono (oculta en móvil ≤600px).

**`nav-cta`** — Fondo lima, texto `{colors.on-lime}`, peso 650, altura mínima 44px, flecha o símbolo en un `span` hijo.

### Buttons

**`button-lime`** — Acción primaria. Fondo `{colors.lime}`, texto `{colors.on-lime}`, `{typography.button}`, radio 4px, padding 14px × 21px, altura mínima 48px, `gap` 25px entre texto e icono. Hover: sube 3px (`translateY(-3px)`) y cambia a `{colors.lime-hover}`; transición de 0.2s.

**`button-dark`** — Acción primaria cuando el fondo ya es lima (sección de contacto). Fondo `{colors.button-dark}`, texto `{colors.on-button-dark}`, ancho mínimo 210px.

**`button-small`** — Acción secundaria/utilidad. Transparente, borde 1px `{colors.line-control}`, radio 4px, padding 8px × 12px, 44px de alto mínimo. Hover: fondo `{colors.lime-wash}`. Deshabilitado: opacidad 0.4.

**`button-consent`** — Borde 1px lima, texto lima, transparente, 44px. Las dos acciones del banner usan este mismo estilo (aceptar y rechazar con el mismo peso visual).

**`text-link`** — 12px, color heredado; hover a `{colors.lime}`; `min-height: 44px` con `inline-flex`. Acompañado de una flecha o `↗` con `gap: 10px`.

**Foco**: `outline: 3px solid {colors.purple}; outline-offset: 5px` en todo elemento interactivo (`:focus-visible`). `::selection` usa lima sobre carbón. El `skip-link` (lima, fijo arriba a la izquierda) se revela al recibir foco.

### Eyebrows y etiquetas

**`eyebrow`** — Courier New 11px, tracking 1px, color lima en encabezados de sección y `{colors.ink-eyebrow}` en el héroe. Suele ir precedido de un `status-dot` (círculo lima de 6px con halo `0 0 0 4px #c4f56412`) o de texto estilo `// 01 · disciplinas`.

**`sticker-label-code`** — Etiqueta rotada −10°, fondo `{colors.panel}`, borde 1px `#3c4233`, texto lima.

**`sticker-label-play`** — Etiqueta rotada +10°, fondo lima, texto carbón, negrita.

### Cintas y secciones

**`ticker`** — Banda de 61px con `{colors.surface-ticker}`, bordes superior e inferior `{colors.line}`, texto mono 11px con tracking 1.5px, elementos separados por `✦` lima de 20px. Se centra en escritorio y alinea a la izquierda con scroll en móvil.

**`section-top`** — Fila con `eyebrow` lima a la izquierda y metadato mono a la derecha (oculto ≤800px), seguida de `section-heading` (h2 a la izquierda, párrafo de 310px máx. a la derecha alineado abajo).

**`discipline-grid`** — Rejilla de 3 columnas con un solo borde 1px `{colors.line}` y radio 5px. Cada celda: fila superior de 75px con ícono SVG (65 × 52, trazo lima / violeta / sand rotando) y etiqueta mono, `h3` en `{typography.heading}`, descripción en `{colors.muted}` y etiqueta mono inferior.

**`section-panel` / `lab-section`** — Fondo `{colors.surface-raised}` con borde superior e inferior `{colors.line}`; contiene el módulo interactivo.

**`process-step`** — Lista sin viñetas; cada paso con borde superior 1px `{colors.line}` (el primero sin borde), número mono lima de 10–11px a la izquierda y `h3` de 16px + descripción de 12px a la derecha.

### Módulo de juego

**`game-shell`** — Borde 1px `{colors.line-strong}`, radio 6px, overflow oculto. Estructura vertical: `game-toolbar` (`{colors.surface-toolbar}`, mono 10–11px, punto violeta cuadrado de 7px) → `game-stage` (`{colors.surface-stage}`, canvas pixelado, `touch-action: manipulation`) → barra inferior (`{colors.surface-footer-bar}`) con controles `button-small`.

**Overlay del juego** — Capa `#19142138`, título `h3` 43px en `#fff5e8`, instrucciones mono en `#ece0ff`, botón lima centrado.

### Cards y paneles

**`art-panel`** — Panel de ilustración: fondo `{colors.surface-art}`, borde 1px `#3a442e`, radio 4px, cuadrícula de 24px con líneas `#859e4212`, rotado −2°. Contiene los avatares pixelados con nombres en `{typography.heading}` y un `+` lima entre ellos.

**`mini-window`** — Ventana pixel violeta: fondo `{colors.purple}`, texto `{colors.purple-ink}`, borde 2px `#181914`, radio 5px, sombra dura `7px 7px 0`, barra superior de 24px con tres puntos de 5px.

**`contact-section`** — Bloque invertido de fondo lima, radio 6px, ancho máx. 1208px. Fila superior mono de 9–11px, titular `{typography.display-xl}` con una uva pixelada rotada +15° a la derecha (se oculta ≤600px), y pie con texto y `button-dark`.

### Inputs, diálogos y consentimiento

**`dialog`** — Ancho `min(560px, 100% - 32px)`, fondo `{colors.panel}`, borde 1px `{colors.line-dialog}`, radio 9px, padding 29px (22px móvil). `::backdrop` con `{colors.backdrop}` y blur 6px. El cuerpo no hace scroll mientras está abierto (`body:has(dialog[open])`). Botón cerrar de 44 × 44px.

**`input`** — Fondo `{colors.surface-input}`, borde 1px `{colors.line-input}`, radio 4px, padding 12px, 14px de fuente (16px en móvil, 44px de alto mínimo). `label` de 12–13px con 18px de separación superior. Mensaje de estado en lima (`#brief-status`, alto mínimo 20px). Campo trampa anti-spam `contact-trap` oculto visualmente (1×1px, `clip-path: inset(50%)`).

**`consent-banner`** — Fijo inferior con márgenes `max(16px, safe-area)`, fondo `{colors.surface-consent}`, borde 1px `{colors.line-consent}`, radio 8px, padding 24px, `box-shadow: 0 12px 48px #0007`, `z-index: 50`. Título 21px, texto 13px en `#d5dccb`, acciones a la derecha (apiladas en móvil, ancho completo).

### Páginas legales y 404

**`legal-page`** — Ancho máximo 820px, `h1` `clamp(34px, 5vw, 52px)` con tracking -1.7px, `h2` 25px, cuerpo `{typography.body-legal}` en `{colors.ink-legal}`, enlaces lima subrayados con `text-underline-offset: 3px`. `legal-draft-note`: borde 1px `{colors.line}`, radio 6px, 13px, para avisos de borrador.

**`not-found`** — Centrado, máx. 800px, icono pixelado, eyebrow centrado, texto en `{colors.muted}`, botón lima y navegación en línea de 14px.

### Footer

**`footer`** — Altura mínima 150px, flex con wrap, padding vertical 32px. Marca a 17px, texto mono en `{colors.muted}`, enlaces legales (privacidad, términos, gestionar cookies) a 12px centrados con `gap: 8px 24px`; hover a lima. Debe incluir siempre acceso a privacidad, términos y preferencias de consentimiento.

## Do's and Don'ts

### Do
- Usar `{colors.lime}` para toda acción primaria y énfasis, y `{colors.purple}` para foco y decoración de juego. Es el par fijo de la marca.
- Mantener el fondo `{colors.bg}`; subir de nivel solo a `{colors.panel}` o `{colors.surface-raised}`.
- Poner tracking negativo en todo titular ≥ 21px y proporcionarlo al tamaño.
- Resaltar **una** palabra por titular en Georgia cursiva (lima en el héroe).
- Usar Courier New con tracking positivo para eyebrows, etiquetas y metadatos de "terminal".
- Dibujar separaciones con bordes de 1px en la familia `line-*` (olivas), no con sombras.
- Reservar las sombras duras sin blur (`7px 7px 0`) para elementos tipo pegatina y ventana pixel.
- Garantizar 44px mínimo en cualquier elemento interactivo, foco visible de 3px y tamaño de texto ≥ 11px.
- Respetar `prefers-reduced-motion` (sin transiciones ni animaciones) y las áreas seguras (`env(safe-area-inset-*)`).
- Usar `image-rendering: pixelated` en pixel art y trazos `square` en íconos.
- Dar el mismo peso visual a "aceptar" y "rechazar" en banners de consentimiento.
- Rotar elementos decorativos unos pocos grados para dar energía lúdica (nunca texto de lectura).

### Don't
- No introducir un tercer color de acento ni usar lima y violeta con roles invertidos.
- No usar blanco puro ni negro puro: tinta crema `{colors.ink}` sobre carbón verdoso.
- No añadir gradientes decorativos ni sombras suaves a botones, tarjetas o inputs.
- No usar radios grandes ni pills (>9px) fuera del punto de estado circular.
- No poner peso 600 o 800 en titulares: titulares en 500, marca en 700, botones en 650.
- No usar la fuente mono en párrafos ni sin tracking.
- No poner más de una palabra serif por titular.
- No bajar de 11px ni de 44px de área táctil; no confiar solo en el color para comunicar estado.
- No separar tarjetas con huecos y sombras: usar rejilla con bordes compartidos.
- No añadir animaciones que no se puedan desactivar con `prefers-reduced-motion`.
- No usar los avatares decorativos como retratos reales de las personas.
- No prometer servicios, plazos o experiencia que no se puedan demostrar (ver tono de marca en [IDENTIDAD.md](IDENTIDAD.md)).

## Responsive Behavior

### Breakpoints

| Nombre | Ancho | Cambios clave |
|---|---|---|
| Móvil pequeño | ≤ 360px | Héroe h1 48px, arte escala 0.78, sección de contacto h2 38px |
| Móvil | ≤ 600px | Gutter 23px; header en 2 filas con CTA a ancho completo; héroe en columna; rejilla de disciplinas en bloque; contacto h2 45px; diálogo en columna |
| Tablet | 601–800px | Header 90px con menú hamburguesa; héroe `1.1fr / .9fr` con arte a escala 0.7; secciones con padding 64px |
| Tablet ancho | 801–1100px | Gutter 36px; h1 80px; arte a escala 0.88; navegación más compacta |
| Escritorio | 1101–1439px | Gutter 56px, ancho máx. 1320px |
| Escritorio ancho | ≥ 1440px | Héroe h1 106px; contenido bloqueado a 1320px |
| Altura baja | ≤ 500px landscape | `dialog` y banner con `max-height: calc(100dvh - 24px)` y scroll interno |

### Touch Targets
- Mínimo **44 × 44px** (`min-height: 44px; min-width: 44px`) en botones, enlaces de texto, toggles y botones de cierre.
- Botones del héroe en móvil: `min-height: 48px`.
- Inputs en móvil a 16px para evitar el zoom automático de iOS.

### Collapsing Strategy
- **Header:** fila completa → marca + CTA + hamburguesa; la línea `small` de la marca se oculta ≤600px.
- **Héroe:** 2 columnas → 1; el arte se reduce con `transform: scale()` y márgenes negativos en lugar de recomponerse.
- **Titulares:** `clamp()` fluido; el `white-space: nowrap` del h1 se desactiva ≤800px.
- **Rejillas:** 3 columnas → bloque con divisores horizontales.
- **Metadatos laterales** (`section-top > .mono`, versión del juego, segunda línea del contacto): se ocultan en móvil.
- **Banner de consentimiento:** fila → columna, acciones a ancho completo.

### Image Behavior
- Pixel art siempre con `image-rendering: pixelated`.
- Iconos de aplicación en `public/` (favicon, 192, 512, apple-touch) y `og-image.png` para redes.
- Las ilustraciones decorativas llevan `alt` vacío o descriptivo corto; el contenido informativo nunca vive solo en la imagen.

## Motion

- **Librería:** `motion` (framer-motion) con `LazyMotion` (ver [src/MotionProvider.tsx](src/MotionProvider.tsx)).
- **Reveal de sección** ([src/components/Reveal.tsx](src/components/Reveal.tsx)): `opacity 0.92 → 1`, `y 8 → 0`, 0.5s `easeOut`, `once: true`, `amount: 0.08`. `initial={false}` para que el contenido sea visible sin JS (prerender).
- **Hover de botón:** `translateY(-3px)` + cambio de color, 0.2s.
- **Hover de pegatina:** rota a 2° y sube 10px, 0.4s.
- **Scroll:** `scroll-behavior: smooth` y `scroll-padding-top` para anclas.
- **Reducción de movimiento:** con `prefers-reduced-motion: reduce` se desactivan `transition` y `animation` globalmente y `Reveal` pasa a duración 0.

## Accesibilidad y cumplimiento (parte del sistema)

- `skip-link` al inicio de cada página.
- `:focus-visible` siempre visible en violeta.
- Regiones con `aria-labelledby` (el componente `Reveal` lo soporta).
- Banner de consentimiento antes de cargar analítica; acciones equivalentes en peso visual ([src/lib/consent.ts](src/lib/consent.ts), [src/components/ConsentBanner.tsx](src/components/ConsentBanner.tsx)).
- Páginas de **Privacidad** y **Términos** con layout propio ([src/pages/LegalLayout.tsx](src/pages/LegalLayout.tsx)), enlazadas desde el pie.
- Correo de contacto ofuscado y campo trampa anti-spam en formularios.
- Cabeceras de seguridad y HTTPS forzado ([worker/security.mjs](worker/security.mjs), [public/enforce-https.js](public/enforce-https.js)).

## Cómo usar este template en una plataforma nueva

1. **Copiar tokens.** Pegar el bloque `:root` de la sección *Colors* y los imports `@fontsource-variable/dm-sans` y `@fontsource-variable/space-grotesk`.
2. **Reset base.** `box-sizing: border-box`, `body { background: var(--bg); color: var(--ink); font: 16px/1.6 var(--sans); -webkit-font-smoothing: antialiased }`, foco violeta y `::selection` lima.
3. **Esqueleto.** `skip-link` → `header` → héroe (eyebrow + h1 con una palabra serif + descripción + `button-lime` + `text-link`) → `ticker` → secciones con `section-top` → bloque de contacto lima → `footer` con enlaces legales.
4. **Composición.** Alternar `{colors.bg}` y `{colors.surface-raised}`; usar el bloque lima solo una vez por página, para el llamado a la acción final.
5. **Identidad.** Conservar las uvas pixeladas como marca; adaptar solo la ilustración del héroe y los textos al producto nuevo.
6. **Revisar** la lista de Do's/Don'ts, contraste, 44px táctiles, 11px mínimos y reducción de movimiento antes de publicar.

## Iteration Guide

1. Trabajar **un componente a la vez**, referenciando su clave YAML (`{component.button-lime}`, `{component.dialog}`).
2. Las variantes de estado (`-hover`) viven como entradas separadas en `components:`.
3. Usar `{token.refs}` en el diseño; no escribir hexadecimales sueltos salvo los tonos de borde/relleno documentados arriba.
4. Documentar solo los estados *default*, *hover*, *focus* (violeta 3px) y *disabled* (opacidad 0.4).
5. Titulares: Space Grotesk 500 con tracking negativo. Cuerpo: DM Sans 400. Metadatos: Courier New con tracking positivo. Esa frontera no se rompe.
6. Las sombras duras son solo decoración tipo pegatina; la UI funcional se separa con bordes.
7. Ante la duda sobre el énfasis: cambiar de superficie o de acento (lima) antes de añadir cromo.

## Known Gaps

- Los valores de fondo `#3c4233`, `#3a442e`, `#594973`, `#181914`, `#d5dccb`, `#fff5e8`, `#ece0ff`, `#c8cdbb`, `#d1dbbd`, `#d3dfb9`, `#afb999` y similares están en el CSS pero no se han formalizado como tokens; cuando se repitan en más de un componente conviene promoverlos a variables.
- No existen estados de error/validación de formularios documentados; solo el mensaje de estado en lima.
- No hay tema claro; el sistema es exclusivamente oscuro (la sección de contacto lima es la única inversión).
- Los estilos viven en dos archivos CSS globales (`original.css` base y `site.css` de accesibilidad/legal) con CSS minificado en una línea; un proyecto nuevo puede reorganizarlos en capas (tokens → base → componentes) conservando los mismos valores.
- Los avatares pixelados se dibujan con CSS (`.pixel-person`) y solo cubren dos variantes de color (`--shirt`, `--hair`); un sistema de personajes más amplio queda por definir.
- El logo de referencia es el archivo proporcionado por el estudio (ver `public/assets/`); este documento no define reglas de espacio libre ni tamaños mínimos del logo.
