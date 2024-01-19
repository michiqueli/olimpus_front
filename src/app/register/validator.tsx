interface ValidationErrors {
    name?: string;
    email?: string;
    password?: string;
    street?: string;
    zipCode?: string;
}

const regexName = /^[a-zA-Z\s]+$/;
const regexEmail = /^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?/;:'"[\]{|}`~]+$/;
const regexPassword = /^(?=.*[a-zA-Z0-9!@#$%^&*()_+-=,.<>?/;:'"[\]{|}`~])[\w!@#$%^&*()_+-=,.<>?/;:'"[\]{|}`~]{6,}$/;
const regexStreet = /^[a-zA-Z0-9 ]+$/;
const regexZipCode = /^[0-9]+$/;

const validaciones = (inputs: any): ValidationErrors => {
    const errors: ValidationErrors = {};


    if (inputs.name) {
        if (typeof inputs.name !== 'string' || inputs.name.length === 0) {
            errors.name = 'Nombre requerido';
        } else if (!regexName.test(inputs.name)) {
            errors.name = 'Nombre inválido';
        } else if (inputs.name.length > 20) {
            errors.name = 'El nombre no puede tener más de 15 caracteres';
        } else {
            delete errors.name;
        }
    }


    if (inputs.email) {
        if (typeof inputs.email !== 'string' || inputs.email.length === 0) {
            errors.email = 'Email requerido';
        } else if (!regexEmail.test(inputs.email)) {
            errors.email = 'Email inválido';
        } else if (inputs.email.length > 40) {
            errors.email = 'El email no puede tener más de 40 caracteres';
        } else {
            delete errors.email;
        }
    }

    if (inputs.password) {
        if (typeof inputs.password !== 'string' || inputs.password.length === 0) {
            errors.password = 'Contraseña requerida';
        } else if (!regexPassword.test(inputs.password)) {
            errors.password = 'Contraseña inválida';
        } else if (inputs.password.length < 4 || inputs.password.length >10) {
            errors.password = 'La contraseña debe tener entre 4 y 10 carácteres';
        } else {
            delete errors.password;
        }
    }

    if (inputs.street) {
        if (typeof inputs.street !== 'string' || inputs.street.length === 0) {
            errors.street = 'Calle requerida';
        } else if (!regexStreet.test(inputs.street)) {
            errors.street = 'Calle inválida';
        } else if (inputs.street.length > 40) {
            errors.street = 'La calle no puede tener más de 40 caracteres';
        } else {
            delete errors.street;
        }
    }

    if (inputs.zipCode) {
        if (typeof inputs.zipCode !== 'string' || inputs.zipCode.length === 0) {
            errors.zipCode = 'Código postal requerido';
        } else if (!regexZipCode.test(inputs.zipCode)) {
            errors.zipCode = 'Código postal inválido';
        } else if (inputs.zipCode.length < 2 || inputs.zipCode.length > 4) {
            errors.zipCode = 'El código postal debe ser de 4 carácteres';
        } else {
            delete errors.zipCode;
        }
    }

    return errors;
};


export default validaciones;

