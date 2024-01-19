"use client";

import { useRouter } from "next/navigation";
import { getUsersById } from "@/Redux/Actions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { getUsers } from "@/Redux/sliceUsers";
import { useProduct } from "@/context/CartContext";
import postPayment from "@/components/requests/postPayment";
import { useSession } from "next-auth/react";

export default function Pasarela() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const datos = useAppSelector(getUsers);
  const PRODUCTOSAUSAR = localStorage.getItem("allProducts");

  let PARSEADO = [];
  if (PRODUCTOSAUSAR) {
    PARSEADO = JSON.parse(PRODUCTOSAUSAR);
    console.log(PARSEADO);
  }
  let amount = 0

  const items = PARSEADO.map((product: any) => {
    const discountedPrice =
      product.discount > 0
        ? product.price - (product.price * product.discount) / 100
        : product.price;

    return {
      title: product.name,
      description: product.description,
      picture_url: product.image,
      category_id: "Equipamiento",
      quantity: product.quantity,
      currency_id: "ARS", 
      unit_price: discountedPrice,
    };
  });

  const renderedProductIds = new Set();

  useEffect(() => {
    getUsersById(id, dispatch);
  }, [dispatch]);
  const { data: session } = useSession();

  const goToPay = async () => {
    const user: any = session?.user;

    const paymentData: any = {
      items: items,
      payer: {
        name: user.user.name,
        email: user.user.email,
        UsuarioId: user.user.id,
      },
      amount: amount,
      compraId: null,
    };
    await postPayment(paymentData).then((response) => {
      router.push(response?.url);
    });
  };

  return (
    <div>
      <div className="flex">
        <div className="ml-60 mt-6">
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="mb-8">
              {datos && (
                <div>
                  <h2 className="text-gray-900 font-bold text-xl mb-2 flex items-center">
                    <img
                      width={30}
                      height={30}
                      src="/sobre.png"
                      alt="Image not found"
                      className="mr-2"
                    />
                    {datos.email}
                  </h2>

                  <h2 className="text-gray-900 font-bold text-xl mb-2 flex items-center">
                    <img
                      width={40}
                      height={40}
                      src="/ubicacion.png"
                      alt="Image not found"
                      className="mr-2"
                    />
                    {datos.street}, CP {datos.zipCode}
                  </h2>
                  <h2 className="text-gray-900 font-bold text-xl mb-2 flex items-center">
                    <img
                      width={60}
                      height={60}
                      src="/envio.png"
                      alt="Image not found"
                      className="mr-2"
                    />
                    Envio a convenir: acordar costo de envio por whatsapp (Oca o
                    Correo Argentino)
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-sm rounded overflow-hidden shadow-lg ml-20">
          <div className="px-6 py-4">
            {PARSEADO && PARSEADO.length > 0 && (
              <>
                {PARSEADO.map((product: any, index: any) => {
                  const discountedPrice =
                    product.discount > 0
                      ? product.price - (product.price * product.discount) / 100 
                      : product.price;
                      amount = amount+(discountedPrice*product.quantity);
                  return (
                    <div key={index} className="flex mb-4">
                      <div className="h-20 w-20 flex-none bg-cover rounded-lg text-center overflow-hidden">
                        <img
                          height={80}
                          width={80}
                          src={product.image}
                          alt={`Product ${index}`}
                        />
                      </div>
                      <div className="ml-4">
                        <h2 className="text-gray-900 font-bold text-l mb-2 mt-2">
                          {product.name}
                        </h2>
                        <div className="flex justify-around mt-4 ">
                          <p>Cantidad: {product.quantity}</p>
                          <p className="text-l text-lime-600">
                            {product.discount > 0 ? (
                              <>
                                ${discountedPrice}
                              </>
                            ) : (
                              `$${product.price}`
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-between text-xl text-black border-t pt-4">
                  <p className="">Subtotal</p>
                  <p>${amount}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4 text-gray-900 font-bold text-lg">
        <div className="w-64 h-28 flex border border-solid border-cyan-500 rounded-full justify-center">
          <button onClick={goToPay}>
            <p>Ir a pagar</p>
            <img
              width={100}
              height={100}
              src="/mercadoPago.png"
              alt="Image not found"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
