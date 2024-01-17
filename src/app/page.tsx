"use client";

import CardSlider from "../components/cardsSlider";
import NovedadesSlider from "../components/novedadesSlider";
import Banner from "../components/catalogo";
import { useSession } from "next-auth/react";
import { useProduct } from "@/context/CartContext";
import { CartInterface } from "@/components/interfaces";

export default function Home() {
  const {data: session} = useSession();

  const stored = localStorage.getItem('allProducts');
  const array = stored? JSON.parse(stored) : undefined;

  return (
    <main className="w-full h-full flex flex-col items-center text-center">
      <div className="flex flex-col">
        <div className="my-6">
          <NovedadesSlider />
        </div>
        <div className="my-6">
          <CardSlider />
        </div>
        <div>
            <div className="my-6">
              <Banner/>
            </div>
        {/* {
          session?.user ? (
          ):
          (
            <div className="my-6">
              <h1 className="text-black">
                NO TENES INICIADA SESION
              </h1>
            </div>
          )
        } */}
        </div>
        <div>
          {
            array.map((prod: CartInterface) => (
              <div>
                <h1 className="text-black">{prod.name}</h1>
              </div>
            ))
          }
        </div>
     </div>
    </main>
  );
}
