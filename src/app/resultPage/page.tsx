"use client"
import { useAppSelector } from "@/Redux/hooks"
import { getSearchedProducts } from "@/Redux/sliceProducts"
import { useRouter } from "next/navigation"
import { ProductInterface } from "../components/interfaces"



export default function ResultPage(){
    const router= useRouter()
    const displayedProducts = useAppSelector(getSearchedProducts)

    return(
        <main>
        <div>
            {displayedProducts.map((product: ProductInterface) => {
               return (
                <div key={product.id}>
              
                <h1>{product.image}</h1>
           
                <h1>{product.name}</h1>
                <h1>{product.description}</h1>
                </div>
               )
                }
            )}
            <button onClick={()=>router.push("/detail")}>Va al detail</button>
        </div>
        </main>
    )
}