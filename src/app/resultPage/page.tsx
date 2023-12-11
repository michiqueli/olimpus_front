"use client"
import { useAppSelector } from "@/Redux/hooks"
import { getSearchedProducts } from "@/Redux/sliceProducts"
import { deepStrictEqual } from "assert"
import { useRouter } from "next/navigation"

export default function ResultPage(){
    const router= useRouter()
    const displayedProducts = useAppSelector(getSearchedProducts)

    return(
        <main>
        <div>
            {displayedProducts.map((product) => {
               return (
                <div>
                <h1>{product.name}</h1>
                <h1>{product.image}</h1>
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