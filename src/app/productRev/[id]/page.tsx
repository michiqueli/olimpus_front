"use client";
import { createReview} from "@/Redux/Actions";
import { useEffect,useState} from "react";
import { useAppDispatch,useAppSelector } from "@/Redux/hooks";
import { useParams } from "next/navigation";
import { getProducts, getProductById } from "@/Redux/sliceProducts";

export default function ProductRev () {

    const dispatch=useAppDispatch();
    const productos=useAppSelector(getProducts);
    const params =useParams();
    const productID = params.id;
    console.log("productos",productos)


    const [product, setProduct] = useState({
        image: '',
      });

    useEffect(() => {
        async function fetchData() {
          try {
            const productFind = await getProductById(productID);
            setProduct(productFind);
          } catch (error) {
            console.error(
              "Error en render componente de detalle producto",
              error
            );
          }
        }
        fetchData();
      }, []);

    return(
        <div>
            {product && (
                <img width={200} height={200} src={product.image} alt="Image not found" />
            )}
        </div>
    )
}