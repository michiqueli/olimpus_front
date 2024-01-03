"use client"
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import {getTodosProducts } from '@/Redux/Actions';
<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect } from 'react';
import { ProductInterface } from '../../components/interfaces';
=======
import { useEffect, useState } from 'react';
import { ProductInterface } from '../components/interfaces';
>>>>>>> aa2c52573bee05867c9f30dd63b9b1029feb0d34
=======
import { useEffect, useState } from 'react';
import { ProductInterface } from '@/components/interfaces';
>>>>>>> 35bcdd10928e4c9509d2fb90fed13e5a4496e085
import { useRouter } from 'next/navigation';
import Filtered from '../../components/filtros';
import { getProducts, getFilteredProducts} from '@/Redux/sliceProducts';
import Pagination from '@/components/pagination';

export default function ProductosCompleto(){
    const dispatch= useAppDispatch()
    const router= useRouter()
    const allProducts= useAppSelector(getProducts)
    const filtered= useAppSelector(getFilteredProducts)
    
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 9;
    
    useEffect(()=>{
      dispatch(getTodosProducts)   
    },[dispatch])
    
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const dataShow = filtered.slice(firstIndex, lastIndex);
    
    return (
<<<<<<< HEAD
<<<<<<< HEAD
        <div>
          <Filtered/>
          

          
            {filtered.map((product: ProductInterface) => (
              <div onClick={() => router.push(`/productDetail/${product.id}`)}>
                {/* <button key={product.id} onClick={() => router.push(`/productDetail/${product.id}`)}> */}
                <a
                  href="#"
                  className="flex flex-col mt-14 ml-16 mb-4 mr-4 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <img
                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {product.name}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {product.description}
                    </p>
                    {product.discount ? (
                      <div>
                        <div className="flex flex-row align-middle text-center">
                          <h1 className="text-gray-600 text-sm line-through">
                            $ {product.price}
                          </h1>
                          <h1 className="text-xl text-lime-500">{product.discount}%</h1>
                        </div>
                        <h1 className="text-lime-500 text-xl">
                          $ {product.price - (product.price * product.discount) / 100}
                        </h1>
                      </div>
                    ) : (
                      <h1 className="text-lime-500 text-xl">${product.price}</h1>
                    )}
                  </div>
                </a>
                {/* </button> */}
            </div>
=======
=======
>>>>>>> 35bcdd10928e4c9509d2fb90fed13e5a4496e085
        <div className='flex flex-col justify-center items-center'>
          <div className='mb-6 mt-6 w-[98%]'>
            <Filtered />
          </div>
          <div className='w-[98%] grid grid-cols-3 gap-y-6 gap-x-4'>
            {dataShow.map((product: ProductInterface) => (
              <ProductCard key={product.id} product={product} />
<<<<<<< HEAD
>>>>>>> aa2c52573bee05867c9f30dd63b9b1029feb0d34
=======
>>>>>>> 35bcdd10928e4c9509d2fb90fed13e5a4496e085
            ))}
          </div>
          <Pagination data={filtered} recordsPerPage={recordsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
};

const ProductCard: React.FC<{ product: ProductInterface }> = ({ product }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push(`/productDetail/${product.id}`)}>
    
      <div className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">{/* div main */}
      
        <div className="h-56 w-56 flex justify-center bg-white border-r-2 border-gray-300 rounded-t-lg"> {/* div img */}
          <img className="object-fit-cover h-full rounded-t-lg" src={product.image} alt={product.name}/>
        </div>

         <div> {/*div text */}
          <div className="my-2 h-10"> {/*div titulo*/}
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
          </div>

          <div className="w-96 my-2"> {/*div parrafo*/}
            <p className="font-normal text-sm text-gray-700 dark:text-gray-400">{product.description}</p>
          </div>
          
          <div className="flex flex-col items-center justify-center flex-grow">{/*div precio*/}
            {product.discount ? (
              <div>
                <div className="flex flex-row align-middle text-center">
                  <h1 className="text-gray-600 text-xl line-through">$ {product.price}</h1>
                  <h1 className="text-sm text-lime-500 ml-2">{product.discount}%</h1>
                </div>
                <h1 className="text-lime-500 text-xl">$ {product.price - (product.price * product.discount) / 100}</h1>
              </div>
          ) : (
            <h1 className="text-lime-500 text-xl">${product.price}</h1>
          )}
          </div>
        </div>

      </div>

    </button>
  );
};
