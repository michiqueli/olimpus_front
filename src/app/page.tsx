import CardSlider from "./components/cardsSlider";
import NovedadesSlider from "./components/novedadesSlider";
import SelectsCategories from './components/selectsCategories';
import Catalogo from "./components/catalogo";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col items-center text-center">
      <div className="w-[80%]">
      {/* <SelectsCategories/> */}
      <NovedadesSlider/>
      <Catalogo/>
      <CardSlider />
      </div>
    </main>
  )
}
