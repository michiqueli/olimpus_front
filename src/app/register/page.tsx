"use client";
import Field from '../../components/field';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch } from '@/Redux/hooks';
import { createUser } from '@/Redux/Actions';
import validator from "./validator"
import { Errors } from '@/components/interfaces';



const RegisterPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        street: "",
        zipCode: "",
    });

    const [errors, setErrors] = useState<Errors>({});

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));

        // Valida el campo actual y actualiza los errores
        const validationErrors : any = validator({ ...userData, [name]: value });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: validationErrors[name] }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const validationErrors = validator(userData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {

            await createUser(userData, dispatch);
            alert("Registro exitoso");
            router.push('/login');
        }
    };

    const [viewPass, setViewPass] = useState(false);

    const handleView = () => {
        setViewPass((prevViewPass) => !prevViewPass);
    };

    return (
        <div className='flex flex-col justify-center items-center my-4'>
            <img src="/olimpus.png" alt="" className='h-48 my-4'/>
            <div className='flex flex-col items-center h-full w-3/12 mb-4 bg-gray-100 mx-2 border border-gray-300 rounded-lg shadow'>
                <form onSubmit={handleSubmit} className='flex flex-col items-center h-full w-full mx-2'>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white'>Registrate en Olimpus Shop</h1>
                    </div>
                    <div className='flex-col justify-start w-10/12'>
                        <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Tu nombre:</label>
                        <Field placeholder='Tu nombre' name='name' onChange={handleChange} value={userData.name}/>
                        <span className="text-red-500">{errors.name}</span>
                    </div>
                    <div className='flex-col justify-start w-10/12'>
                        <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Tu email:</label>
                        <Field placeholder='Tu email' name='email' onChange={handleChange} value={userData.email}/>
                        <span className="text-red-500">{errors.email}</span>
                    </div>
                    <div className='flex-col justify-start w-10/12'>
                        <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Tu contraseña:</label>
                        <div className='relative'>
                            <input type={viewPass ? "text" : "password"} name="password" placeholder='Tu Contraseña' className='text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 pr-10 text-start py-2 w-full focus:outline-none' value={userData.password} onChange={handleChange} />
                            <button type='button' className='absolute top-5 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100' onClick={() => handleView()}>{viewPass ? <FaEyeSlash/> : <FaEye/>}</button>
                        </div>
                        <span className="text-red-500">{errors.password}</span>
                    </div>
                    <div className='flex-col justify-start w-10/12'>
                        <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Tu dirección:</label>
                        <Field placeholder='Tu dirección' name='street' onChange={handleChange} value={userData.street}/>
                        <span className="text-red-500">{errors.street}</span>
                    </div>
                    <div className='flex-col justify-start w-10/12'>
                        <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Tu código postal:</label>
                        <Field placeholder='Tu código postal' name='zipCode' onChange={handleChange} value={userData.zipCode}/>
                        <span className="text-red-500">{errors.zipCode}</span>
                    </div>
                    <button type='submit' className='my-4 w-10/12 text-xl bg-yellow-200 hover:bg-yellow-300 text-black font-normal py-2 px-4 rounded-full'>Registrate.</button>
                </form>
                <div className='flex flex-row'>
                    <h1 className='block mb-2 ml-2 text-sm font-medium dark:text-white'>¿Ya tienes tu cuenta?</h1>
                    <button onClick={() => router.push('/login')} className="block mb-2 ml-2 text-sm font-medium dark:text-white hover:text-blue-800">Inicia Sesión.</button>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
