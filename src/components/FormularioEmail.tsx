// Formulario de email: componente de React.
// En la página se carga como "isla" (client:visible): Astro lo manda como HTML
// y React lo activa recién cuando el usuario llega a esta parte de la página.
import { useRef, useState, type FormEvent } from 'react';
import { mostrarAviso } from '../scripts/avisos';
import { mensajes } from '../data/textos';

interface Props {
  endpoint: string;
  avisoPrivacidad: string;
  textos: {
    titulo: string;
    nombre: string;
    dni: string;
    email: string;
    telefono: string;
    mensaje: string;
    casilla: string;
    boton: string;
  };
}

type Campo = 'nombre' | 'dni' | 'email' | 'telefono' | 'mensaje';
type Errores = Partial<Record<Campo, string>>;

const VACIO = { nombre: '', dni: '', email: '', telefono: '', mensaje: '' };
const ORDEN: Campo[] = ['nombre', 'dni', 'email', 'telefono', 'mensaje'];

/** Revisa los campos y devuelve un mensaje simple por cada problema */
function validar(datos: typeof VACIO): Errores {
  const errores: Errores = {};
  if (!datos.nombre.trim()) errores.nombre = mensajes.errorNombre;
  if (!datos.dni.trim()) errores.dni = mensajes.errorDni;
  else if (!/^[0-9.\s]+$/.test(datos.dni.trim())) errores.dni = mensajes.errorDniFormato;
  if (!datos.email.trim()) errores.email = mensajes.errorEmail;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email.trim())) errores.email = mensajes.errorEmailFormato;
  if (!datos.mensaje.trim()) errores.mensaje = mensajes.errorConsulta;
  return errores;
}

export default function FormularioEmail({ endpoint, avisoPrivacidad, textos }: Props) {
  const [datos, setDatos] = useState(VACIO);
  const [acepta, setAcepta] = useState(false);
  const [errores, setErrores] = useState<Errores>({});
  const [enviando, setEnviando] = useState(false);
  const formulario = useRef<HTMLFormElement>(null);
  const trampa = useRef<HTMLInputElement>(null);
  const casilla = useRef<HTMLInputElement>(null);

  // Al escribir en un campo, su error desaparece
  function cambiar(campo: Campo, valor: string) {
    setDatos((d) => ({ ...d, [campo]: valor }));
    if (errores[campo]) setErrores((e) => ({ ...e, [campo]: undefined }));
  }

  async function enviar(evento: FormEvent) {
    // Evitamos que el formulario recargue la página
    evento.preventDefault();
    if (enviando) return;

    const nuevosErrores = validar(datos);
    setErrores(nuevosErrores);
    const primerError = ORDEN.find((campo) => nuevosErrores[campo]);
    if (primerError) {
      formulario.current?.querySelector<HTMLElement>(`[name="${primerError}"]`)?.focus();
      return;
    }

    // Sin aceptar el tratamiento de datos no se envía
    if (!acepta) {
      mostrarAviso({ texto: mensajes.faltaAceptar, tipo: 'advertencia', focoAlCerrar: casilla.current });
      return;
    }

    const nombre = datos.nombre.trim();
    setEnviando(true);
    try {
      const respuesta = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nombre,
          dni: datos.dni.trim(),
          telefono: datos.telefono.trim(),
          email: datos.email.trim(),
          mensaje: datos.mensaje,
          acepta_tratamiento_datos: 'Sí', // Constancia de la aceptación
          _subject: `CONSULTA DE ${nombre.toUpperCase()}`, // El DNI va solo en el cuerpo
          _gotcha: trampa.current?.value ?? '', // Campo trampa: si un robot lo completa, Formspree descarta el envío
        }),
      });

      if (respuesta.ok) {
        // Limpiamos todo el formulario
        setDatos(VACIO);
        setAcepta(false);
        setErrores({});
        if (trampa.current) trampa.current.value = '';
        mostrarAviso({ titulo: mensajes.enviadoTitulo, texto: mensajes.enviadoTexto, tipo: 'exito' });
      } else {
        mostrarAviso({ titulo: mensajes.errorEnvioTitulo, texto: mensajes.errorEnvioTexto, tipo: 'error' });
      }
    } catch {
      mostrarAviso({ titulo: mensajes.errorConexionTitulo, texto: mensajes.errorConexionTexto, tipo: 'error' });
    } finally {
      setEnviando(false);
    }
  }

  // Un campo con su etiqueta visible y su mensaje de error
  function campo(nombre: Campo, etiqueta: string, propiedades: Record<string, string>) {
    const idCampo = `mail-${nombre}`;
    const idError = `error-mail-${nombre}`;
    const comunes = {
      id: idCampo,
      name: nombre,
      value: datos[nombre],
      'aria-invalid': errores[nombre] ? true : undefined,
      'aria-describedby': errores[nombre] ? idError : undefined,
      ...propiedades,
    };
    return (
      <div className="campo">
        <label htmlFor={idCampo} className="etiqueta">{etiqueta}</label>
        {nombre === 'mensaje' ? (
          <textarea {...comunes} onChange={(e) => cambiar(nombre, e.target.value)} />
        ) : (
          <input {...comunes} onChange={(e) => cambiar(nombre, e.target.value)} />
        )}
        {errores[nombre] && <p className="error-campo" id={idError}>{errores[nombre]}</p>}
      </div>
    );
  }

  return (
    <form className="caja-form" id="form-email" noValidate onSubmit={enviar} ref={formulario} aria-busy={enviando}>
      <h3>
        <svg className="icono icono-mail" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </g>
        </svg>{' '}
        {textos.titulo}
      </h3>

      {campo('nombre', textos.nombre, { type: 'text', autoComplete: 'name' })}
      {campo('dni', textos.dni, { type: 'text', inputMode: 'numeric', autoComplete: 'off' })}
      {campo('email', textos.email, { type: 'email', autoComplete: 'email', spellCheck: 'false' })}
      {campo('telefono', textos.telefono, { type: 'tel', autoComplete: 'tel' })}
      {campo('mensaje', textos.mensaje, {})}

      {/* Campo trampa (honeypot): oculto para las personas, los robots lo completan */}
      <div className="campo-trampa" aria-hidden="true">
        <label htmlFor="mail-gotcha">No completar</label>
        <input type="text" id="mail-gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" ref={trampa} defaultValue="" />
      </div>

      <p className="aviso-privacidad" id="aviso-privacidad">{avisoPrivacidad}</p>
      <label className="casilla-privacidad">
        <input type="checkbox" id="mail-acepta" name="acepta_tratamiento_datos" aria-describedby="aviso-privacidad"
          checked={acepta} onChange={(e) => setAcepta(e.target.checked)} ref={casilla} />
        {textos.casilla}
      </label>

      <button type="submit" className="btn" disabled={enviando}>
        {enviando ? mensajes.enviando : textos.boton}
      </button>
    </form>
  );
}
