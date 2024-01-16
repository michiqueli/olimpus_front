"use client";
import { useAppSelector } from "@/Redux/hooks";
import { getSearchedProducts } from "@/Redux/sliceProducts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductInterface } from "../../components/interfaces";

import Pagination from "@/components/design/pagination";
import GoBack from "../../components/buttons/goBack";

export default function ResultPage() {
  const displayedProducts = useAppSelector(getSearchedProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; 
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const dataShow = displayedProducts.slice(firstIndex, lastIndex);

  return (
    <main className="w-[100%]">
      <div className="w-[100%] flex flex-col justify-center items-center mt-10 space-y-7">
        {dataShow.map((product: ProductInterface) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination data={displayedProducts} recordsPerPage={recordsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </main>
  );
}

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
