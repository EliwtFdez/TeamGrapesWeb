# Team Grapes — sitio web

Web en español para el estudio de Emmanuel y Eliw. React + TypeScript + Vite, con animaciones de Motion para React. Raíz del proyecto: `C:/Repositorios/Prototypes/TeamGrapesWeb/`.

## Contenido

- Identidad original de uvas pixeladas, adaptada desde el SVG proporcionado.
- Presentación de videojuegos, software y mecatrónica.
- Grape Run: demo creada para esta web, con controles táctiles y de teclado, pausa automática y récord local.
- Historia de los dos fundadores y proceso de trabajo propuesto.
- CTA «Cuéntanos tu idea»: prepara un borrador para el correo de contacto confirmado; también permite copiar y descargar un brief. El envío se realiza en la aplicación de correo del visitante.
- Aviso de privacidad, términos y 404 con rutas propias y contenido prerenderizado.
- Fuentes autoalojadas, iconos, preview social, sitemap, consentimiento y GA4 desactivado hasta configurar un ID.

## Vista local

Desde esta carpeta:

```bash
npm ci
npm start
```

Abrir `http://127.0.0.1:4317/`. `npm run check` ejecuta ESLint, TypeScript y las pruebas. `npm run build` genera la versión de producción en `dist/`. `npm run preview` sirve esa compilación en `http://127.0.0.1:4320/`, con las mismas respuestas 404 y cabeceras del Worker.

Los archivos publicados se generan en `dist/` y no se editan a mano. El build usa Vite multipágina, prerenderiza React y empaqueta todos los recursos en un Worker ESM compatible con Sites. `.openai/hosting.json` conserva el ID del sitio. El Worker maneja HTTPS, CSP, HSTS inicial de un día, rutas y compresión; no recibe formularios ni envía correos. Las fuentes se sirven localmente desde Fontsource. Las dependencias quedan fijadas en `package-lock.json`.

## Mapa del código

```text
index.html               Metadatos y entrada de Vite
src/main.tsx             React y política de movimiento reducido
src/App.tsx              Composición de la página
src/components/          Secciones, menú, formulario, animaciones y juego
src/game/GrapeRunEngine.ts Motor del juego y limpieza de eventos
src/styles/original.css  Hoja de estilos original conservada
src/styles/site.css      Mejoras móviles y estilos legales/consentimiento
src/pages/               Privacidad, términos, 404 y elección de página
src/site.config.ts       URL, contacto, responsable y configuración pública
src/lib/                 Consentimiento, analítica y preparación de correo
src/entry-server.tsx     Prerenderizado React durante el build
public/assets/           Logo original y símbolo de uvas
worker/security.mjs      Rutas HTTP, HTTPS, cabeceras y respuestas 404
scripts/                 Iconos/SEO, prerender, Worker, preview y auditoría
tests/                   Pruebas de privacidad, contacto y seguridad
vite.config.ts           Servidor y compilación de producción
package.json             Comandos y dependencias
IDENTIDAD.md             Propuesta de marca y primeros pasos
.openai/hosting.json      Configuración de publicación de Sites
```

## Versiones de diseño

- `main`: diseño original en React, con mejoras de `PLAN.md` en contacto, privacidad, SEO, seguridad, rendimiento y lectura móvil. Motion carga sus funciones de animación por separado y respeta `prefers-reduced-motion`.
- `codex/design-md`: variante React basada en `DESIGN.md`. Tiene cambios de diseño propios y no se fusiona automáticamente a `main`.
- `codex/pre-react`: etiqueta que conserva la versión estática original.

El documento proporcionado `DESIGN.md` se conserva como referencia; sus reglas visuales se aplican únicamente en la rama alternativa.

Consultar [COMPARACION.md](COMPARACION.md) para ver las diferencias, los enlaces de ambas versiones y cómo cambiar de rama.

## Configuración y pendientes

Copiar `.env.example` a `.env.local` sólo si se requieren valores distintos. `VITE_SITE_URL` debe ser el origen HTTPS real; afecta canonical, Open Graph y sitemap. No poner secretos en variables `VITE_`: se incluyen en el navegador. `.env*` está ignorado salvo `.env.example`.

El contacto actual y el responsable se definen en `src/site.config.ts`. Falta completar el domicilio público del aviso y revisar los textos legales. GA4 sigue desactivado; no se debe rellenar un ID de ejemplo. Consultar [docs/IMPLEMENTACION.md](docs/IMPLEMENTACION.md) para el estado de cada fase, validaciones y tareas en servicios externos.

Al cambiar de rama, detener Vite antes de `npm ci` para evitar que Windows mantenga bloqueadas las dependencias nativas.
