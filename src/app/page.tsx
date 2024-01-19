"use client";

import CardSlider from "../components/cardsSlider";
import NovedadesSlider from "../components/novedadesSlider";
import Banner from "../components/catalogo";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

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
