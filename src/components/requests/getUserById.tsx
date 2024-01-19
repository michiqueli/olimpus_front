
const getUserById = async (id : string | string[]) => {
    const storedToken = 'token';
    try {
      if (storedToken !== null) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`, {
          method: 'GET',
        });
        
        const data = await response.json();
  
        return data;
      } else {
        window.alert("Usuario no encontrado");
      }
    } catch (error) {
        throw new Error(`Error desconocido al obtener elk usuario: ${error}`);
    }
  };
  
  export default getUserById;
  