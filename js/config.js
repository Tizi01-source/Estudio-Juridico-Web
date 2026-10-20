
// =========================================
//   CONFIGURACIÓN DEL ESTUDIO
//   Los datos que pueden cambiar se editan acá, en un solo lugar.
// =========================================

const CONFIG = {
    nombre: "Costantini y Asociados",
    nombreCompleto: "Estudio Jurídico Costantini y Asociados", // Igual que en Google Maps
    url: "https://www.costantiniyasociados.com/",

    // WhatsApp: código de país + número, sin el + (lo usan el botón flotante y el formulario)
    whatsappNumero: "5491122614440",
    whatsappMensaje: "Hola, quisiera hacer una consulta.",

    email: "dr.costantiniyasociados@gmail.com",

    // Aviso de privacidad del formulario de email (BORRADOR, pendiente de aprobación del estudio)
    // {email} se reemplaza automáticamente por el email de arriba
    avisoPrivacidad: "Usamos sus datos (nombre, DNI, correo y teléfono) únicamente para responder su consulta. Pueden ser procesados a través de un servicio de formularios con servidores en el exterior. Usted puede ejercer los derechos de acceso, rectificación, actualización y supresión de sus datos escribiendo a {email}. La Agencia de Acceso a la Información Pública, órgano de control de la Ley 25.326, atiende las denuncias y reclamos por incumplimientos.",

    oficinas: [
        { calle: "25 de Mayo 267", localidad: "Ciudad Autónoma de Buenos Aires", provincia: "CABA" },
        { calle: "Constitución 317", localidad: "Haedo", provincia: "Provincia de Buenos Aires" }
    ],

    // Enlaces a perfiles externos (por ejemplo, el perfil de Google cuando exista)
    perfiles: []
};
