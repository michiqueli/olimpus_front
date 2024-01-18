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
  const { contextProducts, total, totalProducts } = useProduct();
  const PRODUCTOSAUSAR = localStorage.getItem('allProducts');
  if(PRODUCTOSAUSAR){
    const PARSEADO = JSON.parse(PRODUCTOSAUSAR);
  }
  const renderedProductIds = new Set();

  useEffect(() => {
    getUsersById(id, dispatch);
  }, [dispatch]);
  const { data: session } = useSession();
  

  const goToPay = async () => {
    const user : any = session?.user;
    
    const paymentData: any = {
      items: [
        {
          title: "Remera Adidas",
          description: "Remera super comoda",
          picture_url: "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw0b98b386/products/ADIN7975/ADIN7975-1.JPG",
          category_id: "Equipamiento",
          quantity: 1,
          currency_id: "ARS",
          unit_price: 200,
        },
        {
          title: "Pantalon Puma",
          description: "Pantalon super comodo",
          picture_url: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1536,h_1536/global/535656/27/mod01/fnd/ARG/fmt/png",
          category_id: "Equipamiento",
          quantity: 1,
          currency_id: "ARS",
          unit_price: 600,
        },
      ],
      payer: {
        name: user.user.name,
        email: user.user.email,
        UsuarioId: user.user.id
      },
      amount: 800,
      compraId: null,
    };
    await postPayment(paymentData).
    then((response) => {
      router.push(response?.url);
    });
  };

  return (
    <div>
      <div className="flex ">
      <div className="ml-96 mt-6">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="mb-8 flex items-center">
          {datos && (
            <div>
              <h2 className="text-gray-900 font-semibold text-xl mb-2 ml-4">
                <img
                  width={30}
                  height={30}
                  src="/sobre.png"
                  alt="Image not found"
                  className="inline mr-4"
                />
                {datos.email}
              </h2>

              <h2 className="text-gray-900 font-semibold text-xl mb-2 ml-2">
                <img
                  width={40}
                  height={40}
                  src="/ubicacion.png"
                  alt="Image not found"
                  className="inline mr-4"
                />
                {datos.street}, CP {datos.zipCode}
              </h2>

              <h2 className="text-gray-900 font-semibold text-xl mb-4 text-center ml-2">
                <img
                  width={60}
                  height={60}
                  src="/envio.png"
                  alt="Image not found"
                  className="inline mr-8"
                />
                Envío a convenir: acordar costo de envío por WhatsApp (Oca o Correo Argentino)
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
                  .filter(
                    (product, index, self) =>
                      self.findIndex((p) => p.id === product.id) === index
                  )
                  .map((product, index) => {
                    if (renderedProductIds.has(product.id)) {
                      return null; // Evitar volver a renderizar el mismo producto
                    }

                    // Agregar el ID del producto al conjunto
                    renderedProductIds.add(product.id);

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
                          <h2 className="text-gray-900 text-sm mb-2 mt-2">
                            {product.description}
                          </h2>
                          <div className="flex justify-between mt-4">
                            <p>Cantidad: {totalProducts}</p>
                            <p className="text-l text-gray-900">
                              ${product.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                <div className="flex justify-between text-xl text-black border-t pt-4">
                  <p className="">Subtotal</p>
                  <p>${total}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center  text-gray-900 font-bold text-lg  -mt-60">
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
