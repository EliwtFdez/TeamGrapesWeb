# Team Grapes — sitio web

Web independiente en español para el estudio de Emmanuel y Eliw. HTML, CSS y JavaScript sin dependencias de ejecución. Raíz del proyecto: `C:/Repositorios/Prototypes/TeamGrapesWeb/`.

## Contenido

- Identidad original de uvas pixeladas, adaptada desde el SVG proporcionado.
- Presentación de videojuegos, software y mecatrónica.
- Grape Run: demo creada para esta web, con controles táctiles y de teclado, pausa automática y récord local.
- Historia de los dos fundadores y proceso de trabajo propuesto.
- Preparador de brief: descarga y copia de texto en el navegador, sin envío ni almacenamiento de información personal.

## Vista local

Desde esta carpeta: `npm start` (o `node preview.mjs`). Abrir la URL impresa. `npm run check` valida la sintaxis JavaScript sin instalar dependencias.

Los archivos publicados están en `dist/`; `.openai/hosting.json` identifica el sitio y su directorio estático. Google Fonts es opcional y tiene fuentes locales de respaldo.

## Mapa del código

```text
dist/index.html           Estructura, contenidos y formulario
dist/style.css            Identidad visual y diseño responsive
dist/app.js               Menú, brief y juego Grape Run
dist/assets/grape.svg     Símbolo de uvas derivado del logo original
dist/assets/team-grapes.svg Logo completo proporcionado
preview.mjs              Servidor local
package.json             Comandos sin dependencias
IDENTIDAD.md             Propuesta de marca y primeros pasos
.openai/hosting.json      Configuración de publicación de Sites
```

## Personalización pendiente

Agregar el canal de contacto real cuando esté elegido. No se inventaron correos, redes, clientes ni proyectos. Sustituir o ampliar el laboratorio con casos reales al contar con material. Consultar `IDENTIDAD.md` para la propuesta de marca y primeros pasos.
