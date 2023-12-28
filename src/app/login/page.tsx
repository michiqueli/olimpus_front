"use client";

import { FormEvent, useState } from 'react';
import Field from '../components/field';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import userLogin from '../requests/loginUser';
import { LoginError, CredentialsLoginResponse } from '../components/interfaces';

const loginPage = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState<LoginError>({});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    };
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const result: CredentialsLoginResponse = await userLogin(userData);
            if(result.emailExists){
                if(result.credentialsMatch){
                    router.push('/');
                } else {
                    setError({password: 'Contraseña Incorrecta'});
                }
            } else {
                setError({email: 'El correo no se encuentra registrado'});
            }
        } catch (error) {
            setError({email: 'Error desconocido'});
            console.error(error);
        }
    };
    return (
        <div className='flex flex-col justify-center items-center my-4'>
            <img src="/olimpus.png" alt="" className='h-48 my-4'/>
            <form onSubmit={handleSubmit} className='flex flex-col items-center h-full w-3/12 mb-4 bg-gray-100 mx-2 border border-gray-300 rounded-lg shadow'>
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white'>Inicia Sesión en Olimpus Shop</h1>
                </div>
                <div className='flex-col justify-start w-10/12'>
                    <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Tu email:</label>
                    <Field placeholder='Tu email' name='email' onChange={handleChange} value={userData.email}/>
                </div>
                {error.email && <p className="text-red-500">{error.email}</p>}
                <div className='flex-col justify-start w-10/12'>
                    <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Tu contraseña:</label>
                    <Field placeholder='Tu contraseña' name='password' onChange={handleChange} value={userData.password}/>
                </div>
                {error.password && <p className="text-red-500">{error.password}</p>}
                {/* <div className='flex'>
                    <div className='flex flex-row justify-start mr-28'>
                        <input type="checkbox" className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'/>
                        <p className='block mb-2 ml-2 text-sm font-medium dark:text-white'>Recuerdame</p>
                    </div>
                    <div className='flex flex-row justify-end'>
                        <h1 className='block mb-2 ml-2 text-sm font-medium dark:text-white'>¿Olvidaste tu contraseña?</h1>
                    </div>
                </div> */}
                <button className='my-4 w-10/12 text-xl bg-yellow-200 hover:bg-yellow-300 text-black font-normal py-2 px-4 rounded-full'>Inicia Sesión</button>
                <button className='mb-4 w-10/12 text-xl bg-yellow-200 hover:bg-yellow-300 text-black font-normal py-2 px-4 rounded-full' onClick={() => signIn()}>Iniciar Sesión con Google</button>
                <div className='flex flex-row'>
                    <h1 className='block mb-2 ml-2 text-sm font-medium dark:text-white'>¿No tienes cuenta?</h1>
                    <button onClick={() => router.push('/register')} className="block mb-2 ml-2 text-sm font-medium dark:text-white hover:text-blue-800">Registrate.</button>
                </div>
            </form>
        </div>
    )
}

export default loginPage;