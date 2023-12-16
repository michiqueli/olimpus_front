'use client'

import { useEffect } from "react";
import CardSlider from "./components/cardsSlider";
import NovedadesSlider from "./components/novedadesSlider";
import SelectsCategories from './components/selectsCategories'
import { useAppDispatch } from "@/Redux/hooks";
import { getAllProducts, getProductsWithDiscount } from "@/Redux/sliceProducts";




export default function Home() {
 const dispatch = useAppDispatch()
  
  
  useEffect(() => {
    const fetchDataProducts = async () => {
      try {
        await getAllProducts(dispatch);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataProducts();
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchDataProductsWDiscount = async () => {
  //     try {
  //       await getProductsWithDiscount(dispatch);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchDataProductsWDiscount();
  // }, [dispatch]);



  return (
    <main className="w-full h-full flex flex-col items-center text-center">
      <div className="w-[80%]">
      {/* <SelectsCategories/> */}
      <NovedadesSlider/>
      <CardSlider />
      </div>
    </main>
  )
}
