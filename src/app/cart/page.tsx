"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CartInterface, CartProps } from "../../components/interfaces";
import { useSession } from "next-auth/react";
import PrimaryButton from "@/components/buttons/primaryButton";
import { useProduct } from "@/context/CartContext";

const Cart = () => {
  const router = useRouter();
  const { decrementOne } = useProduct();
  const [productos, setProductos] = useState<CartInterface[]>([]);

  useEffect(() => {
    const prods = localStorage.getItem("allProducts");
    const parsed = prods ? JSON.parse(prods) : [];
    setProductos(parsed);
  }, []);

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

  const decrementOneProd = async (product: CartInterface) => {
    await decrementOne(product.id);

    const updatedProducts = productos.map((prod: CartInterface) => {
      if (prod.id === product.id) {
        return { ...prod, quantity: prod.quantity - 1 };
      }
      return prod;
    });

    setProductos(updatedProducts);
    localStorage.setItem("allProducts", JSON.stringify(updatedProducts));
  };

  const deleteAll = () => {
    setProductos([]);
    localStorage.removeItem("allProducts");
  };

  return (
    <main className="ml-4 w-full">
      {user ? (
        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
          <h2 className="text-xl font-medium text-center text-gray-900">
            Carrito de compras
          </h2>

          {productos.length > 0 ? (
            <div className="flex flex-wrap justify-center">
              {productos.map((product: CartInterface) => (
                <div
                  key={product.id}
                  className="m-4 border-4 p-4 flex flex-col justify-center text-center items-center w-56"
                >
                  <button
                    onClick={() => router.push(`/productDetail/${product.id}`)}
                  >
                    <div className="flex items-center justify-center">
                      <img
                        src={product.image}
                        alt="image product"
                        width={100}
                        height={100}
                        className=""
                      />
                    </div>
                    <h1 className="text-2xl font-semibold ">{product.name}</h1>
                    <h1 className="text-sm font-semibold ">
                      {product.description}
                    </h1>
                    {product.discount > 0 ? (
                      <h1 className="text-xl text-lime-600 ">
                        ${" "}
                        {product.price -
                          (product.price * product.discount) / 100}
                      </h1>
                    ) : (
                      <h1 className="text-xl text-lime-600 ">
                        $ {product.price}
                      </h1>
                    )}
                  </button>
                  <h1>Cantidad: {product.quantity}</h1>
                  <div>
                    <PrimaryButton
                      onClickfunction={() => decrementOneProd(product)}
                      title="-"
                    />
                    <button
                      className="bg-red-500 px-2 font-semibold h-8 rounded-lg mt-2"
                      onClick={() => deleteOneProduct(product)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-black text-center my-4">
              No tienes agregado ningún producto al carrito, wey
            </h1>
          )}

          <div className="text-center my-4">
            <p className="text-sm text-gray-500">
              Los productos en SALE no tienen cambio
            </p>
          </div>

          <h1 className="text-xl font-semibold text-center">
            Cantidad de Productos: {productos.length}
          </h1>
          <h1 className="text-xl font-semibold text-center">
            Monto Total: $
            {productos.reduce((total: any, product: any) => {
              const discountedPrice =
                product.discount > 0
                  ? product.price - (product.price * product.discount) / 100
                  : product.price;

              return total + discountedPrice * product.quantity;
            }, 0)}
          </h1>

          <div className="mt-6 flex-col flex items-center justify-center text-center">
            <button
              className="bg-red-500 font-semibold h-8 rounded-lg px-1 mr-2 w-44"
              onClick={() => deleteAll()}
            >
              Eliminar TODOS
            </button>
            <button
              onClick={() => {
                router.push(`/pasarelaPagos/${user.user.id}`);
              }}
              className=" w-52 rounded-md bg-yellow-200 px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-yellow-300 mt-4"
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
              Ver más productos <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-5xl font-bold text-center justify-center h-[600px]">
          <h1>Debes Iniciar sesion para ver el carrito de compras</h1>
        </div>
      )}
    </main>
  );
};

export default Cart;
