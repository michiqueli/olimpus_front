 "use client";
import { getUserHistorial, getUsersById } from "@/Redux/Actions";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { useParams } from "next/navigation";
import { setCartUser } from "@/Redux/sliceUsers";

import { useRouter } from "next/navigation";

export default function Reviews () {

    const dispatch=useAppDispatch();
    const router=useRouter();
    const compras=useAppSelector(setCartUser);
    const {id}=useParams();

    useEffect(() => {
        getUserHistorial(id,dispatch)
    },[dispatch])

    return (
        <div className="p-4">
            <div>
                {compras.payload.users.cartUser.carts && compras.payload.users.cartUser.carts.length ? (
                    <div>
                        {compras.payload.users.cartUser.carts.map((cart: any, cartIndex: number) => (
                            <div key={cartIndex} className="my-4 bg-gray-100 p-4 rounded-md shadow-md">
                                {cart.items && cart.items.length > 0 ? (
                                    <div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {cart.items.map((item: any, itemIndex: number) => (
                                                <div onClick={() => router.push(`/productRev/${item.productId}`)} key={itemIndex} className="bg-white p-4 rounded-md shadow-md cursor-pointer hover:shadow-lg transition duration-300">
                                                    <p className="text-xl font-semibold mb-2">Producto: {item.productId}</p>
                                                    <p>Cantidad: {item.quantity}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No hay items en este carrito.</p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No hay carritos o items en el carrito.</p>
                )}
            </div>
        </div>
    );
}