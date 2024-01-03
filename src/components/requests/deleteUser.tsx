import { Users } from "../interfaces";

const deleteUser = async (id: number, setUsers: React.Dispatch<React.SetStateAction<Users[]>>) => {
  const storedToken = 'token';
  try {
    if (storedToken !== null) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: storedToken,
        },
        body: JSON.stringify({ id: id.toString() }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/';
        } else {
          throw new Error('Error al eliminar el usuario' + response);
        }
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } else {
      window.alert("Usuario eliminado exitosamente");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("No eliminó el usuario: " + error.message);
    } else {
      throw new Error("Error desconocido: " + String(error));
    }
  }
};

export default deleteUser;