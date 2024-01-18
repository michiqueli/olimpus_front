"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CartInterface, CartProps } from "../interfaces";
import { useSession } from "next-auth/react";

const Cart = () => {
  const router = useRouter();
  const [productos, setProductos] = useState(() => {
    const productosEnJSON = localStorage.getItem("allProducts");
    return productosEnJSON ? JSON.parse(productosEnJSON) : [];
  });

  const renderedProductIds = new Set();
  const { data: session } = useSession();
  const user: any = session?.user;

  const deleteOneProduct = (product: CartInterface) => {
    const findProdIndex = productos.findIndex(
      (prod: CartInterface) => prod.id === product.id
    );

    if (findProdIndex !== -1) {
      const updatedProducts = [...productos];
      updatedProducts.splice(findProdIndex, 1);

      setProductos(updatedProducts);
      localStorage.setItem("allProducts", JSON.stringify(updatedProducts));
    }
  };

  const decrementOne = (product: CartInterface) => {
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

  const deleteAll = () => {
    setProductos([]);
    localStorage.removeItem("allProducts");
  };

  return (
    <main className="ml-4 w-[15%]">
      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
        <h2 className="text-xl font-medium text-center text-gray-900">
          Carrito de compras
        </h2>
        <div className="border-t border-gray-200 px-2 sm:px-6 m-4">
          {productos.length > 0 ? (
            productos.map((product: CartInterface) => (
              <div
                key={product.id}
                className="my-4 border-b-2 flex justify-center flex-col"
              >
                <button onClick={() => router.push("/productDetail")}>
                  <img
                    src={product.image}
                    alt="image product"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                  <h1 className="text-2xl font-semibold">{product.name}</h1>
                  <h1 className="text-xl text-lime-600">$ {product.price}</h1>
                </button>
                <h1>Cantidad: {product.quantity}</h1>
                <button
                  className=" bg-red-500 font-semibold h-8 rounded-lg"
                  onClick={() => deleteOneProduct(product)}
                >
                  Eliminar
                </button>
              </div>
            ))
          ) : (
            <h1 className="text.black">
              No tienes agregado ningún producto al carrito, wey
            </h1>
          )}
          <div className="text-center">
            <p className=" text-sm text-gray-500">
              Los productos en SALE no tienen cambio
            </p>
          </div>
          <h1 className="text-xl font-semibold text-center">
            cantidad total: {productos.length}
          </h1>
          <div className="mt-6 flex-row justify-center text-center ">
          <button
                  className=" bg-red-500 font-semibold h-8 rounded-lg px-1"
                  onClick={() => deleteAll()}
                >
                  Eliminar TODOS
                </button>
            <button
              onClick={() => {
                router.push(`/pasarelaPagos/${user.user.id}`);
              }}
              className="rounded-md  bg-yellow-200 px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-yellow-300 mt-4"
            >
              Iniciar compra
            </button>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-black-500">
            <button
              type="button"
              className="font-medium text-black-700 hover:text-yellow-300"
              onClick={() => router.push("/catalogo")}
            >
              Ver mas productos
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
