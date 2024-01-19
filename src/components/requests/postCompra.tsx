const postCompra = async (userId: string, cartId: number) => {
    try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/purchases/addCompraToHistorial/${userId}/${cartId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            const errorMessage = await response.text();
    
            if (response.status === 401) {
              window.location.href = '/';
            } else {
              throw new Error(`Error al guardar la Compra: ${errorMessage}`);
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

export default postCompra;
