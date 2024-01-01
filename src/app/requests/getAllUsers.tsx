const getAllUsers = async () => {
  const storedToken = localStorage.getItem('token');
  try {
    if (storedToken !== null) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
        method: 'GET',
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/'; 
        } else {
          throw new Error('Error al activar el usuario' + response);
        }
      } 
      
      const data = await response.json(); // Obtener los datos del cuerpo de la respuesta JSON

      return data; // Devolver los datos
    } else {
      window.alert("Usuario eliminado exitosamente");
      return []; // Devolver un array vacío si no hay token
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("No editó el usuario: " + error.message);
    } else {
      throw new Error("Error desconocido: " + String(error));
    }
  }
};

export default getAllUsers;
