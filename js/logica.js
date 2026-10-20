
// EFECTO DEL MENÚ AL HACER SCROLL
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled'); // Cambia a negro sólido
    } else {
        navbar.classList.remove('scrolled'); // Vuelve a transparente
    }
});

// ARMA EL LINK DE WHATSAPP (número de config.js + texto codificado para la URL)
function linkWhatsApp(texto) {
    return `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(texto)}`;
}

// LÓGICA PARA ENVIAR WHATSAPP
function enviarWhatsApp(evento) {
    // Evitamos que el formulario recargue la página
    evento.preventDefault();

    // Capturamos los valores de los inputs
    const nombre = document.getElementById('wa-nombre').value;
    const mensaje = document.getElementById('wa-mensaje').value;

    // Validamos que no envíen vacío
    if (!nombre || !mensaje) {
        Swal.fire({
            title: 'Campos incompletos',
            text: 'Por favor, complete su nombre y mensaje.',
            icon: 'warning',
            confirmButtonColor: '#C5A869'
        });
        return;
    }

    // Armamos el texto
    const textoFinal = `Hola, mi nombre es ${nombre}. Quería realizar la siguiente consulta: ${mensaje}`;

    // Abrimos WhatsApp en una pestaña nueva
    window.open(linkWhatsApp(textoFinal), '_blank');
}

// LÓGICA PARA ENVIAR EMAIL
async function enviarEmail(evento) {
    // Evitamos que el formulario recargue la página
    evento.preventDefault();
    const formulario = evento.target;

    // Capturamos los valores
    const nombre = document.getElementById('mail-nombre').value;
    const dni = document.getElementById('mail-dni').value.trim();
    const correo = document.getElementById('mail-correo').value.trim();
    const telefono = document.getElementById('mail-telefono').value.trim();
    const mensaje = document.getElementById('mail-mensaje').value;

    // Validamos
    if (!nombre || !dni || !correo || !mensaje) {
        Swal.fire({
            title: 'Campos incompletos',
            text: 'Por favor, completá todos los campos obligatorios antes de enviar.',
            icon: 'warning', // El ícono amarillo de exclamación
            confirmButtonColor: '#C5A869'
        });
        return;
    }

    // Sin aceptar el tratamiento de datos no se envía
    if (!document.getElementById('mail-acepta').checked) {
        Swal.fire({
            text: 'Para enviar su consulta, necesitamos que acepte el tratamiento de sus datos.',
            icon: 'warning',
            confirmButtonColor: '#C5A869'
        });
        return;
    }

    // Endpoint de Formspree
    const formspreeUrl = "https://formspree.io/f/mkjnwgag"

    // Estructura de los datos + Asunto dinámico (el DNI va solo en el cuerpo)
    const datos = {
        nombre: nombre,
        dni: dni,
        telefono: telefono,
        email: correo,
        mensaje: mensaje,
        acepta_tratamiento_datos: "Sí", // Constancia de la aceptación
        _subject: `CONSULTA DE ${nombre.toUpperCase()}`
    };

    try {
        const respuesta = await fetch(formspreeUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(datos)
        });

        if (respuesta.ok) {
            Swal.fire({
                title: '¡Consulta enviada!',
                text: 'Nos comunicaremos a la brevedad.',
                icon: 'success',
                confirmButtonColor: '#C5A869'
            });

            // Limpiamos todos los campos del formulario
            formulario.reset();
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al enviar el correo. Por favor, intente vía WhatsApp.',
                icon: 'error',
                confirmButtonColor: '#C5A869'
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Error de conexión',
            text: 'Error de conexión. Por favor, intente nuevamente.',
            icon: 'error',
            confirmButtonColor: '#C5A869'
        });
    }
}

// DATOS ESTRUCTURADOS PARA GOOGLE (JSON-LD), armados con los datos de config.js
function agregarDatosEstructurados() {
    const datos = {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": CONFIG.nombreCompleto,
        "alternateName": CONFIG.nombre,
        "url": CONFIG.url,
        "telephone": `+${CONFIG.whatsappNumero}`,
        "email": CONFIG.email,
        "image": `${CONFIG.url}assets/og-image.jpg`,
        "logo": `${CONFIG.url}assets/logo-estudio-512.png`,
        "address": CONFIG.oficinas.map(oficina => ({
            "@type": "PostalAddress",
            "streetAddress": oficina.calle,
            "addressLocality": oficina.localidad,
            "addressRegion": oficina.provincia,
            "addressCountry": "AR"
        }))
    };

    // Solo se agrega si hay perfiles cargados en config.js
    if (CONFIG.perfiles.length > 0) {
        datos.sameAs = CONFIG.perfiles;
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(datos);
    document.head.appendChild(script);
}

agregarDatosEstructurados();

document.addEventListener("DOMContentLoaded", () => {
    const logoBtn = document.getElementById('logo-btn');
    const navbar = document.getElementById('navbar');
    const links = document.querySelectorAll('.nav-link');
    const btnCerrar = document.getElementById('btn-cerrar');

    // Formularios: el Enter y el botón disparan el evento "submit"
    document.getElementById('form-whatsapp').addEventListener('submit', enviarWhatsApp);
    document.getElementById('form-email').addEventListener('submit', enviarEmail);

    // Aviso de privacidad con el email de config.js (textContent: se inserta como texto, nunca como HTML)
    document.getElementById('aviso-privacidad').textContent = CONFIG.avisoPrivacidad.replaceAll('{email}', CONFIG.email);

    // Botón flotante de WhatsApp con el mensaje precargado
    document.getElementById('btn-whatsapp').href = linkWhatsApp(CONFIG.whatsappMensaje);

    // Mientras se escribe en un formulario, el botón flotante se esconde (en celular) para no tapar los campos
    document.querySelectorAll('#contacto form').forEach(formulario => {
        formulario.addEventListener('focusin', () => document.body.classList.add('escribiendo'));
        formulario.addEventListener('focusout', () => document.body.classList.remove('escribiendo'));
    });

    // Al tocar la crucecita, el panel se vuelve a esconder
    if (btnCerrar) {
        btnCerrar.addEventListener('click', () => {
            navbar.classList.remove('abierto');
        });
    }

    // Al tocar el logo, abrimos o cerramos el menú
    if (logoBtn) {
        logoBtn.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navbar.classList.toggle('abierto');
            }
        });
    }

    // Al tocar cualquier enlace, cerramos el menú automáticamente
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navbar.classList.remove('abierto');
            }
        });
    });

    // Efecto Scrolled: Oscurecer barra y achicar logo en PC
    window.addEventListener('scroll', () => {
        // Solo aplica si estamos en PC (más de 768px de ancho)
        if (window.innerWidth > 768) {
            if (window.scrollY > 50) {
                if (navbar) navbar.classList.add('scrolled');
                if (logoBtn) logoBtn.classList.add('logo-achicado');
            } else {
                if (navbar) navbar.classList.remove('scrolled');
                if (logoBtn) logoBtn.classList.remove('logo-achicado');
            }
        }
    });

});


