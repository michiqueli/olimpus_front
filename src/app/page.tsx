"use client";

import CardSlider from "./components/cardsSlider";
import NovedadesSlider from "./components/novedadesSlider";
import Banner from "./components/catalogo";

export default function Home() {
  
  return (
    <main className="w-full h-full flex flex-col items-center text-center">
      <div className="w-[80%]">
      <NovedadesSlider/>
      <Banner/>
      <CardSlider />
     </div>
    </main>
  );
}
