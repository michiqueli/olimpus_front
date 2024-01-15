"use client";

import { useState } from 'react';
import userLogin from '@/components/requests/loginUSer';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { CredentialsLogin } from '../../components/interfaces';
import Field from '../../components/field';
import { signIn } from 'next-auth/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const loginPage = () => {
    const router = useRouter();
    const [credentials, setCredentials] = useState<CredentialsLogin>({
        email:'',
        password:'',
        googlePass: '',
    })
    const [error, setError] = useState<{ [key: string]: string }>({});
    const [viewPass, setViewPass] = useState(false);
    const handleView = () => {
        if (viewPass === true){
            setViewPass(false);
        } else {
            setViewPass(true);
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCredentials((prev) => ({...prev, [name]: value}));
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setError({});
            const response = await userLogin(credentials);
            const {usuario, id, email: userEmail, token} = response;
            localStorage.setItem('userId', id)
            const variable= localStorage.getItem("userId")
            console.log(response);
            Cookies.set('jwt', token);
            router.push('/')
        } catch (error) {
            if (error instanceof Error){
                if (error.message === 'Credenciales Invalidas'){
                    setError({ email: 'Credenciales Invalidas' });
                } else {
                    console.error('Error en el inicio de sesión: ', error.message)
                }
            } 
        }
    }
    return (
        <div className='flex flex-col justify-center items-center my-4'>
            <img src="/olimpus.png" alt="" className='h-48 my-4'/>
            <div className='flex flex-col items-center h-full w-3/12 mb-4 bg-gray-100 mx-2 border border-gray-300 rounded-lg shadow'>
                <form onSubmit={handleSubmit} className='flex flex-col items-center h-full w-full mx-2'>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white'>Inicia Sesión en Olimpus Shop</h1>
                    </div>
                    <div className='flex-col justify-start w-10/12'>
                        <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Tu email:</label>
                        <Field placeholder='Tu email' name='email' onChange={handleChange} value={credentials.email}/>
                    </div>
                    {error.email && <p className="text-red-500">{error.email}</p>}
                    <div className='flex-col justify-start w-10/12'>
                        <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Tu contraseña:</label>
                        <div className='relative'>
                            <input type={viewPass ? "text" : "password"} name="password" placeholder='Tu Contraseña' className='text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 pr-10 text-start py-2 w-full focus:outline-none' value={credentials.password} onChange={handleChange} />
                            <button type='button' className='absolute top-5 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100' onClick={() => handleView()}>{viewPass ? <FaEyeSlash/> : <FaEye/>}</button> 
                        </div>
                    </div>
                    {/* {error.password && <p className="text-red-500">{error.password}</p>} */}

                    <button className='my-4 w-10/12 text-xl bg-yellow-200 hover:bg-yellow-300 text-black font-normal py-2 px-4 rounded-full'>Inicia Sesión</button>
                </form>
                <button className='mb-4 w-10/12 text-xl bg-yellow-200 hover:bg-yellow-300 text-black font-normal py-2 px-4 rounded-full'
                 onClick={async () => signIn()}>
                    Iniciar Sesión con Google
                </button>
                <div className='flex flex-row'>
                    <h1 className='block mb-2 ml-2 text-sm font-medium dark:text-white'>¿No tienes cuenta?</h1>
                    <button onClick={() => router.push('/register')} className="block mb-2 ml-2 text-sm font-medium dark:text-white hover:text-blue-800">Registrate.</button>
                </div>
            </div>
        </div>
    )
}

export default loginPage;