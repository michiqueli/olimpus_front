"use client";

import CardSlider from "../components/cardsSlider";
import NovedadesSlider from "../components/novedadesSlider";
import Banner from "../components/catalogo";
import { useSession } from "next-auth/react";
import { useProduct } from "@/context/CartContext";
import { CartInterface } from "@/components/interfaces";

export default function Home() {
  const { data: session } = useSession();

  const stored = localStorage.getItem('allProducts');
  const array = stored ? JSON.parse(stored) : undefined;

  return (
    <main className="w-full h-full flex flex-col items-center text-center">
      <div className="flex flex-col">
        <div className="my-6">
          <NovedadesSlider />
        </div>
        <div className="my-6">
          <CardSlider />
        </div>
        <div className="my-6">
          <Banner />
        </div>
        <div className="my-6">
          <h1 className="text-black">
            {session?.user ? (
              // Contenido si el usuario tiene sesión iniciada
              <span>Contenido para usuarios con sesión iniciada</span>
            ) : (
              // Contenido si el usuario no tiene sesión iniciada
              <span>NO TENES INICIADA SESION</span>
            )}
          </h1>
        </div>
      </div>
    </main>
  );
}
