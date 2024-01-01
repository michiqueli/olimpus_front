"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {getProductByName} from '../Redux/sliceProducts'
import { useAppDispatch } from '@/Redux/hooks';
// import { ResultState } from '../components/interfaces';

export default function SearchBar() {
  const dispatch = useAppDispatch()
  const router = useRouter();
  const [result, setResult] = useState<ResultState>({
    name: '',
  });

  interface ResultState{ // PASARSELO A ANGELO
    name:string
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResult({ ...result, [event.target.name]: event.target.value });
  };
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!result.name.length) {
      window.alert('Por favor ingrese un producto');
    } else {
      getProductByName(result.name, dispatch)
      router.push(`/resultPage`);
    }
  };
  return (
    <div className='w-2/5'>
        <form onSubmit={(e) => handleSubmit(e)}>
        <div className='flex flex-col'>
            <div className='bg-white items-center justify-between flex rounded-full shadow-lg p-2 sticky'>
                <input className='font-bold uppercase rounded-full w-full py-2 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs' type='text' name="name" value={result.name} placeholder='Buscar' onChange={(e) => handleInputChange(e)} />
                    <div className='bg-gray-600 p-2 hover:bg-blue-800 cursor-pointer mx-2 rounded-full'>
                      <button type='submit'>
                        <svg className='w-6 h-6 text-white' xmlns="http://www.w3.org/2000/svg" viewBox='0 0 20 20' fill='currentColor'>
                            <path fillRule='evenodd' d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                        </svg>
                      </button>
                    </div>
            </div>
        </div>
        </form>
    </div>
  
  );
}