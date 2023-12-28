"use client";

import { useState } from 'react';
import Field from '../components/field';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";

const RegisterPage = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        street: "",
        zipCode: "",
    })
    const handleChange = () => {};
    const handleSubmit = () => {};
  return (
    <div className='flex flex-col justify-center items-center my-4'>
    <img src="/olimpus.png" alt="" className='h-48 my-4'/>
    <form onSubmit={handleSubmit} className='flex flex-col items-center h-full w-3/12 mb-4 bg-gray-100 mx-2 border border-gray-300 rounded-lg shadow'>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white'>Registrate en Olimpus Shop</h1>
        </div>
        <div className='flex-col justify-start w-10/12'>
            <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Tu nombre:</label>
            <Field placeholder='Tu nombre' name='name' onChange={handleChange} value={userData.name}/>
        </div>
        <div className='flex-col justify-start w-10/12'>
            <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Tu email:</label>
            <Field placeholder='Tu email' name='email' onChange={handleChange} value={userData.email}/>
        </div>
        <div className='flex-col justify-start w-10/12'>
            <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Tu contraseña:</label>
            <Field placeholder='Tu contraseña' name='password' onChange={handleChange} value={userData.password}/>
        </div>
        <div className='flex-col justify-start w-10/12'>
            <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Tu dirección:</label>
            <Field placeholder='Tu dirección' name='street' onChange={handleChange} value={userData.street}/>
        </div>
        <div className='flex-col justify-start w-10/12'>
            <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Tu código postal:</label>
            <Field placeholder='Tu código postal' name='zipCode' onChange={handleChange} value={userData.zipCode}/>
        </div>
        <button className='my-4 w-10/12 text-xl bg-yellow-200 hover:bg-yellow-300 text-black font-normal py-2 px-4 rounded-full'>Registrate.</button>
        <div className='flex flex-row'>
            <h1 className='block mb-2 ml-2 text-sm font-medium dark:text-white'>¿Ya tienes tu cuenta?</h1>
            <button onClick={() => router.push('/login')} className="block mb-2 ml-2 text-sm font-medium dark:text-white hover:text-blue-800">Inicia Sesión.</button>
        </div>
    </form>
</div>
  )
}

export default RegisterPage;