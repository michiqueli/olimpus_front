

interface ValidationErrors {
    name?: string;
    email?: string;
    password?: string;
    street?: string;
    zipCode?: string;
}

const regexName = /^[a-zA-Z]+$/;
const regexEmail = /^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?/;:'"[\]{|}`~]+$/;
const regexPassword = /^(?=.*[a-zA-Z0-9!@#$%^&*()_+-=,.<>?/;:'"[\]{|}`~])[\w!@#$%^&*()_+-=,.<>?/;:'"[\]{|}`~]{6,}$/;
const regexStreet = /^[a-zA-Z0-9 ]+$/;
const regexZipCode = /^[0-9]+$/;

const validaciones = (inputs: any): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!inputs.name || typeof inputs.name !== 'string' || inputs.name.length === 0) {
        errors.name = 'Nombre requerido';
    } else if (!regexName.test(inputs.name)) {
        errors.name = 'Nombre inválido';
    }

    if (!inputs.email || typeof inputs.email !== 'string' || inputs.email.length === 0) {
        errors.email = 'Email requerido';
    } else if (!regexEmail.test(inputs.email)) {
        errors.email = 'Email inválido';
    }

    if (!inputs.password || typeof inputs.password !== 'string' || inputs.password.length === 0) {
        errors.password = 'Contraseña requerida';
    } else if (!regexPassword.test(inputs.password)) {
        errors.password = 'Contraseña inválida';
    }

    if (!inputs.street || typeof inputs.street !== 'string' || inputs.street.length === 0) {
        errors.street = 'Calle requerida';
    } else if (!regexStreet.test(inputs.street)) {
        errors.street = 'Calle inválida';
    }

    if (!inputs.zipCode || typeof inputs.zipCode !== 'string' || inputs.zipCode.length === 0) {
        errors.zipCode = 'Código postal requerido';
    } else if (!regexZipCode.test(inputs.zipCode)) {
        errors.zipCode = 'Código postal inválido';
    }

    return errors;
};

export default validaciones;
