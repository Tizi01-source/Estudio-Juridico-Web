// Configuración de Astro: sitio estático (sin servidor) con React para el formulario de email
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.costantiniyasociados.com',
  integrations: [react()],
  build: {
    // El CSS va dentro del HTML: el navegador no espera otro archivo para pintar la página
    inlineStylesheets: 'always',
  },
});
