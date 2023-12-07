"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function productDetail(){
    const router = useRouter();
    const params = useParams();
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
    })

    const productID = params.id;

    useEffect(() => {
        async function fetchData() {
          try {
            // ACA VAMOS A HACER LA PETICION AL BACK, SOLICITANDO UN PRODUCTO EN PARTICULAR, LA REQUEST ES DE EJEMPLO
            //const productFind = await getOneProduct(productID);
            
            // ACA SETEAMOS EL ESTADO CON EL PRODUCTO ENCONTRADO
            //setProduct(productFind);

          } catch (error) {
            console.error("Error en render componente de detalle producto", error);
          }
        }
        fetchData();
      }, []);

    return(
        <div>
            <h2>ACA VA DETAIL DE UN PRODUCTO</h2>
            <h2 className="text-black">{product.name}</h2>
            <h2 className="text-black">{product.price}</h2>
            <h2 className="text-black">{product.description}</h2>
            <button onClick={()=>router.push("/search")}>va a search</button>
        </div>
    )
}