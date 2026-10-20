// =========================================
//   TEXTOS DEL SITIO
//   Copiados tal cual del sitio publicado. Los entregó el estudio:
//   no se cambian sin su aprobación (ni una palabra, ni un signo).
// =========================================

/** Un párrafo es una lista de partes: texto común o texto en negrita */
export type Parte = string | { negrita: string };

export interface Especialidad {
  titulo: string;
  descripcion: string;
  items: { etiqueta: string; texto: string }[];
}

export const menu = [
  { texto: 'Inicio', ancla: '#inicio' },
  { texto: 'El Estudio', ancla: '#quienes-somos' },
  { texto: 'Especialidades', ancla: '#especialidades' },
  { texto: 'Contacto', ancla: '#contacto' },
];

export const quienesSomos = {
  titulo: 'Quiénes Somos',
  parrafos: [
    ['Nuestro estudio está formado por profesionales altamente especializados en diversas ramas del derecho. Nos dedicamos a proteger los intereses de personas y empresas con un enfoque ágil, humano y estratégico. Brindamos soluciones legales eficientes mediante un asesoramiento personalizado y un compromiso absoluto con cada caso.'],
  ] as Parte[][],
  subtitulo: 'Innovación y Capacitación Continua',
  parrafosSubtitulo: [
    ['Creemos firmemente que la excelencia jurídica exige una actualización constante. Por eso, nuestro equipo se capacita en forma continua en diferentes rubros, dándole un enfoque más profundo a cada caso.'],
    [
      'Además, combinamos la experiencia legal tradicional con las herramientas tecnológicas más avanzadas del mercado. Trabajamos e incorporamos sistemas de ',
      { negrita: 'Inteligencia Artificial (IA)' },
      ' adaptados exclusivamente a nuestro estudio, utilizándolos como una herramienta estratégica que potencia nuestra investigación y análisis. Esto nos permite procesar información con mayor precisión, anticipar escenarios complejos y brindar soluciones con un enfoque mucho más profundo y eficiente para cada caso en concreto.',
    ],
  ] as Parte[][],
};

export const especialidades = {
  titulo: 'Nuestras Especialidades',
  lista: [
    {
      titulo: 'Salud y Discapacidad',
      descripcion: 'Garantizamos la protección de tus derechos fundamentales frente a obras sociales, prepagas y el Estado.',
      items: [
        { etiqueta: 'Amparos de salud:', texto: 'Cobertura urgente de medicamentos, tratamientos y cirugías.' },
        { etiqueta: 'Discapacidad:', texto: 'Reclamos por prestaciones integrales, prótesis y acompañamiento.' },
        { etiqueta: 'Negativas de cobertura:', texto: 'Acciones rápidas ante la falta de respuesta médica.' },
      ],
    },
    {
      titulo: 'Accidentes',
      descripcion: 'Te ayudamos a obtener la indemnización justa que te corresponde para que solo te preocupes por tu recuperación.',
      items: [
        { etiqueta: 'Accidentes de tránsito:', texto: 'Reclamos contra compañías de seguros por lesiones y daños.' },
        { etiqueta: 'Accidentes laborales (ART):', texto: 'Gestión de licencias, despidos encubiertos e incapacidades.' },
        { etiqueta: 'Responsabilidad civil:', texto: 'Demandas por daños en la vía pública o comercios.' },
      ],
    },
    {
      titulo: 'Sucesiones',
      descripcion: 'Planificamos y resolvemos el traspaso de tus bienes familiares de forma rápida y con el menor conflicto posible.',
      items: [
        { etiqueta: 'Sucesiones testamentarias:', texto: 'Cumplimiento de la última voluntad del causante.' },
        { etiqueta: 'Sucesiones ab intestato:', texto: 'Declaratoria de herederos sin testamento previo.' },
        { etiqueta: 'División de herencia:', texto: 'Mediación y partición de bienes entre coherederos.' },
      ],
    },
    {
      titulo: 'Penal',
      descripcion: 'Defendemos tus derechos y tu libertad con absoluta confidencialidad y máxima rigurosidad técnica.',
      items: [
        { etiqueta: 'Defensas penales:', texto: 'Representación integral en procesos de investigación y juicio.' },
        { etiqueta: 'Querellas:', texto: 'Acompañamiento a víctimas de delitos para exigir justicia.' },
        { etiqueta: 'Asistencia urgente:', texto: 'Intervención inmediata en detenciones y declaraciones.' },
      ],
    },
    {
      titulo: 'Comercial',
      descripcion: 'Protegemos tu negocio y estructuramos tus proyectos comerciales para evitar contingencias futuras.',
      items: [
        { etiqueta: 'Contratos mercantiles:', texto: 'Redacción, revisión y auditoría de acuerdos comerciales.' },
        { etiqueta: 'Sociedades:', texto: 'Constitución, disolución y resolución de conflictos entre socios.' },
        { etiqueta: 'Cobro de deudas:', texto: 'Recupero ejecutivo de cheques, pagarés y facturas morosas.' },
      ],
    },
    {
      titulo: 'Faltas y Tránsito',
      descripcion: 'Asistencia técnica integral frente a infracciones, garantizando el debido proceso.',
      items: [
        { etiqueta: 'Representación:', texto: 'Asesoramiento ante imputaciones municipales y de tránsito.' },
        { etiqueta: 'Control de legalidad:', texto: 'Análisis técnico sobre la validez de las actas labradas.' },
        { etiqueta: 'Apelaciones:', texto: 'Defensa y presentación de recursos ante el órgano de alzada.' },
      ],
    },
  ] as Especialidad[],
};

export const contacto = {
  titulo: 'Contacto',
  intro: 'Seleccione el medio por el cual desea comunicarse con nosotros.',
  etiquetaOficinas: 'Oficinas:',
  etiquetaTelefono: 'WhatsApp:',
};

export const formularioWhatsApp = {
  titulo: 'Vía WhatsApp',
  nombre: 'Su Nombre',
  mensaje: 'Su consulta breve',
  boton: 'Enviar WhatsApp',
};

export const formularioEmail = {
  titulo: 'Vía Email',
  nombre: 'Su Nombre',
  dni: 'Su DNI',
  email: 'Su Email',
  telefono: 'Su Teléfono (Opcional)',
  mensaje: 'Detalle de su consulta',
  casilla: 'Acepto el tratamiento de mis datos para este fin.',
  boton: 'Enviar Email',
};

export const footer = '© 2026 Costantini y Asociados - Estudio Jurídico. Todos los derechos reservados.';
