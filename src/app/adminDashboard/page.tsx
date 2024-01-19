"use client";

import { useRouter } from 'next/navigation';
import PrimaryButton from '../../components/buttons/primaryButton';

export default function Dashboard() {
  const router = useRouter();

  const logOut = async () => {
    try {
      router.push('/');
    } catch (error) {
      throw new Error("Fallo en logout ");
    }
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto mt-10 bg-gray-300">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center">Panel de administración</div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              <PrimaryButton onClickfunction={() => router.push("/allUsers")} title='Usuarios'/>
            </span>
            <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              <PrimaryButton onClickfunction={() => router.push('/register')} title='Crear usuario'/>
            </span>
          </div>
          <span className="border-b border-gray-500 w-full my-2"></span>
          <div className="flex items-center mb-2">
            <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              <PrimaryButton onClickfunction={() => router.push('/catalogo')} title='Productos'/>
            </span>
            <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              <PrimaryButton onClickfunction={() => router.push('/createProduct')} title='Crear productos'/>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
};