export const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validateInscripcion = (data) => {
    const errors = {};

    if (!data.nombre?.trim()) errors.nombre = "El nombre es requerido";
    if (!data.dni?.trim()) errors.dni = "El DNI es requerido";
    if (!data.email?.trim()) {
        errors.email = "El email es requerido";
    } else if (!isValidEmail(data.email)) {
        errors.email = "El formato de email no es válido";
    }
    if (!data.telefono?.trim()) errors.telefono = "El teléfono/WhatsApp es requerido";
    if (!data.localidad?.trim()) errors.localidad = "La localidad es requerida";
    if (!data.curso) errors.curso = "Debe seleccionar un curso";
    if (!data.declaracion) errors.declaracion = "Debe aceptar la declaración jurada";

    return errors;
};
