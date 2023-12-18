"use client";
import { useEffect } from "react";
import {useRouter} from "next/navigation";
import { useAppDispatch } from "@/Redux/hooks";
import { getAllProducts } from "@/Redux/sliceProducts";

export default function Catalogo  () {

    const router=useRouter();
    const dispatch = useAppDispatch();

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

 const CatalogoComplete = () => {
    getAllProducts(dispatch);
    router.push("/resultPage");
  }

    return (
        <div className="flex flex-col items-center mt-6">
                <button className="mb-4 ml-20 absolute mt-60 text-black bg-yellow-200 hover:bg-yellow-300  font-bold py-2 px-4 rounded-full" onClick={CatalogoComplete}>Descubrir el catálogo</button>
            <div className="ml-10 ">
                <img src="/imagenCatalogo.jpg" alt="" width={700} height={700} className="" />
            </div>
        </div>
    )

}