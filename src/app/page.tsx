"use client";

import CardSlider from "../components/cardsSlider";
import NovedadesSlider from "../components/novedadesSlider";
import Banner from "../components/catalogo";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();

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
        {
          session?.user ? (
            <div className="my-6">
              <Banner/>
            </div>
          ):
          (
            <div className="my-6">
              <h1 className="text-black">
                NO TENES INICIADA SESION
              </h1>
            </div>
          )
        }
        </div>
     </div>
    </main>
  );
}
