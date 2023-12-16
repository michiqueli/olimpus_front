'use client';

import { Carousel } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { ProductInterface } from './interfaces';
import getAllProducts from '../requests/getAllProducts';
import { useEffect, useState } from 'react';



function CardSlider() {
//  const popular = products.filter((product: ProductInterface) => product.popular == true);
    const [products, setProducts] = useState<ProductInterface[]>([]);
    useEffect (() => {
        const fetchData = async () => {
            try {
                const productsData = await getAllProducts();
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchData();
    }, []);
    return (
        <div className="h-96 w-10/12 mx-auto">
            <div className='flex'>
                <h1 className='w-full'>Productos más populares:</h1>
            </div>
            <Carousel slide={true}>
                <div className="flex">
                {products.map((product: ProductInterface) => (
                    <CarrouselCard key={product.id} product={product} />
                ))}
                </div>
        </Carousel>
        </div>
    );
}
export default CardSlider;

const CarrouselCard: React.FC <{ product: ProductInterface }> = ({ product }) => {
    const router = useRouter();
    return (
        <button onClick={() => router.push(`/productDetail/${product.id}`)}>
            <div className='flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow w-56 h-96 md:flew-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
                <img className='object-cover w-full rounded-t-lg' src={product.image} alt={product.name} />
                <div className="flex flex-col items-center justify-center flex-grow">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                        {product.discount ? (
                            <div>
                                <div className='flex flex-row align-middle text-center'>
                                    <h1 className="text-gray-600 text-sm line-through">$ {product.price}</h1>
                                    <h1 className="text-xl text-lime-500">{product.discount} %</h1>
                                </div>
                                <h1 className="text-lime-500 text-xl">${product.price - (product.price * product.discount) / 100}</h1>
                            </div>
                        ) : (
                            <h1 className="text-lime-500 text-xl">${product.price}</h1>
                        )}
                </div>
            </div>
        </button>
    )
}