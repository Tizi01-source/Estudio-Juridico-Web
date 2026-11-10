// Medición de conversiones de Google Ads.
// trackContacto() avisa a Google que alguien nos contactó. Se llama SOLO desde:
//   - el formulario de email, cuando Formspree confirma el envío;
//   - el botón flotante de WhatsApp, al hacer clic;
//   - el número de teléfono de Contacto (abre WhatsApp), al hacer clic;
//   - el formulario de WhatsApp, justo antes de abrir wa.me.
// Nunca al cargar la página.
import { GOOGLE_ADS } from '../config';

declare global {
  interface Window {
    gtag?: (...argumentos: unknown[]) => void;
  }
}

// Tiempo durante el cual una misma acción repetida (doble clic, doble envío) no se vuelve a contar
const ESPERA_MS = 3000;
const ultimaVez: Record<string, number> = {};

/**
 * Registra la conversión "Contacto" en Google Ads.
 * @param accion qué hizo la persona ('email', 'boton-whatsapp', 'form-whatsapp'); sirve para no contar dos veces lo mismo
 */
export function trackContacto(accion: string): void {
  try {
    // Sin datos en config.ts, o si la etiqueta de Google no está (bloqueador, error de red), no se hace nada
    if (!GOOGLE_ADS.etiqueta || !GOOGLE_ADS.conversionContacto) return;
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

    // Evita duplicados: la misma acción repetida en pocos segundos cuenta una sola vez
    const ahora = Date.now();
    if (ahora - (ultimaVez[accion] ?? -Infinity) < ESPERA_MS) return;
    ultimaVez[accion] = ahora;

    window.gtag('event', 'conversion', { send_to: GOOGLE_ADS.conversionContacto });
  } catch {
    // La medición nunca debe romper el formulario ni el botón
  }
}
