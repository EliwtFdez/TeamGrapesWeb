# Plan para agregar los 11 puntos a Team Grapes Web

Puntos solicitados: política de privacidad, términos y condiciones, API y secretos, forzar HTTPS, web preview link, favicon, sitemap, web en móvil, página 404, SPAM safe, CTA claro y analytics GA4.

## Hallazgos del código que condicionan el plan

- **Es una SPA de una sola página, sin router.** Los assets usan rutas relativas (`assets/grape.svg` en [index.html](index.html) y los componentes). Se romperían en `/privacidad` o en una página 404, así que hay que pasarlos a rutas absolutas.
- **El CTA principal no lleva a ningún lado.** [BriefDialog.tsx](src/components/BriefDialog.tsx) solo descarga o copia un `.txt`, y no hay canal de contacto. Esto condiciona los puntos "CTA claro", "API y secretos" y "SPAM safe".
- **Hay tratamiento de datos que la política debe mencionar.** Google Fonts se carga con `@import` en [original.css](src/styles/original.css) (envía la IP a Google). El juego guarda `team-grapes-best` en `localStorage`. GA4 se suma a eso.
- **Falta lo básico de compartir y de seguridad.** No hay `og:image`, `og:url`, canonical ni `robots.txt`, y [.gitignore](.gitignore) no excluye `.env`.
- **El CSS móvil usa textos de 6 a 9 px** y botones de menos de 44 px.
- **No se sabe qué soporta el hosting** (redirects, headers, funciones). [.openai/hosting.json](.openai/hosting.json) solo indica "estático desde `dist`".

## Decisiones pendientes

1. **Dominio final** (por ejemplo `teamgrapes.com`). Lo necesitan el sitemap, las etiquetas OG, el canonical y HTTPS.
2. **Canal de contacto real**: correo compartido, WhatsApp, Discord o Instagram. [IDENTIDAD.md](IDENTIDAD.md) ya lo deja pendiente.
3. **País o jurisdicción y responsable legal.** Hoy no hay empresa constituida, así que serían Emmanuel y Eliw como personas. Define si la política habla de GDPR, LFPDPPP u otra ley.
4. **ID de GA4** (`G-XXXXXXXXXX`) y quién administra la propiedad.

## Resumen de fases

| Fase | Contenido | Puntos |
|---|---|---|
| 1 | Base técnica | 404, rutas |
| 2 | Páginas legales y consentimiento | Privacidad, Términos |
| 3 | Marca, SEO y compartir | Favicon, Preview, Sitemap |
| 4 | Contacto y conversión | CTA, API y secretos, Spam |
| 5 | Analítica | GA4 |
| 6 | Móvil | Web en móvil |
| 7 | Publicación | HTTPS |

## Fase 1: Base técnica

- Pasar a **Vite multipágina** (`rollupOptions.input`): `index.html`, `privacidad/index.html`, `terminos/index.html` y `404.html`. Cada una monta un componente de React. Así no hace falta router, ni dependencias nuevas, ni reglas de rewrite del host.
- Convertir todos los `assets/...` a `/assets/...`.
- Crear `src/pages/` con `Privacy`, `Terms` y `NotFound`. Crear también `src/site.config.ts` con URL, nombre y contacto en un solo lugar.
- **404**: marca propia (la uva, un mensaje corto como "Esta uva se cayó del racimo", botón a inicio y enlaces a las secciones), con `noindex`.
- Al publicar, comprobar que el host sirve `404.html` con status 404.

## Fase 2: Legal y consentimiento

- **Política de privacidad**: responsable y contacto, datos tratados, finalidad y base legal, retención, derechos y cómo ejercerlos, transferencias a Google (EE. UU.), menores y fecha de actualización. Los datos tratados son:
  - GA4 (cookies `_ga*`), solo con consentimiento.
  - `localStorage` del récord del juego (funcional).
  - IP hacia Google Fonts (o se autoalojan las fuentes con Fontsource y desaparece ese punto).
  - Correos o briefs que se reciban.
- **Términos y condiciones**: uso del sitio, propiedad intelectual (logo, juego, código), sin garantía de servicios o plazos, enlaces externos y ley aplicable. Incluir una cláusula que aclare que enviar una idea no crea relación comercial ni cede derechos, porque ese es el caso real del brief.
- **Banner de cookies** (aceptar y rechazar con el mismo peso visual) y enlace "Preferencias de cookies" en el footer, junto a los enlaces legales.
- No se inventan datos legales: se dejan marcadores `[PENDIENTE]` donde falte información. Los textos son una base redactada por Claude y conviene que un abogado los revise.

## Fase 3: Favicon, preview y sitemap

- **Favicon**: partir de [grape.svg](public/assets/grape.svg) y generar `favicon.ico`, `apple-touch-icon` de 180 px, íconos de 192 y 512 px y `site.webmanifest`. Enlazar todo con rutas absolutas.
- **Web preview**: imagen `og-image.png` de 1200×630 px con la marca. Meta `og:image`, `og:url`, `og:site_name`, `og:locale=es`, `twitter:card=summary_large_image` y `<link rel="canonical">`. Las URLs deben ser absolutas. Validar con Facebook Debugger, LinkedIn Inspector y WhatsApp.
- **Sitemap**: `public/robots.txt` apuntando al sitemap y `public/sitemap.xml` con `/`, `/privacidad` y `/terminos`. El 404 no entra. Después, enviarlo en Search Console.

## Fase 4: CTA, API y secretos, spam

- **CTA claro**: hoy hay tres textos distintos ("Hagamos algo", "Explora el laboratorio", "Prepara tu idea"). Dejar **una acción principal** repetida en header, hero y contacto, por ejemplo "Cuéntanos tu idea", y "Ver el laboratorio" como secundaria. El botón del header pasa a relleno (hoy es solo contorno). Actualizar el texto que dice "esta herramienta no envía mensajes" y el del [README.md](README.md).
- **Canal de contacto**, de menos a más complejidad:
  - **A (recomendada para lanzar):** el brief abre `mailto:` con el texto ya generado, o un enlace a WhatsApp o Discord. No necesita backend ni secretos.
  - **B:** servicio de formularios (Formspree o Web3Forms). El endpoint es público por diseño.
  - **C:** función serverless propia más un servicio de correo. Solo aquí hay secretos reales, y exige un host con funciones.
- **API y secretos**: nada sensible lleva prefijo `VITE_`, porque todo lo que lo lleva termina en el bundle público. Esto implica:
  - Añadir `.env*` a `.gitignore` (excepto `.env.example`, que sí se commitea).
  - Guardar los secretos reales en el panel del host.
  - Revisar el historial de git por claves ya expuestas.
  - Activar secret scanning en GitHub.
- **SPAM safe**: se interpreta como tres cosas (confirmar si se quería solo una):
  - Anti-spam en el formulario: honeypot, trampa de tiempo, Turnstile y validación en servidor si se usa B o C.
  - Entregabilidad del dominio: SPF, DKIM y DMARC.
  - No exponer el correo en texto plano para evitar scrapers.

## Fase 5: GA4

- `src/lib/analytics.ts` y un componente `ConsentBanner`. El ID viene de `VITE_GA_MEASUREMENT_ID`. Es público por diseño, y sin ID todo queda en no-op.
- **Consent Mode v2** con valor por defecto "denegado". `gtag.js` no se carga hasta que el usuario acepta.
- **Eventos**: `cta_click` (con la ubicación), `brief_open`, `brief_download`, `brief_copy`, `game_start`, `game_over` (con la puntuación) y clics salientes.
- **Ajustes en GA**: retención de 14 meses, desactivar Google Signals y marcar los eventos clave.
- Verificar con DebugView.

## Fase 6: Web en móvil

- Probar a 320, 360, 390 y 768 px, en horizontal, y en un teléfono real.
- Subir los textos de 6 a 9 px a un mínimo de 11 o 12 px.
- Subir los objetivos táctiles a 44 px o más (`.small-button`, `.menu-toggle` y `.nav-cta`).
- Revisar el desbordamiento horizontal. Los sospechosos son `hero h1{white-space:nowrap}` y el `hero-art` con `scale` y márgenes negativos.
- Añadir `safe-area-inset` y mover la tipografía fuera del `@import` bloqueante.
- Lighthouse móvil con objetivo de 90 o más.

## Fase 7: Forzar HTTPS y headers

- Activar "Always use HTTPS" en el host o en el DNS.
- Añadir HSTS, empezando con un `max-age` corto y subiéndolo cuando todo esté verificado.
- Añadir CSP, `X-Content-Type-Options` y `Referrer-Policy` (`_headers`, si el host lo soporta). La CSP debe permitir GA4 y las fuentes.
- Como respaldo, un script en `index.html` que redirija de `http:` a `https:` fuera de `localhost`.
- Validar con SSL Labs y securityheaders.com.

## Verificación general

`npm run check` y `npm run build` en cada fase, y `npm run preview` antes de publicar. Al final: Lighthouse (SEO, accesibilidad, mejores prácticas), los validadores de preview, Search Console con el sitemap y GA4 Realtime.

## Orden recomendado

1 → 2 → 3 → 4 → 5 → 6 → 7. Lo legal va antes de GA4, y el dominio es requisito de las fases 3 y 7. Mientras no haya dominio se puede avanzar con las fases 1, 2 (borradores) y 6.
