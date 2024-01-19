"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { getTodosProducts } from "@/Redux/Actions";
import { ProductInterface } from "../../components/interfaces";
import { useEffect, useState } from "react";
import { useProduct } from "@/context/CartContext";
import { useRouter } from 'next/navigation';
import Filtered from '../../components/filtros';
import { getProducts, getFilteredProducts} from '@/Redux/sliceProducts';
import Pagination from "@/components/design/pagination";
export default function ProductosCompleto() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const allProducts = useAppSelector(getProducts);
  const filtered = useAppSelector(getFilteredProducts);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  useEffect(() => {
    dispatch(getTodosProducts);
  }, [dispatch]);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const dataShow = filtered.slice(firstIndex, lastIndex);

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="mb-6 mt-6 w-[98%]">
        <Filtered />
      </div>
      <div className="text-center w-[98%] 2xl:grid 2xl:grid-cols-3 gap-y-6 gap-x-4 text-xs">
        {dataShow.map((product: ProductInterface) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        data={filtered}
        recordsPerPage={recordsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

const ProductCard: React.FC<{ product: ProductInterface }> = ({ product }) => {
  const [count, setCount] = useState(0);
  const {addProduct} = useProduct();
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const router = useRouter();
  return (
    <div className=" w-[100%] flex flex-col sm:flex-row items-center bg-white sm:border sm:border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        {/* div main */}

        <button onClick={() => router.push(`/productDetail/${product.id}`)}>
          <div className="h-56 w-56 flex justify-center bg-white sm:border-r-2 border-gray-300 rounded-t-lg">
            {" "}
            {/* div img */}
            <img
              className="object-fit-cover h-full rounded-t-lg"
              src={product.image}
              alt={product.name}
              />
          </div>
        </button>

        <div className="flex flex-col justify-center items-center ">
          {" "}
          {/*div text */}
          <div className="my-2 h-10">
            {" "}
            {/*div titulo*/}
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.name}
            </h5>
          </div>
          <div className="w-[%98] sm:w-96 my-2 text p-4">
            {" "}
            {/*div parrafo*/}
            <p className="font-normal text-xs text-gray-700 dark:text-gray-400">
              {product.description}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center flex-grow">
            {/*div precio*/}
            {product.discount ? (
              <div>
                <div className="flex flex-row align-middle text-center">
                  <h1 className="text-gray-600 text-xl line-through">
                    $ {product.price}
                  </h1>
                  <h1 className="text-sm text-lime-500 ml-2">
                    {product.discount}%
                  </h1>
                </div>
                <h1 className="text-lime-500 text-xl">
                  $ {product.price - (product.price * product.discount) / 100}
                </h1>
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
      </div>
  );
};
