"use client";

import { Carousel } from "flowbite-react";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/Redux/hooks";
import { getProductsWithDiscount } from "@/Redux/sliceProducts";

import { useEffect } from "react";

function NovedadesSlicer() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchDataProductsWDiscount = async () => {
      try {
        await getProductsWithDiscount(dispatch);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataProductsWDiscount();
  }, [dispatch]);

  
  const FilterByDiscount = () => {
    getProductsWithDiscount(dispatch);
    router.push("/resultPage");
  }

  return (
    <div className="mx-auto">
      <Carousel slide={true} style={{ width: 1200, height: 600}} leftControl={<img src="/izq.png" className='h-12 opacity-80 hover:opacity-100'/>} rightControl={<img src="/der.png" className='h-12 opacity-80 hover:opacity-100'/>}>
        <button className="w-full h-full" onClick={FilterByDiscount}>
          <img
            className="object-fit w-full h-full"
            src="/preciosBajos.jpeg"
            alt="..."
          />
        </button>
        <button
          className="w-full h-full"
          
        >
          <img
            className="object-fit w-full h-full"
            src="/navidad.jpeg"
            alt="..."
          />
        </button>
        <button
          className="w-full h-full"
          
        >
          <img
            className="object-fit w-full h-full"
            src="/envios.jpeg"
            alt="..."
          />
        </button>
      </Carousel>
    </div>
  );
}
export default NovedadesSlicer;
