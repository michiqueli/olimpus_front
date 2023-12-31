"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductById } from "@/Redux/sliceProducts";
import envios from "../../../assets/envio.png";
import { Review } from "@/app/components/interfaces";

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    Reviews: [] as Review[],
    stock: 0,
    discount: 0,
  });

  
  const productID = params.id;

  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  function getAverageRating(): number {
    const totalRating = product.Reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / product.Reviews.length;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const productFind = await getProductById(productID);
        setProduct(productFind);
      } catch (error) {
        console.error(
          "Error en render componente de detalle producto",
          error
        );
      }
    }
    fetchData();
  }, []);

  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el modal está abierto o cerrado

  const onClose = () => {
    console.log("cerrado")
    setIsOpen(false);
  };
  const handleAddToCart = () => {
    // Lógica para agregar al carrito...
    setIsOpen(true); // Abrir el modal al agregar al carrito
  };

  return (
    <>
      <div>
        <div>
          <div className="flex flex-row justify-end  bg-gray-50 ">
            <div className="flex items-center mb-10 mr-4">
              <img
                src={product.image}
                alt="image product"
                className="w-50 h-50 object-cover "
              />
            </div>
            <div>
              <div className="max-w-md mx-auto  mr-80  ml-40 ">
                <h1 className="text-black text-6xl text-center ">
                  {product.name}
                </h1>
                <h2 className="text-black text-center text-lg mt-16">
                  {product.description}
                </h2>
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
                        ${" "}
                        {product.price -
                          (product.price * product.discount) / 100}
                      </h1>
                    </div>
                  ) : (
                    <h1 className="text-lime-500 text-xl">${product.price}</h1>
                  )}
                </div>
              </div>
              <div className="flex items-center ml-40">
                <img
                  alt=""
                  src="/envio.png"
                  width={60}
                  height={60}
                  className="mt-20"
                />
                <h2 className="text-black text-lg ml-4 mt-20">
                  Envíos gratis a partir de $20.000
                </h2>
              </div>
              <div className="mt-10 ml-40 text-lg">
                <h2>Cantidad</h2>
              </div>
              <div className="flex items-center mt-4 ml-40 text-lg border font-bold border-gray-300 w-5/12 p-4 rounded-full ">
                <button
                  onClick={decrement}
                  className="mr-20  bg-yellow-100 text-black  py-2 px-4 rounded-full"
                >
                  -
                </button>
                <p className="mr-20 font-normal "> {count}</p>
                <button
                  className="mr-20  bg-yellow-100 text-black  py-2 px-4 rounded-full"
                  onClick={increment}
                >
                  +
                </button>
              </div>
              <button onClick={handleAddToCart} className="my-20 ml-80 text-xl bg-yellow-200 hover:bg-yellow-300 text-black font-normal py-2 px-4 rounded-full">
                Agregar al carrito
              </button>
            </div>
          </div>
          <div className="max-w-4xl mx-auto mt-4 flex">
            {/* Promedio de Valoración General */}
            {product.Reviews && product.Reviews.length > 0 && (
              <div className="mr-8">
                <h3 className="text-black font-bold text-lg">
                  Promedio de Valoración General:
                </h3>
                <div className="text-yellow-500 mb-2">
                  {Array.from({ length: Math.max(0, Math.round(getAverageRating())) }).map(
                    (_, i) => (
                      <span key={i} className="text-2xl">
                        ⭐
                      </span>
                    )
                  )}
                </div>
                <p className="text-gray-500 text-sm">
                  Promedio: {getAverageRating().toFixed(2)}%
                </p>
              </div>
            )}

            {/* Opiniones */}
            <div className="max-w-4xl mx-auto p-6 border  border-gray-300 rounded-md bg-gray-50">
              <h2 className="text-black font-bold text-center text-xl">Opiniones:</h2>
              {product.Reviews &&
                product.Reviews.map((review: Review, index) => (
                  <div key={index} className="mt-4 border-b border-gray-300 pb-4">
                    <div className="text-yellow-500 mb-2">
                      {Array.from({ length: Math.max(0, review.rating) }).map(
                        (_, i) => (
                          <span key={i} className="text-2xl">
                            ⭐
                          </span>
                        )
                      )}
                    </div>
                    <p className="text-black text-xl">{review.content}</p>
                    {/* Porcentaje de valoración en rango de 1 a 5 estrellas */}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
          <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
              <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <div className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between">
                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Carrito de compras</h2>
                              <div className="ml-3 flex h-7 items-center">
                                <button onClick={onClose} type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">X</button>
                              </div>
                          </div>
                          <div className="mt-8">
                            <div className="flow-root">
                              <ul role="list" className="-my-6 divide-y divide-gray-200">
                                <li className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img src="/camiseta-casual.png" alt="" width={50} height={50} className="h-full w-full object-cover object-center"></img>
                                  </div>
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a onClick={()=>router.push("/productDetail")}>Throwback Hip Bag</a>
                                        </h3>
                                        <p className="ml-4">$90.00</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">Salmon</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex">
                                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                          <img alt="" src="/eliminar.png" width={20} height={20} className="mt-20 ml-60" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                <li className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img src="/camiseta-casual.png" alt="" width={50} height={50} className="h-full w-full object-cover object-center"></img>
                                  </div>
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3><a onClick={()=>router.push("/productDetail")}>Medium Stuff Satchel</a></h3>
                                        <p className="ml-4">$32.00</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">Blue</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex ml-60 ">
                                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                          <img alt="" src="/eliminar.png" width={20} height={20} className="mt-20" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                          <div>
                            <p className="mt-0.5 text-sm text-gray-500 ml-20">Los productos en SALE no tienen cambio</p>
                          </div>
                          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <p>Total</p>
                              <p>$262.00</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">
                              Envío e impuestos calculados al finalizar la compra
                            </p>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                              <button onClick={()=>router.push("")} className="flex items-center justify-center rounded-md border border-transparent bg-yellow-200 px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-yellow-300 ">
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
                  </div>
                </div>
              </div>
          </div>
        )} 
    </>
  )
}
            