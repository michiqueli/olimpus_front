const getAllProducts = async () => {
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/';
        } else {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
      }
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      throw new Error(`Error desconocido al obtener productos: ${error}`);
    }
  };
  
  export default getAllProducts;
  