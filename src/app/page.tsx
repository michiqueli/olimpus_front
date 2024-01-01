"use client";

import CardSlider from "../components/cardsSlider";
import NovedadesSlider from "../components/novedadesSlider";
import Banner from "../components/catalogo";

export default function Home() {
  
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
          <Banner/>
        </div>
     </div>
    </main>
  );
}
