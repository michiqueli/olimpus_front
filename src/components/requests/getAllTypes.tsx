const getAllTypes = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/types`, {
            method: 'GET',
        })
        if (!response.ok){
            if(response.status === 401){
                window.location.href = '/';
            } else {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error desconocido al obtener tipos de productos: ${error}`);
    }
}

export default getAllTypes;