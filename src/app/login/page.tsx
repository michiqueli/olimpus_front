"use client";

import { useState } from 'react';
import PrimaryButton from '../components/primaryButton';
import Field from '../components/field';

const loginPage = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    const handleChange = () => {};
    const handleSubmit = () => {};
    return (
        <div className='flex flex-col justify-center items-center my-4'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center h-full w-3/12'>
                <Field placeholder='Tu email' name='email' onChange={handleChange} value={userData.email}/>
                <Field placeholder='Tu contraseña' name='password' onChange={handleChange} value={userData.password}/>
                <PrimaryButton title='Iniciar Sesión' />
            </form>
        </div>
    )
}

export default loginPage;