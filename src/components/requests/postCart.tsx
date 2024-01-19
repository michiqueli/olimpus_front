const postCart = async (data: any, userId: string, cartId: number) => {
    try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/carts/addproducts/${userId}/${cartId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          if (!response.ok) {
            const errorMessage = await response.text();
    
            if (response.status === 401) {
              window.location.href = '/';
            } else {
              throw new Error(`Error al guardar el Carrito: ${errorMessage}`);
            }
          }
          const responseData = await response.json();
          return responseData
      } catch (error) { 
        if (error instanceof Error) {
          window.alert(error.message);
        } else {
          window.alert("Ocurrió un error, reintente por favor.");
        }
  
    };
}

export default postCart;
