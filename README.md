# Team Grapes — sitio web

Web en español para el estudio de Emmanuel y Eliw. React + TypeScript + Vite, con animaciones de Motion para React. Raíz del proyecto: `C:/Repositorios/Prototypes/TeamGrapesWeb/`.

## Contenido

- Identidad original de uvas pixeladas, adaptada desde el SVG proporcionado.
- Presentación de videojuegos, software y mecatrónica.
- Grape Run: demo creada para esta web, con controles táctiles y de teclado, pausa automática y récord local.
- Historia de los dos fundadores y proceso de trabajo propuesto.
- Preparador de brief: descarga y copia de texto en el navegador, sin envío ni almacenamiento de información personal.

## Vista local

Desde esta carpeta:

```bash
npm ci
npm start
```

Abrir `http://127.0.0.1:4317/`. `npm run check` ejecuta ESLint y TypeScript; `npm run build` genera la versión de producción en `dist/`. `npm run preview` sirve esa compilación.

Los archivos publicados se generan en `dist/` y no se editan a mano; `.openai/hosting.json` identifica el sitio y su directorio estático. Google Fonts es opcional y tiene fuentes locales de respaldo. Las dependencias quedan fijadas en `package-lock.json`.

## Mapa del código

```text
index.html               Metadatos y entrada de Vite
src/main.tsx             React y política de movimiento reducido
src/App.tsx              Composición de la página
src/components/          Secciones, menú, formulario, animaciones y juego
src/game/GrapeRunEngine.ts Motor del juego y limpieza de eventos
src/styles/original.css  Hoja de estilos original conservada
public/assets/           Logo original y símbolo de uvas
vite.config.ts           Servidor y compilación de producción
package.json             Comandos y dependencias
IDENTIDAD.md             Propuesta de marca y primeros pasos
.openai/hosting.json      Configuración de publicación de Sites
```

## Versiones de diseño

- `main`: misma composición, contenido y estilos de la primera entrega, migrados a componentes React. Motion añade entrada discreta de secciones, flotación del símbolo y respuesta al pulsar controles, respetando `prefers-reduced-motion`.
- `codex/design-md`: variante React basada en `DESIGN.md`. Tiene cambios de diseño propios y no se fusiona automáticamente a `main`.
- `codex/pre-react`: etiqueta que conserva la versión estática original.

El documento proporcionado `DESIGN.md` se conserva como referencia; sus reglas visuales se aplican únicamente en la rama alternativa.

## Personalización pendiente

Agregar el canal de contacto real cuando esté elegido. No se inventaron correos, redes, clientes ni proyectos. Sustituir o ampliar el laboratorio con casos reales al contar con material. Consultar `IDENTIDAD.md` para la propuesta de marca y primeros pasos.
