import React from "react";
import { useRouter } from "next/navigation";
import { CartProps } from "../interfaces";
import { useProduct } from "@/context/CartContext";
import postCart from "../requests/postCart";

const Cart: React.FC<CartProps> = ({ isOpen, setIsOpen, onClose }) => {
  const router = useRouter();
  const {
    contextProducts,
    total,
    totalProducts,
    deleteAllProducts,
    deleteProduct,
  } = useProduct();
  const renderedProductIds = new Set();
  
  const checkout = async () => {
    const data = contextProducts.map((product) => ({
        title: product.name,
        quantity: product.quantity,
        currency_id: "ARS",
        unit_price: product.price,
      }))

<<<<<<< HEAD
    try {
      const response = await postCart(data);
      if(response) {
        window.location.href = response.url;
      }
    } catch (error) {
      console.error("Error al realizar el checkout:", error);
    }
  };
  const storedProductsString = localStorage.getItem('products');
  return (
    <>
      {isOpen && (
        <div
          className="relative z-10"
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
=======

    return(
        <>
        {isOpen && (
        <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
>>>>>>> e39336501e6e3a30c4877992a1c7978c8a651982
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2
                          className="text-lg font-medium text-gray-900"
                          id="slide-over-title"
                        >
                          Carrito de compras
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            onClick={onClose}
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            X
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="mt-0.5 text-sm text-gray-500 ml-20">
                        Los productos en SALE no tienen cambio
                      </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
<<<<<<< HEAD
                      {contextProducts.length > 0 ? storedProductsString
                        // contextProducts.map((product) => {
                        //   if (renderedProductIds.has(product.id)) {
                        //     return null;
                        //   }
                        //   renderedProductIds.add(product.id);
                        //   return (
                        //     <div key={product.id}>
                        //       <img
                        //         src={product.image}
                        //         alt="image product"
                        //         width={100}
                        //         height={100}
                        //         className="object-cover"
                        //       />
                        //       <h1 onClick={() => router.push("/productDetail")}>
                        //         {product.name}
                        //       </h1>
                        //       <h1>{product.price}</h1>
                        //       <h1>{product.description}</h1>
                        //     </div>
                        //   );
                        // })
                       : 
                        <h1 className="text.black">
                          No tienes agregado ningún producto al carrito, wey
                        </h1>
                      }
                      <h1>cantidad: {totalProducts}</h1>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <button
                          onClick={() => {
                            checkout(); 
                            router.push(""); 
                          }}
                          className="flex items-center justify-center rounded-md border border-transparent bg-yellow-200 px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-yellow-300 "
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
=======
                        {contextProducts.length > 0 ? (
                            contextProducts.map((product) => {
                            // Verificar si el producto ya se ha renderizado
                                if (renderedProductIds.has(product.id)) {
                                    return null; // Evitar volver a renderizar el mismo producto
                                }
                            // Agregar el ID del producto al conjunto
                                renderedProductIds.add(product.id);

                                return (
                                  <div className="ml-4 flex flex-1 flex-col border-b border-gray-300 mb-4">
                                   <div className="flex items-center">
                                      <img src={product.image} alt="image product" width={100} height={100} className="object-cover" />
                                      <div className="ml-4 flex flex-col">
                                        <div className="flex items-center"> {/* Contenedor del nombre y botón */}
                                          <h1 className="cursor-pointer mr-14" onClick={() => router.push("/productDetail")}>{product.name}</h1>
                                          <button onClick={()=>deleteProduct(contextProducts, product.id)} type="button" className="mr-6">
                                            <img width={20} height={20} src="/eliminar.png" alt="Eliminar" />
                                          </button>
                                        </div>
                                        <p className=" mt-1 text-xs text-gray-500">{product.description}</p>
                                      </div>
                                    </div>

                                    <div className="flex items-center ml-4 mt-4">
                                      <p className="text-gray-500 text-sm mr-2">Cantidad: {totalProducts}</p>
                                      <div className="flex-grow"></div> {/* Este div ocupa todo el espacio disponible */}
                                      <h1 className="text-l">${product.price}</h1>
                                    </div>

                                  </div>
                                );
                            })
                            ) : (
                              <h1 className="text.black">No tienes agregado ningún producto al carrito.</h1>
                            )}
                            <div className="flex justify-between text-base text-xl text-black">
                              <p className="ml-8">Subtotal</p>
                              <p>${total}</p>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                              <button onClick={()=>router.push("/pasarelaPagos/3fd84315-bb86-4329-95f6-8fef02ea12ef")} className="flex items-center justify-center rounded-md border border-transparent bg-yellow-200 px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-yellow-300 ">
                              Iniciar compra
                              </button>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-black-500">
                                <button type="button" className="font-medium text-black-700 hover:text-yellow-300" onClick={()=>router.push("/catalogo")}>
                                  Ver mas productos
                                <span aria-hidden="true"> &rarr;</span>
                                </button>
                            </div>
                            </div>
                        </div>
                    </div>
>>>>>>> e39336501e6e3a30c4877992a1c7978c8a651982
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
