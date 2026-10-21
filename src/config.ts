// =========================================
//   CONFIGURACIÓN DEL ESTUDIO
//   Es el único archivo que se toca cuando cambian los datos del estudio
//   (email, teléfono, oficinas, horarios, perfiles, etc.).
// =========================================

export interface Oficina {
  /** Texto tal cual se ve en la web */
  textoVisible: string;
  calle: string;
  localidad: string;
  provincia: string;
  /** Coordenadas para Google. Dejar en null hasta tener los datos exactos */
  coordenadas: { latitud: number; longitud: number } | null;
}

export interface Horario {
  /** Días en inglés, como pide schema.org: "Monday", "Tuesday", ... */
  dias: string[];
  /** Formato 24 h, por ejemplo "09:00" */
  abre: string;
  cierra: string;
}

export const CONFIG = {
  nombre: 'Costantini y Asociados',
  nombreCompleto: 'Estudio Jurídico Costantini y Asociados', // Igual que en Google Maps
  url: 'https://www.costantiniyasociados.com/',

  tituloPagina: 'Estudio Jurídico Costantini y Asociados',
  descripcion:
    'Estudio Jurídico Costantini y Asociados. Asesoramiento en salud y discapacidad, accidentes, sucesiones, penal, comercial y faltas y tránsito. Oficinas en CABA y Haedo.',

  // WhatsApp: código de país + número, sin el + (lo usan el botón flotante, el formulario y el enlace del teléfono)
  whatsappNumero: '5491122614440',
  whatsappMensaje: 'Hola, quisiera hacer una consulta.',
  telefonoVisible: '11-2261-4440',

  email: 'dr.costantiniyasociados@gmail.com',

  // Endpoint del formulario de email (Formspree)
  formspreeUrl: 'https://formspree.io/f/mkjnwgag',

  oficinas: [
    {
      textoVisible: '25 de Mayo 267, CABA',
      calle: '25 de Mayo 267',
      localidad: 'Ciudad Autónoma de Buenos Aires',
      provincia: 'CABA',
      coordenadas: null,
    },
    {
      textoVisible: 'Constitución 317, Haedo (Pcia. de Bs. As.)',
      calle: 'Constitución 317',
      localidad: 'Haedo',
      provincia: 'Provincia de Buenos Aires',
      coordenadas: null,
    },
  ] as Oficina[],

  // Horarios de atención. Vacío hasta que el estudio los defina (no se muestran ni se informan a Google)
  horarios: [] as Horario[],

  // Enlaces a perfiles externos (Google Maps, redes sociales). Google los usa para relacionar el sitio con el estudio
  perfiles: [
    'https://maps.app.goo.gl/e5QFngGKL2SMTuNA6',
    'https://www.instagram.com/estudiojuridico.costantini',
  ] as string[],

  // Aviso de privacidad del formulario de email (BORRADOR, pendiente de aprobación del estudio)
  // {email} se reemplaza automáticamente por el email de arriba
  avisoPrivacidad:
    'Usamos sus datos (nombre, correo y teléfono) únicamente para responder su consulta. Pueden ser procesados a través de un servicio de formularios con servidores en el exterior. Usted puede ejercer los derechos de acceso, rectificación, actualización y supresión de sus datos escribiendo a {email}. La Agencia de Acceso a la Información Pública, órgano de control de la Ley 25.326, atiende las denuncias y reclamos por incumplimientos.',
};

/** Link de WhatsApp con un texto ya codificado para la URL */
export function linkWhatsApp(texto: string): string {
  return `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(texto)}`;
}

/** Link de Google Maps para una oficina (usa las coordenadas si están cargadas) */
export function linkMapa(oficina: Oficina): string {
  const destino = oficina.coordenadas
    ? `${oficina.coordenadas.latitud},${oficina.coordenadas.longitud}`
    : `${oficina.calle}, ${oficina.localidad}, ${oficina.provincia}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destino)}`;
}
