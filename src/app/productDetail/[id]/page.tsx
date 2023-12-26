"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductById } from "@/Redux/sliceProducts";
import envios from "../../../assets/envio.png"

export default function ProductDetail(){
  
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
  
  const [count, setCount]=useState(1)
  const increment=()=>{
    setCount(count + 1)
  }

  const decrement=()=>{
    if(count>1){
      setCount(count - 1)
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const productFind = await getProductById(productID);
          setProduct(productFind);
        } catch (error) {
          console.error("Error en render componente de detalle producto", error);
        }
    }
    fetchData();
  }, []);


  return (
    <div>
        <div className="flex flex-row justify-end mt-4 bg-gray-50 ">   
          <div className="flex items-center mb-10 mr-4">
            <img src={product.image} alt="image product" className="w-50 h-50 object-cover mt-10" />
          </div>
          <div>
            <div className="max-w-md mx-auto  mr-80 mt-60 ml-40 ">
              <h1 className="text-black text-6xl text-center ">{product.name}</h1>
              <h2 className="text-black text-center text-lg mt-16">{product.description}</h2> 
              <h2 className="text-black text-4xl text-right mt-20 border border-gray-300 w-6/12 p-4 rounded-md">$ {product.price}</h2> 
            </div>
            <div className="flex items-center ml-40">
              <img alt="" src="/envio.png" width={60} height={60} className="mt-20" />
              <h2 className="text-black text-lg ml-4 mt-20">Envíos gratis a partir de $20.000</h2>
            </div>
            <div className="mt-10 ml-40 text-lg">
              <h2>Cantidad</h2>
            </div>
            <div className="flex items-center mt-4 ml-40 text-lg border font-bold border-gray-300 w-4/12 p-4 rounded-full ">
              <button onClick={decrement} className="mr-20  bg-yellow-100 text-black  py-2 px-4 rounded-full">-</button>
              <p className="mr-20 font-normal "> {count}</p>
              <button className="mr-20  bg-yellow-100 text-black  py-2 px-4 rounded-full" onClick={increment}>+</button>
            </div>

            <button className="my-20 ml-80 text-xl bg-yellow-200 hover:bg-yellow-300 text-black font-normal py-2 px-4 rounded-full">Agregar al carrito</button>
          </div>
        </div> 
    </div>
  );
  
}