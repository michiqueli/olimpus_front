"use client";
import React, {useLayoutEffect} from "react";
import { useRouter, redirect } from "next/navigation";
import { getUsersById } from "@/Redux/Actions";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { getUsers } from "@/Redux/sliceUsers";
import { useProduct } from "@/context/CartContext";
import { isAuthenticated } from "@/app/unauthorized/auth";

export default function Pasarela () {
    useLayoutEffect(() => {
        const isAuth = isAuthenticated;
        if (!isAuth) {
          redirect("/Unauthorized")
        }
      }, [])

    const router=useRouter();
    const dispatch=useAppDispatch();
    const {id} = useParams();
    const datos=useAppSelector(getUsers);
    const {contextProducts, total, totalProducts} = useProduct();
    const renderedProductIds = new Set();

    useEffect(()=>{
        getUsersById(id,dispatch)
    },[dispatch])

    return(
        <div>
            <div className="flex">
                <div className="ml-60 mt-6">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="mb-8">
                            {datos && (
                                <div>
                                    <h2 className="text-gray-900 font-bold text-xl mb-2 flex items-center">
                                        <img width={30} height={30} src="/sobre.png" alt="Image not found" className="mr-2" />
                                        {datos.email}
                                    </h2>
                                    
                                    <h2 className="text-gray-900 font-bold text-xl mb-2 flex items-center">
                                        <img width={40} height={40} src="/ubicacion.png" alt="Image not found" className="mr-2" />
                                        {datos.street},

                                        CP {datos.zipCode}
                                        
                                    </h2>
                                    <h2 className="text-gray-900 font-bold text-xl mb-2 flex items-center">
                                        <img width={60} height={60} src="/envio.png" alt="Image not found" className="mr-2" />
                                        Envio a convenir: acordar costo de envio por whatsapp (Oca o Correo Argentino)
                                    </h2>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="max-w-sm rounded overflow-hidden shadow-lg ml-20">
                    <div className="px-6 py-4">
                        {contextProducts.length > 0 && (
                            <>
                                {contextProducts
                                    .filter((product, index, self) => self.findIndex(p => p.id === product.id) === index)
                                    .map((product, index) => {
                                        if (renderedProductIds.has(product.id)) {
                                            return null; // Evitar volver a renderizar el mismo producto
                                        }

                                        // Agregar el ID del producto al conjunto
                                        renderedProductIds.add(product.id);

                                        return (
                                            <div key={index} className="flex mb-4">
                                                <div className="h-20 w-20 flex-none bg-cover rounded-lg text-center overflow-hidden">
                                                    <img height={80} width={80} src={product.image} alt={`Product ${index}`} />
                                                </div>
                                                <div className="ml-4">
                                                    <h2 className="text-gray-900 font-bold text-l mb-2 mt-2">{product.name}</h2>
                                                    <h2 className="text-gray-900 text-sm mb-2 mt-2">{product.description}</h2>
                                                    <div className="flex justify-between mt-4">
                                                        <p>Cantidad: {totalProducts}</p>
                                                        <p className="text-l text-gray-900">${product.price}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        );
                                    })
                                }
                                <div className="flex justify-between text-base text-xl text-black border-t pt-4">
                                    <p className="">Subtotal</p>
                                    <p>${total}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>        

            <div className="max-w-sm w-full lg:max-w-full lg:flex ml-60">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="mb-8">
                        <h2 className="text-gray-900 font-bold text-xl mb-2">Medio de Pago</h2>
                    </div>
                    <div className="flex items-center">
                        <img width={140} height={140} className=" mr-4" src="/mercadoPago.png" alt="Image not found"/>
                    </div>
                </div>
            </div>
        </div>
    )
}