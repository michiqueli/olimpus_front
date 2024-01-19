"use client";

import { useRouter } from 'next/navigation';
import PrimaryButton from '../../components/buttons/primaryButton';

export default function Dashboard() {
  //const storedToken = localStorage.getItem('token');
  const router = useRouter();

  const logOut = async () => {
    try {
      //localStorage.removeItem('token');
      router.push('/');
    } catch (error) {
      throw new Error("Fallo en logout ");
    }
  }

  return (
    <div>
      <div className="h-full w-full my-6">
        <div className='flex flex-col mt-32 items-center'>
          <div className='justify-arround '>
            <PrimaryButton onClickfunction={()=> router.push('/')} title='Usuarios'/>
            <PrimaryButton onClickfunction={() => router.push('/')} title='Crear usuario'/>
          </div>
          <div className='flex justify-arround'>
            <PrimaryButton onClickfunction={() => router.push('/')} title='Transacciones'/>
            <PrimaryButton onClickfunction={() => router.push('/')} title='Crear transacción'/>
          </div>
          <div className='flex justify-arround'>
            <PrimaryButton onClickfunction={() => router.push('/')} title='Ingresos'/>
            <PrimaryButton onClickfunction={() => router.push('/')} title='Stocks'/>
          </div>
          <div className='flex justify-arround '>
            <PrimaryButton onClickfunction={() => router.push('/')} title='Productos'/>
            <PrimaryButton onClickfunction={() => router.push('/createProduct')} title='Crear producto'/>
          </div>
        </div>
      </div>
    </div>
  )
};