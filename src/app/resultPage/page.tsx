"use client";
import { useAppSelector } from "@/Redux/hooks";
import { getSearchedProducts } from "@/Redux/sliceProducts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CartInterface } from "../../components/interfaces";
import Pagination from "@/components/design/pagination";
import { useProduct } from "@/context/CartContext";

export default function ResultPage() {
  const displayedProducts = useAppSelector(getSearchedProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; 
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const dataShow = displayedProducts.slice(firstIndex, lastIndex);

  return (
    <main className="w-[100%]">
      {dataShow.length > 0 ? (
        <div className="w-[100%] flex flex-col justify-center items-center mt-10 space-y-7">
          {dataShow.map((product: CartInterface) => (
            <ProductCard key={product.id} product={product} />
          ))}
          <Pagination data={displayedProducts} recordsPerPage={recordsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
      ) : (
        <div className="w-[100%] flex flex-col items-center mt-10 mb-20"> {/* Agregado margen inferior */}
          <div className="bg-white p-5 border border-gray-200 rounded-lg shadow">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-300 mb-4">No se encontraron productos.</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Lo sentimos, no hemos encontrado ningún producto que coincida con tu búsqueda.</p>
          </div>
        </div>
      )}
    </main>
  );
}

const ProductCard: React.FC<{ product: CartInterface }> = ({ product }) => {
  const {addProduct} = useProduct();
  const [count, setCount] = useState(0);
    const router = useRouter();

    const increment = (producto: CartInterface) => {
        setCount(count + 1);
        addProduct(producto);
    
      };

    const decrement = (product: CartInterface) => {
        if (count > 0) {
          setCount(count - 1);
        }
        const productosLS = localStorage.getItem("allProducts");
    
        if (productosLS) {
          const parsedProducts: CartInterface[] = JSON.parse(productosLS);
          const findProd = parsedProducts.find((prod) => product.id == prod.id);
    
          if (findProd) {
            findProd.quantity -= 1;
            localStorage.setItem("allProducts", JSON.stringify(parsedProducts));
          }
        }
      };
  return (
    <div className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <button onClick={() => router.push(`/productDetail/${product.id}`)}>
          <div className="h-56 w-56 flex justify-center bg-white border-r-2 border-gray-300 rounded-t-lg">
            <img className="object-fit-cover h-full rounded-t-lg" src={product.image} alt={product.name}/>
          </div>
        </button>
        <div className="flex flex-col justify-center items-center p-1">
          <div className="my-2 h-10">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
          </div>
          <div className="w-96 my-2">
            <p className="font-normal text-xs text-gray-700 dark:text-gray-400">{product.description}</p>
          </div>
          <div className="flex flex-col items-center justify-center flex-grow">
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
          <div className='flex items-center justify-between border font-bold border-gray-300 w-11/12 rounded-full mb-1'>
          <button 
          onClick={() => decrement} 
          className="bg-yellow-100 text-black  py-2 px-4 rounded-full">-</button>
          <p className='font-normal'>{count}</p>
          <button 
          onClick={() => increment} 
          className="bg-yellow-100 text-black  py-2 px-4 rounded-full">+</button>
        </div>
        </div>
      </div>
  );
}
