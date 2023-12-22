"use client"
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import {getTodosProducts } from '@/Redux/Actions';
import { useEffect } from 'react';
import { ProductInterface } from '../components/interfaces';
import { useRouter } from 'next/navigation';
import Filtered from '../components/filtros';
import { getProducts, getFilteredProducts} from '@/Redux/sliceProducts';

export default function ProductosCompleto(){
    const dispatch= useAppDispatch()
    const router= useRouter()
    const allProducts= useAppSelector(getProducts)
    const filtered= useAppSelector(getFilteredProducts)
    console.log("f", filtered)
   
    useEffect(()=>{
      dispatch(getTodosProducts)   
    },[dispatch])

    
    return (
        <div>
          <Filtered/>
            {filtered.map((product: ProductInterface) => (
                <button key={product.id} onClick={() => router.push(`/productDetail/${product.id}`)}>
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
                </button>
            ))}
        </div>
    );
}