'use client';

import { Carousel } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { ProductInterface } from './interfaces';
import { useEffect, useState } from 'react';
import getPopularProducts from './requests/getPopularProducts';
import { useProduct } from '@/context/CartContext';



function CardSlider() {
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [count, setCount] = useState(0);
    useEffect (() => {
        const fetchData = async () => {
            try {
                const productsData = await getPopularProducts();
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchData();
    }, []);
    const productsPerSlide = 4;
    const slides = [];
    for (let i=0; i < products.length; i += productsPerSlide){
        slides.push(products.slice(i, i+productsPerSlide))
    }
    return (
        <div className="h-96 w-full mx-auto flex flex-row">
            <div className='flex w-72'>
                <img src="/mejorPuntuados.png" alt="" className='rounded-lg'/>
            </div>
            <Carousel slide={false} leftControl={<img src="/izq.png" className='h-12 opacity-80 hover:opacity-100' />} rightControl={<img src="/der.png" className='h-12 opacity-80 hover:opacity-100'/>} >
                {slides.map((slide, index) => (
                    <div key={index} className='flex justify-center'>
                        {slide.map((product: ProductInterface) => (
                            <CarrouselCard key={product.id} product={product} />
                        ))}
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
export default CardSlider;

const CarrouselCard: React.FC <{ product: ProductInterface }> = ({ product }) => {
    const [count, setCount] = useState(0);
    const {addProduct} = useProduct();
    const router = useRouter();
    return (
        <div className='flex flex-col items-center justify-center bg-white mx-2 border border-gray-300 rounded-lg shadow w-56 h-96 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
                <button onClick={() => router.push(`/productDetail/${product.id}`)}>
                    <div className='h-56 w-56 border-b-2 border-gray-300 flex justify-center bg-white'>
                        <img className='object-fit-cover h-full rounded-t-lg' src={product.image} alt={product.name} />
                    </div>
                </button>
                <div className='my-2 h-10'>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                </div>
                <div className="flex flex-col items-center justify-center flex-grow">
                        {product.discount ? (
                            <div>
                                <div className='flex flex-row align-middle text-center'>
                                    <h1 className="text-gray-600 text-xl line-through">$ {product.price}</h1>
                                    <h1 className="text-sm text-lime-500 ml-2">{product.discount} %</h1>
                                </div>
                                <h1 className="text-lime-500 text-xl">${product.price - (product.price * product.discount) / 100}</h1>
                            </div>
                        ) : (
                            <h1 className="text-lime-500 text-xl">${product.price}</h1>
                        )}
                </div>
                <div className='flex items-center justify-between border font-bold border-gray-300 w-11/12 rounded-full mb-1'>
                    <button 
                    // onClick={() => decrement(product)} 
                    className="bg-yellow-100 text-black  py-2 px-4 rounded-full">-</button>
                    <p className='font-normal'>{count}</p>
                    <button 
                    // onClick={() => increment(product)} 
                    className="bg-yellow-100 text-black  py-2 px-4 rounded-full">+</button>
                </div>
            </div>
    )
}