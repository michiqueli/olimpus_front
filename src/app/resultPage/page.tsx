"use client";
import { useAppSelector } from "@/Redux/hooks";
import { getSearchedProducts } from "@/Redux/sliceProducts";
import { useRouter } from "next/navigation";
import { ProductInterface } from "../components/interfaces";



export default function ResultPage() {
  const displayedProducts = useAppSelector(getSearchedProducts);

  return (
    <main className="w-[100%]">
      <div className="w-[100%] flex flex-col justify-center items-center mt-10">
        {displayedProducts.map((product: ProductInterface) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

const ProductCard: React.FC<{ product: ProductInterface }> = ({ product }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push("/productDetail")}>
    <a
      href="#"
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
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
  );
};
