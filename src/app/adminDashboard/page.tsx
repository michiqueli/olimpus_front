"use client";
import { useRouter } from 'next/navigation';

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
            <button onClick={() => router.push('/')}
              className="mr-10 mb-10 w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Usuarios
            </button>
            <button onClick={() => router.push('/')}
              className="mr-10 mb-10 w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Crear usuario
            </button>
          </div>
          <div className='flex justify-arround'>
            <button onClick={() => router.push('/')}
              className="mr-10 mb-10 w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Transacciones
            </button>
            <button onClick={() => router.push('/')}
              className="mr-10 mb-10 w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Crear transacción
            </button>
          </div>
          <div className='flex justify-arround'>
            <button onClick={() => router.push('/')}
              className="mr-10 mb-10 w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Ingresos
            </button>
            <button onClick={() => router.push('/')}
              className="mr-10 mb-10 w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Stocks
            </button>
          </div>
          <div className='flex justify-arround '>
            <button onClick={() => router.push('/')}
              className="mr-10 mb-10 w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Auditoría
            </button>
            <button onClick={logOut}
              className="mr-10 mb-10 w-60 h-20 text-white bg-custom-red hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};