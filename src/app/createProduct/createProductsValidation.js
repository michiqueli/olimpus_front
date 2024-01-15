const validator = (data) => {
    let errors = {};
    if(!data.name){
        errors.n1 = 'Ingrese el nombre del producto'
    }
    if(/^[A-Z][a-z]*$/.test(data.name)){
        errors.n2 = 'El nombre del producto debe empezar con mayúsculas'
    }
    if(!data.price){
        errors.p1 = 'Ingrese el valor del producto'
    }
    if(/^(\+|-)?\d+$/.test(data.price)){
        errors.p2 = 'Ingrese un número'
    }
    if(!data.brandp){
        errors.b1 = 'Ingrese la marca del producto'
    }
    if(/^[A-Z][a-z]*$/.test(data.brandp)){
        errors.b2 = 'El nombre de la marca del producto debe empezar con mayúsculas'
    }
    if(!data.description){
        errors.d1 = 'Ingrese la descripción del producto'
    }
    if(data.description.length < 20){
        errors.d2 = 'La descripción debe tener al menos 20 caracteres'
    }
    return errors;
}

export default validator;
