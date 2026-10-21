// Avisos accesibles (reemplazan a SweetAlert2). Los usan los formularios de WhatsApp y de email.
// El texto se inserta con textContent: nunca se interpreta como HTML.

export type TipoAviso = 'exito' | 'advertencia' | 'error';

interface OpcionesAviso {
  titulo?: string;
  texto: string;
  tipo: TipoAviso;
  /** Elemento que recibe el foco al cerrar (por defecto, el que lo tenía antes de abrir) */
  focoAlCerrar?: HTMLElement | null;
}

// Íconos fijos (no dependen de lo que escribe el usuario). Solo colores de la paleta.
const ICONOS: Record<TipoAviso, string> = {
  exito:
    '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="29" fill="none" stroke="#C5A869" stroke-width="4"/><path d="M19 33l9 9 17-19" fill="none" stroke="#111111" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  advertencia:
    '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="29" fill="none" stroke="#C5A869" stroke-width="4"/><path d="M32 17v20" stroke="#111111" stroke-width="5" stroke-linecap="round"/><circle cx="32" cy="46" r="3.5" fill="#111111"/></svg>',
  error:
    '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="29" fill="none" stroke="#111111" stroke-width="4"/><path d="M22 22l20 20M42 22 22 42" stroke="#111111" stroke-width="5" stroke-linecap="round"/></svg>',
};

let elementoAnterior: HTMLElement | null = null;
let preparado = false;

function obtener<T extends HTMLElement>(id: string): T {
  return document.getElementById(id) as T;
}

function preparar() {
  if (preparado) return;
  preparado = true;
  const dialogo = obtener<HTMLDialogElement>('aviso');

  obtener('aviso-cerrar').addEventListener('click', () => dialogo.close());

  // Un toque fuera de la caja (sobre el fondo oscuro) también cierra
  dialogo.addEventListener('click', (evento) => {
    if (evento.target === dialogo) dialogo.close();
  });

  // Al cerrar (botón, Escape o fondo), el foco vuelve a donde estaba
  dialogo.addEventListener('close', () => elementoAnterior?.focus());
}

export function mostrarAviso({ titulo, texto, tipo, focoAlCerrar }: OpcionesAviso) {
  preparar();
  const dialogo = obtener<HTMLDialogElement>('aviso');
  const elTitulo = obtener('aviso-titulo');

  obtener('aviso-icono').innerHTML = ICONOS[tipo];
  elTitulo.textContent = titulo ?? '';
  elTitulo.hidden = !titulo;
  obtener('aviso-texto').textContent = texto;

  // Nombre del aviso para lectores de pantalla: el título, o el texto si no hay título
  if (titulo) {
    dialogo.setAttribute('aria-labelledby', 'aviso-titulo');
    dialogo.setAttribute('aria-describedby', 'aviso-texto');
  } else {
    dialogo.setAttribute('aria-labelledby', 'aviso-texto');
    dialogo.removeAttribute('aria-describedby');
  }

  elementoAnterior = focoAlCerrar ?? (document.activeElement as HTMLElement | null);
  if (dialogo.open) dialogo.close();
  dialogo.showModal();
  obtener('aviso-cerrar').focus();
}
