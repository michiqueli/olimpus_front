import { CreateProductInterface } from "../interfaces";
import Swal from 'sweetalert2'

const createProduct = async (product: CreateProductInterface) => {
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
        Swal.fire({
            title: "Nice!",
            text: `Product ${responseData.name} Creado con Exito`,
            imageUrl: `${responseData.image}`,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: `${responseData.name}`,
            timer: 3500,
            showConfirmButton: false,
          });
    } catch (error) {
        if (error instanceof Error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text:`Algo Salio mal. error: ${error.message}`,
                timer: 3500,
                showConfirmButton: false,
              });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text:`Error desconocido al crear el producto`,
              });
        }
    }
}

export default createProduct;