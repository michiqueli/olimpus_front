"use client";
import { useAppSelector } from "@/Redux/hooks";
import { getSearchedProducts } from "@/Redux/sliceProducts";
import { useRouter } from "next/navigation";
import { ProductInterface } from "../components/interfaces";

export default function ResultPage() {
  const router = useRouter();
  const displayedProducts = useAppSelector(getSearchedProducts);

  return (
    <main className="w-[100%]">
      <div className="w-[80%]">
        {displayedProducts.map((product: ProductInterface) => {
          return (
            <div key={product.id}>
                
              <h1>{product.image}</h1>
              <h1>{product.name}</h1>
              <h1>{product.description}</h1>
              {product.discount ? (
                <div>
                    <div className="flex flex-row align-middle text-center ">
                  <h1 className="text-gray-600 text-sm line-through">$ {product.price}</h1>
                  <h1 className="text-xl text-lime-500">{product.discount}%</h1>
                  </div>
                  <h1 className=" text-lime-500 text-xl">
                    $ {product.price - (product.price*product.discount / 100)}
                  </h1>
                </div>
              ) : (
                <h1 className=" text-lime-500 text-xl">{product.price}</h1>
              )}
            </div>
          );
        })}
        <button onClick={() => router.push("/detail")}>Va al detail</button>
      </div>
    </main>
  );
}
