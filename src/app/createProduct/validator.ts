export interface ProductFormValidatorProps {
    name?: string;
    price?: string;
    stock?: string;
    description?: string;
    image?: string;
    Type?: string;
    Subtype?: string;
    Metric?: string;
}

const productFormValidations = (inputs: any): ProductFormValidatorProps => {
    const errors: ProductFormValidatorProps = {};
    if(!inputs.name || typeof inputs.name !== 'string' || inputs.name.length === 0){
        errors.name = 'Nombre requerido';
    } else if (inputs.name.length <= 3){
        errors.name = 'Nombre demasiado corto'
    } else if (inputs.name.length >= 50) {
        errors.name = 'Nombre demasiado largo'
    }

    if(!inputs.price || isNaN(parseFloat(inputs.price))){
        errors.price = 'Precio requerido'
    } else if (parseFloat(inputs.price) <= 0){
        errors.price = 'El precio tiene que ser mayor a 0'
    }

    if(!inputs.stock || isNaN(parseFloat(inputs.stock))){
        errors.stock = 'Stock requerido'
    } else if (parseFloat(inputs.stock) >= 5000) {
        errors.stock = 'Máximo de stock: 5000. Para agregar más cantidad contactarse con admin/desarrollador'
    } else if (parseFloat(inputs.stock) <= 0) {
        errors.stock = 'El stock minimo debe ser mayor a 0'
    }

    if(!inputs.description || typeof inputs.description !== 'string' || inputs.description.length === 0){
        errors.description = 'Descripción requerida'
    } else if (inputs.description.length <= 30) {
        errors.description = 'Descripción muy corta, minimo 30 caracteres'
    } else if (inputs.description.length >= 1500) {
        errors.description = 'Descripción demasiado larga, máximo 500 caracteres'
    }
    return errors;
}

export default productFormValidations;