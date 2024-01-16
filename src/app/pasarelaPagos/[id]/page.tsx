"use client";
import { useRouter } from "next/navigation";
import { getUsersById } from "@/Redux/Actions";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { getUsers } from "@/Redux/sliceUsers";

export default function Pasarela () {

    const router=useRouter();
    const dispatch=useAppDispatch();
    const {id} = useParams();
    const datos=useAppSelector(getUsers);

    useEffect(()=>{
        getUsersById(id,dispatch)
    },[dispatch])

    return(
        <div>
            <div className="flex">
            <div className="max-w-sm w-full lg:max-w-full lg:flex ml-20">
                <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col">
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

            <div className="max-w-sm w-full lg:max-w-full lg:flex">
                <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Woman holding a mug"/>
                <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                        <p>Aca se renderiza la imagen del producto</p>
                        <h2 className="text-gray-900 font-bold text-xl mb-2">Nombre del Producto</h2>
                        <h2 className="text-gray-700 text-base">Total del Producto</h2>
                    </div>
                </div>
            </div>
            </div>



            <div className="max-w-sm w-full lg:max-w-full lg:flex ml-20">
                <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Woman holding a mug"/>
                <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
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