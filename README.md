# Web · Chiquinquirá León Deco

Catálogo de una sola página. Cada pieza se pide por WhatsApp y las cotizaciones también se mandan por WhatsApp. Es HTML, CSS y JavaScript sin dependencias: no necesita servidor, base de datos ni compilación.

## Antes de publicar (obligatorio)

1. **Número de WhatsApp:** ya está configurado (+52 55 8009 7803) en `assets/js/config.js`. Si cambia, edítalo ahí en formato internacional, sin «+» ni espacios.
   Mientras esté vacío, WhatsApp se abre con el mensaje ya escrito, pero la persona tiene que elegir a quién mandarlo.
2. **Imagen al compartir:** WhatsApp y Facebook necesitan la dirección completa de la imagen. Cuando tengas el dominio, cambia en `index.html` la línea `og:image` a `https://TU-DOMINIO/assets/img/og-image.jpg`.
3. Sustituye los **[POR CONFIRMAR]** de `index.html`: anticipo, fecha límite de pedidos y entregas.

## Cómo publicarlo (cualquiera de estas opciones)

- **Netlify Drop:** arrastra la carpeta completa a app.netlify.com/drop.
- **GitHub Pages, Vercel o un hosting propio:** sube la carpeta tal cual; `index.html` va en la raíz.

## Agregar o cambiar piezas

Todo está en `assets/js/productos.js` y el diseño no se toca.

1. Guarda la foto en `assets/img/catalogo/` en dos tamaños WebP: `c-11-480.webp` (480 px de ancho) y `c-11-960.webp` (960 px). Squoosh.app los genera gratis.
2. Copia un bloque `{ codigo: ..., }` en `PRODUCTOS`, cambia los datos y guarda.
3. Para fotos extra (por ejemplo, un detalle), agrégalas a `fotos: ["c-11", "c-11-detalle"]`. La galería ampliada las muestra todas.

Los árboles de la galería «Decoramos tu árbol» están en `ARBOLES`, en el mismo archivo.

**Prefijos de código (propuesta):** A árboles · AM árboles de mesa · C coronas · CM centros de mesa · G guirnaldas · M madera · CN cascanueces · B botellas · P puerta · D pared. La numeración sigue la de las carpetas de fotos.

## Qué incluye

- Encabezado fijo con menú (hamburguesa en el celular) y botón de WhatsApp.
- Hero, catálogo con filtros por categoría y galería ampliada (deslizar, flechas y teclado).
- Servicio «Decoramos tu árbol», con la galería de estilos A-01 a A-16.
- Formulario de cotización que arma el mensaje y abre WhatsApp. Nada se guarda en un servidor.
- «Cómo pedir», «Sobre la Sra. Elizabeth», pie y botón flotante de WhatsApp.
- SEO básico, Open Graph, datos estructurados (LocalBusiness) y favicon.
- Fuentes alojadas en el propio sitio (Cormorant Garamond, Montserrat y Pinyon Script, licencia SIL OFL) y fotos WebP con carga diferida.

## Decisiones de diseño que vale la pena saber

- **Script solo sobre verde.** El manual de marca prohíbe Pinyon Script sobre crema. En las secciones claras, la palabra de acento va en Cormorant Italic color vino.
- **Kickers en vino sobre crema** en lugar de dorado: el dorado sobre crema no alcanza el contraste mínimo (2.75:1).
- El **botón flotante** usa el verde oficial de WhatsApp con el ícono en verde pino (contraste 6.2:1).
