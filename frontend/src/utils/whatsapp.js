/**
 * Generates a WhatsApp link with a pre-filled message
 * @param {string} phone - Phone number with country code (e.g. 542974277686)
 * @param {string} message - Message to encode
 * @returns {string} - WhatsApp API link
 */
export const getWhatsAppLink = (phone, message) => {
    const cleanPhone = phone.replace(/\s+/g, '').replace('+', '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

export const CONTACT_PHONE = "542974277686";

export const DEFAULT_MESSAGES = {
    INSCRIPCION: (nombre = "___", dni = "___", localidad = "___") =>
        `Hola! Completé el formulario de inscripción de Psicología Social 2026. ¿Me pasás info de pago de la matrícula ($30.000 hasta 28/02/26)? Nombre: ${nombre} DNI: ${dni} Localidad: ${localidad}`,
    CONSULTA_GENERAL: "Hola! Quisiera recibir más información sobre los cursos de la Escuela Psicosocial CPSA."
};
