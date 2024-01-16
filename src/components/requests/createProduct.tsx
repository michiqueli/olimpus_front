import { ProductInterface } from "../interfaces";

const createProduct = async (product: ProductInterface) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        if (!response.ok){
            throw new Error('Error al crear el producto');
        }
        const responseData = await response.json();
        window.alert(`Producto creado exitosamente. ID: ${responseData.name}`);
    } catch (error) {
        if (error instanceof Error) {
            window.alert(error.message);
        } else {
            window.alert('Error desconocido al crear el producto');
        }
    }
}

export default createProduct;
