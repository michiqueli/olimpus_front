"use client";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getById } from "@/Redux/Actions";

export default function productDetail(){
  
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
    image:"",
    reviews:"",
    stock: 0,
  })

  const productID = params.id;

  useEffect(() => {
    async function fetchData() {
      try {
        const productFind = await getById(productID);
          setProduct(productFind);
        } catch (error) {
          console.error("Error en render componente de detalle producto", error);
        }
    }
    fetchData();
  }, []);


  return (
    <div>
      <div className="flex flex-row max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-24">  
        <div className="flex items-center mb-10 mr-4">
          <img src={product.image} alt="image product" className="rounded-full" />
        </div>
        <div className="max-w-md mx-auto">
          <h1 className="text-black text-3xl text-center">{product.name}</h1>
          <h2 className="text-black mt-8 ">{product.description}</h2> 
          <h2 className="text-black flex ml-auto justify-end mt-4 text-xl">$ {product.price}</h2>
        </div>
   
      
      
    </div>
    <div>
      <button onClick={() => router.push("/search")} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Back</button>
    </div>
    </div>
   
    
  );
  
}