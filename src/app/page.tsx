"use client";

import { useEffect } from "react";
import CardSlider from "./components/cardsSlider";
import NovedadesSlider from "./components/novedadesSlider";

import { useAppDispatch } from "@/Redux/hooks";
import { getAllProducts, getProductsWithDiscount } from "@/Redux/sliceProducts";


export default function Home() {
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const fetchDataProducts = async () => {
  //     try {
  //       await getAllProducts(dispatch);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchDataProducts();
  // }, [dispatch]);

  return (
    <main className="w-full h-full flex flex-col items-center text-center">
      <div className="w-[80%]">
      <NovedadesSlider/>
      <Catalogo/>
      <CardSlider />
     </div>
    </main>
  );
}
