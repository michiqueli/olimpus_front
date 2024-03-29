"use client";

import { useRouter } from 'next/navigation';
import { useState} from "react";
import validations from './validationsUser';
import postUser from '../../components/requests/postUser';
import { UserPost } from '../../components/interfaces';

export default function CreateUser () {

  const storedToken = 'token';
  const router = useRouter();
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    password: "",
    dni: "",
});

const [userData, setUserData] = useState<UserPost>({
    dni: "",
    username: "",
    password: "",        
    name: "",
    roleId: null,
  })

    const handleChange = (e: React.FormEvent) => {
      const property = (e.target as HTMLInputElement).name;
      const value = (e.target as HTMLInputElement).value;
  
      setUserData({ ...userData, [property]: value });
    };
  
    const handleBlur = () => {
      // Validar el campo correspondiente y actualizar los errores
      const validationErrors = validations(userData);
      setErrors({ ...errors, ...validationErrors });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      // Validar todos los campos antes de enviar el formulario
      const validationErrors = validations(userData);
      setErrors(validationErrors);
  
      // Continuar solo si no hay errores
      if (Object.values(validationErrors).every((error) => error === "")) {  
        try {
          const response = await postUser(userData);
        
          if (response && response.status === 200) {
            router.push('/allUsers');
          } else if (response) {
            const apiErrors = await response.json();
            window.alert(`Errores de la API:\n${apiErrors.join('\n')}`);
          }
        } catch (error: any) {
          if (error.response) {
            const apiErrors = await error.response.json();
            window.alert(`Errores de la API:\n${apiErrors.join('\n')}`);
          } else {
            console.error("Error desconocido:", error);
          }
        }        
        
      }
    };
    
let roles = [2, 3];

    return (
    <div>
      <div className="justify-center">
        {!storedToken ? (
          <p className="text-black text-xl ">
            No tenes permiso para crear usuarios
          </p>
                        ) : (
          <div className="flex justify-center mt-32 h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-1/2">
              <select
                className="rounded-2xl border border-custom-red w-1/2 h-8 text-center text-black"
                onChange={handleChange}
                required
                name="roleId"
                value={userData.roleId !== null ? userData.roleId : ""}
                >
                <option value="" disabled defaultValue="" hidden>
                    Seleccionar rol
                </option>
                {roles.map((roleId, index) => (
                    <option key={index} value={roleId}>
                    {roleId === 2 ? "Admin" : roleId === 3 ? "Buyer" : ""}
                    </option>
                ))}
              </select>
                <input
                name="name"
                placeholder="Nombre" 
                className="rounded-2xl border border-custom-red w-1/2 text-center text-black mt-4"
                value={userData.name}
                onChange={handleChange}
                required/>
                <p className='text-custom-red'>{errors.name}</p>
                <input 
                name="username"
                placeholder="Username" 
                className="rounded-2xl border border-custom-red w-1/2 text-center text-black mt-4"
                value={userData.username}
                onChange={handleChange}
                required/>
                <p className='text-custom-red'>{errors.username}</p>
                <input 
                name="dni"
                type="number"
                placeholder="DNI" className="rounded-2xl border border-custom-red w-1/2 text-center text-black mt-4"
                value={userData.dni}
                onChange={handleChange}
                required/>
                <p className='text-custom-red'>{errors.dni}</p>
                <input 
                name="password"
                placeholder="Contraseña"
                className={userData.roleId == 3 ? "rounded-2xl border border-custom-red w-1/2 text-center text-black mt-4" : "rounded-2xl border border-custom-red w-1/2 text-center text-black mt-4"}
                value={userData.password}
                onChange={handleChange}
                required/>
                <p className='text-custom-red'>{errors.password}</p>
                {/* <input
                name="repite-pass" placeholder="Repetir contraseña" 
                className="rounded-2xl border border-custom-red w-1/2 text-center text-black mb-4"
                value={repitePass}
                onChange={(e) => setRepeatePass(e.target.value)}
                required
                />
                {passwordError && <p className="text-red-500">{passwordError}</p>} */}
                <button type="submit" 
                className="w-2/4 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4">
                    Crear usuario
                </button>
        </form>
        </div>
          )}
          </div>
    </div>
    )
}