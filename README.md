# Estudio Costantini y Asociados — Sitio web

Sitio institucional (landing page) de un estudio jurídico. Presenta el estudio y sus servicios, y ofrece dos vías de contacto: un formulario por mail y otro por WhatsApp.

🔗 **Sitio en producción:** https://costantiniyasociados.com

## Tecnologías
- **Astro 7**: genera HTML estático, lo que mejora la velocidad de carga y el SEO.
- **React 19** para las partes interactivas, cargadas como "islas" (`client:visible`): se activan recién cuando el usuario llega a esa sección.
- **TypeScript**
- **Fontsource** (Playfair Display y Source Sans 3) para las tipografías.
- **sharp** + un script propio (`scripts/generar-imagenes.mjs`) para generar y optimizar imágenes.
- **Formspree** para el envío de mails, sin servidor propio.
- Deploy en **Vercel**.

## Cómo funcionan los formularios

### Contacto por mail
Es un componente de React (`FormularioEmail.tsx`) que:
- **Valida en el cliente** nombre, email (con expresión regular) y consulta; muestra un error por campo y lleva el foco al primero con problemas.
- Exige **aceptar el tratamiento de datos** antes de enviar.
- Envía los datos por `fetch` (POST, JSON) a **Formspree**, que los reenvía por correo al estudio.
- Incluye un **campo trampa (honeypot)** oculto: si un robot lo completa, Formspree descarta el envío.
- Muestra avisos de éxito, error de envío o error de conexión, y deshabilita el botón mientras envía.
- Es accesible: etiquetas visibles, `aria-invalid` y `aria-describedby` en los errores.

### Contacto por WhatsApp
Al enviar, se arma un link `https://wa.me/<número>?text=<mensaje>` con el texto codificado (`encodeURIComponent`) y se abre en una pestaña nueva (`noopener`). El número se lee de un atributo `data-numero` del formulario.

## Cómo correrlo
```bash
npm install
npm run dev        # servidor de desarrollo
npm run build      # build de producción
npm run preview    # previsualizar el build
npm run imagenes   # regenerar las imágenes optimizadas
```

## Decisiones técnicas
- **Astro en vez de una SPA:** se priorizó que la página cargue rápido y se indexe bien, porque es un sitio mayormente informativo.
- **React solo donde hace falta:** los formularios son las únicas partes con estado, así que el resto no manda JavaScript al navegador.
- **Formspree en vez de backend propio:** para dos formularios de contacto no justifica mantener un servidor.

## Autor
Diseño y desarrollo: Tiziano Costantini — [LinkedIn](https://www.linkedin.com/in/tiziano-costantini-marquez-8238b42b3)
