// Formulario de email: componente de React.
// En la página se carga como "isla" (client:visible): Astro lo manda como HTML
// y React lo activa recién cuando el usuario llega a esta parte de la página.
import { useState, type FormEvent } from 'react';
import { mostrarAviso } from '../scripts/avisos';

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

const VACIO = { nombre: '', dni: '', email: '', telefono: '', mensaje: '', acepta: false };

export default function FormularioEmail({ endpoint, avisoPrivacidad, textos }: Props) {
  const [datos, setDatos] = useState(VACIO);

  const cambiar = (campo: keyof typeof VACIO, valor: string | boolean) => setDatos((d) => ({ ...d, [campo]: valor }));

  async function enviar(evento: FormEvent) {
    // Evitamos que el formulario recargue la página
    evento.preventDefault();

    const nombre = datos.nombre;
    const dni = datos.dni.trim();
    const correo = datos.email.trim();
    const telefono = datos.telefono.trim();
    const mensaje = datos.mensaje;

    if (!nombre || !dni || !correo || !mensaje) {
      mostrarAviso({ titulo: 'Campos incompletos', texto: 'Por favor, completá todos los campos obligatorios antes de enviar.', tipo: 'advertencia' });
      return;
    }

    // Sin aceptar el tratamiento de datos no se envía
    if (!datos.acepta) {
      mostrarAviso({ texto: 'Para enviar su consulta, necesitamos que acepte el tratamiento de sus datos.', tipo: 'advertencia' });
      return;
    }

    try {
      const respuesta = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nombre,
          dni,
          telefono,
          email: correo,
          mensaje,
          acepta_tratamiento_datos: 'Sí', // Constancia de la aceptación
          _subject: `CONSULTA DE ${nombre.toUpperCase()}`, // El DNI va solo en el cuerpo
        }),
      });

      if (respuesta.ok) {
        mostrarAviso({ titulo: '¡Consulta enviada!', texto: 'Nos comunicaremos a la brevedad.', tipo: 'exito' });
        setDatos(VACIO);
      } else {
        mostrarAviso({ titulo: 'Error', texto: 'Hubo un error al enviar el correo. Por favor, intente vía WhatsApp.', tipo: 'error' });
      }
    } catch {
      mostrarAviso({ titulo: 'Error de conexión', texto: 'Error de conexión. Por favor, intente nuevamente.', tipo: 'error' });
    }
  }

  return (
    <form className="caja-form" id="form-email" noValidate onSubmit={enviar}>
      <h3>
        <svg className="icono icono-mail" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </g>
        </svg>{' '}
        {textos.titulo}
      </h3>
      <label htmlFor="mail-nombre" className="solo-lectores">{textos.nombre}</label>
      <input type="text" id="mail-nombre" name="nombre" placeholder={textos.nombre} autoComplete="name"
        value={datos.nombre} onChange={(e) => cambiar('nombre', e.target.value)} />
      <label htmlFor="mail-dni" className="solo-lectores">{textos.dni}</label>
      <input type="text" id="mail-dni" name="dni" placeholder={textos.dni} inputMode="numeric" autoComplete="off"
        value={datos.dni} onChange={(e) => cambiar('dni', e.target.value)} />
      <label htmlFor="mail-correo" className="solo-lectores">{textos.email}</label>
      <input type="email" id="mail-correo" name="email" placeholder={textos.email} autoComplete="email"
        value={datos.email} onChange={(e) => cambiar('email', e.target.value)} />
      <label htmlFor="mail-telefono" className="solo-lectores">{textos.telefono}</label>
      <input type="tel" id="mail-telefono" name="telefono" placeholder={textos.telefono} autoComplete="tel"
        value={datos.telefono} onChange={(e) => cambiar('telefono', e.target.value)} />
      <label htmlFor="mail-mensaje" className="solo-lectores">{textos.mensaje}</label>
      <textarea id="mail-mensaje" name="mensaje" placeholder={`${textos.mensaje}...`}
        value={datos.mensaje} onChange={(e) => cambiar('mensaje', e.target.value)} />
      <p className="aviso-privacidad" id="aviso-privacidad">{avisoPrivacidad}</p>
      <label className="casilla-privacidad">
        <input type="checkbox" id="mail-acepta" name="acepta_tratamiento_datos" aria-describedby="aviso-privacidad"
          checked={datos.acepta} onChange={(e) => cambiar('acepta', e.target.checked)} />
        {textos.casilla}
      </label>
      <button type="submit" className="btn">{textos.boton}</button>
    </form>
  );
}
