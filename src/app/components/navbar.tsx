'use client';
import { useRouter, usePathname } from "next/navigation";
import SearchBar from "./searchbar";
import GoBack from "./buttons/goBack";
import { useState } from "react";
import React from "react";

const NavBar: React.FC = () => {
  const router = useRouter();
  const path = usePathname();
  // Estado para controlar la visibilidad del menú desplegable
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  // Estado para abrir modal carrito
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);

  const handleCartClick = () => {
    openModal();
  };
  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
  <>
    <div className="flex flex-col">
      <div className="bg-yellow-300 w-full h-28 flex justify-center items-center">
        <div className="flex justify-between items-center p-4 w-[95%]">
          <div className="flex items-center">
            <button onClick={() => router.push('/')}>
              <img src="/zeus.png" alt="" className="w-24 h-24 hover:scale-110" />
            </button>
          </div>
          <SearchBar />
          <div className="flex">
            <div className="relative">
              <button
                onClick={() => setDropdownVisible(!dropdownVisible)}
                className="flex items-center focus:outline-none"
              >
                <img src="/user.png" alt="" className="w-11 h-11 mr-6 hover:scale-110" />
              </button>
              {dropdownVisible && (
                <div className="absolute top-12 right-0 bg-white border border-gray-300 p-2 shadow-md rounded-md z-20">
                  <button
                    onClick={() => router.push('/userDetail/bb7f87f4-5ec6-4177-be68-9440ee3eb41b')}
                    className="font-bold block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
                  >
                    Mi Perfil
                  </button>
                  <button
                    onClick={() => router.push('/login')}
                    className="font-bold block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
                  >
                    Registrarse
                  </button>
                </div>
              )}
            </div>

            {/* <button onClick={() => router.push('/cart')}> */}
            <button onClick={handleCartClick}>
              <img src="/shopping.png" alt="" className="w-11 h-11 hover:scale-110" />
            </button>
          </div>
        </div>
      </div>
      <div className="my-2 ml-2">
        {path !== '/' ? <GoBack title='← Volver atrás'/> : ''}
      </div>
    </div>
    {isModalOpen && (
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

export default NavBar;