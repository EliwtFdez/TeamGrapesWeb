# Implementación de PLAN.md

Fecha: 28 de octubre de 2026. Rama: `main`. El plan original se conserva en `PLAN.md`. La rama `codex/design-md` no recibe estas mejoras para mantener su función de comparación de diseño.

## Datos confirmados y alcance

- Responsable indicado por el usuario: **Eliwt Rosales Fernandez**, Veracruz, México.
- Contacto actual indicado por el usuario: **shadowkadizz@gmail.com**.
- `asesor@teamgrapes.com` queda descartado para el lanzamiento actual: DNS local y una segunda consulta mediante DNS de Google devolvieron ausencia de dominio/registros. No se han creado registros ni un buzón.
- Origen actual: `https://team-grapes-studio.glassy-lamp-0223.chatgpt.site`. No se supone que `teamgrapes.com` esté registrado o listo para usarse como web.
- Sin propiedad ni ID de GA4: la integración está preparada y **no carga Google Analytics**.
- El sitio conserva su acceso privado. No se modificaron permisos ni se compró un dominio o servicio.

## Estado por fase

| Fase | Implementado | Pendiente externo |
|---|---|---|
| 1. Base técnica | Vite multipágina; rutas `/`, `/privacidad/`, `/terminos/`; `/404.html`; recursos absolutos; React prerenderizado e hidratable; 404 real en el Worker | Revisión de las rutas autenticadas después de iniciar sesión en la publicación privada |
| 2. Legal | Aviso de privacidad y términos con responsable y ubicación confirmados; uso del correo, proveedores, récord local, preferencias, analítica, derechos ARCO, menores, retención y borradores; preferencias revocables con aceptar/rechazar del mismo tamaño | Domicilio completo para solicitudes y revisión profesional de los borradores; el marcador está visible y no se inventó una dirección |
| 3. Marca y SEO | Favicon ICO; SVG; Apple touch 180; iconos 192/512; manifest; OG PNG 1200×630; Twitter Card; canonical; OG locale `es_MX`; robots y sitemap generados desde la URL real | Elegir dominio final; comprobadores de Facebook/LinkedIn/WhatsApp y Search Console cuando haya una publicación pública accesible a sus rastreadores |
| 4. Contacto, secretos, spam | Un CTA principal en header/hero/contacto; borrador mailto a Gmail; copia y descarga; validación; honeypot y espera breve; sin backend de envíos; `.env*` ignorado; auditoría de patrones de credenciales en historial y árbol | Activar secret scanning / push protection en GitHub con una cuenta administradora; el conector respondió 404 y Git no ofreció credencial no interactiva. MX/SPF/DKIM/DMARC propios sólo cuando se use un dominio propio |
| 5. GA4 | Consent Mode v2: todos los permisos denegados por defecto, carga sólo con aceptación; publicidad denegada; Google Signals desactivado en etiqueta; eventos limitados; sin nombre, correo, brief ni query en eventos; revocación y cookies accesibles eliminadas | Crear propiedad, ID, retención de 14 meses y ajustes de la propiedad; revisar medición mejorada, marcar eventos clave y verificar DebugView / Realtime antes de activar |
| 6. Móvil | Lectura y controles más grandes; safe areas; fuentes autoalojadas; sin desbordamiento en 320, 360, 390, 768 y horizontal 844×390; juego sólo inicializa al acercarse; animación con carga diferida | Prueba manual en un teléfono físico. La comprobación realizada fue emulación de viewport en navegador |
| 7. Publicación y HTTPS | Worker ESM de Sites con redirección 308 HTTP→HTTPS, excepción para loopback, HSTS de 86400 segundos, CSP, nosniff, Referrer-Policy, Permissions-Policy, 404/noindex; transporte administrado por el alojamiento; respaldo HTTPS en navegador | Comprobar TLS del futuro dominio; SSL Labs/securityheaders.com y ampliar HSTS sólo después de verificar el dominio. No se activó preload ni includeSubDomains |

## Arquitectura

Vite genera las cuatro entradas HTML y los chunks en `.sites-runtime/client/`. El prerender añade el contenido de React durante la compilación: la portada y los textos legales no esperan a JavaScript para existir en el HTML. El navegador hidrata los componentes y carga las funciones de Motion por separado. Las fuentes vienen de paquetes Fontsource autoalojados; no hay peticiones a Google Fonts.

El empaquetador integra HTML, JS, CSS, fuentes, iconos y sitemap dentro de `dist/server/index.js`. No depende de reglas `_headers` o rewrites desconocidas del host. El manifiesto conserva el mismo `project_id` y deja de declarar `static`. El Worker sólo admite GET/HEAD; no hay endpoint de formularios ni claves de correo en cliente o servidor. `scripts/preview.mjs` ejecuta el mismo handler de producción en el puerto 4320.

## Contacto y límites del anti-spam

«Abrir correo» prepara un mensaje en la aplicación del visitante. El usuario revisa y envía allí; la web no promete que un mensaje se haya enviado o recibido. Copiar/descargar continúa disponible. No se envió un correo de prueba ni se publicó una propuesta de usuario.

La trampa y el tiempo mínimo son fricción local, no protección de un backend. Como no existe backend, no hay endpoint de envío que proteger con Turnstile. Si se añade uno, la validación y el anti-spam deben ejecutarse en servidor. La dirección no se imprime de inicio como enlace mailto en el HTML: se construye al solicitar el contacto. Puede reconstruirse desde el código público; esto no la convierte en un secreto ni garantiza evitar scraping. Para el correo actual `gmail.com`, la autenticación del dominio corresponde al proveedor; no se cambiaron registros de Google.

## Configuración

```text
src/site.config.ts         URL, nombre, correo, responsable y fecha del aviso
.env.example               Variables públicas de ejemplo (sin ID ficticio ni secretos)
VITE_SITE_URL              Origen HTTPS; regenerar build, OG y sitemap tras cambiarlo
VITE_LEGAL_ADDRESS         Domicilio seleccionado para aparecer públicamente en el aviso
VITE_GA_MEASUREMENT_ID      Vacío = sin GA4; ID real + consentimiento = etiqueta habilitada
VITE_GA_DEBUG              false en producción; true sólo en sesión de DebugView
```

GA4 limita las cookies propias a 180 días y las preferencias se vuelven a solicitar después de 180 días. La retención de eventos en la propiedad es otro ajuste independiente y no se puede configurar con el ID de medición. No se usa Consent Mode avanzado ni se carga Google para visitantes que rechazan. Los eventos implementados son `cta_click`, `brief_open`, `brief_download`, `brief_copy`, `contact_email_open`, `game_start`, `game_over` y `outbound_click`; este último sólo registra el dominio del destino.

## Verificación realizada

- `npm run check`: ESLint sin advertencias, TypeScript y 15 pruebas de privacidad/contacto/seguridad.
- `npm run build`: cuatro páginas HTML prerenderizadas y Worker ESM válido, con recursos integrados.
- HTTP local con el mismo handler: 200 para inicio/legales/iconos/robots/sitemap; 308 para normalizar rutas legales; 404 para ruta desconocida y `/404.html`; CSP y cabeceras presentes. Las pruebas también comprueban 308 a HTTPS, 405 para POST, HEAD sin cuerpo y entrega de HTML decodificado independientemente de Accept-Encoding.
- Navegador: privacidad y términos; correo de contacto revelado; aceptar/rechazar simétricos; ninguna etiqueta de Google sin ID, incluso tras aceptar; juego iniciar/saltar/pausar; copia y descarga de un brief; sin errores de consola observados tras el prerender.
- Auditoría local del historial y árbol mediante patrones: sin coincidencias de credenciales conocidas. Es una comprobación acotada, no una garantía ni sustituto del escaneo de GitHub.
- Lighthouse móvil en Chrome headless contra el preview de producción: **rendimiento 99, accesibilidad 100, buenas prácticas 100, SEO 100**. FCP 0.9 s, LCP 2.3 s, TBT 0 ms, CLS 0.002. Son resultados de laboratorio local, no mediciones de visitantes reales ni de la red del despliegue.

El primer Lighthouse dio rendimiento 55. Para corregirlo se añadieron prerender de React, compresión HTTP en el servidor de preview, carga diferida de funciones de Motion y activación del canvas cerca de la sección. Los informes se guardan en `.sites-runtime/audit/`; el resumen exportado está en `docs/verification/lighthouse-mobile.json`.

## Publicación y revisiones posteriores

Conservar acceso privado implica que rastreadores externos ven la pantalla de inicio de sesión. No se afirma haber validado tarjetas sociales, Search Console, GA4 ni los escáneres externos contra contenido privado. La publicación debe mantenerse privada hasta que el propietario decida cambiar su audiencia.

Antes de activar GA4: crear la propiedad, revisar consentimiento/medición mejorada, establecer retención y controles de Google Signals, añadir sólo el ID público y usar DebugView. Antes de recibir propuestas comerciales: completar domicilio y revisión legal. Antes de migrar al dominio propio: validar registro/DNS/TLS, cambiar `VITE_SITE_URL`, regenerar y revisar metadatos/redirects.

Referencias técnicas consultadas: [Vite multipágina y build](https://vite.dev/config/build-options), [prerender e hidratación con Vite](https://vite.dev/guide/ssr), [hydrateRoot de React](https://react.dev/reference/react-dom/client/hydrateRoot), [Motion con carga diferida](https://motion.dev/docs/react-reduce-bundle-size), [Consent Mode de Google](https://developers.google.com/tag-platform/security/guides/consent), [LFPDPPP vigente](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf).

### Compatibilidad de transporte de Sites

La prueba de publicación detectó que el proxy de Sites no conservaba correctamente las respuestas precomprimidas del Worker. Se retiró la compresión manual del artefacto: el Worker entrega recursos decodificados y delega el transporte al alojamiento. El servidor de preview aplica gzip en su capa HTTP para simular esa función. El resultado Lighthouse corresponde al preview local, no confirma compresión ni rendimiento de la red de Sites.
