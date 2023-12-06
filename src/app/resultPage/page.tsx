"use client"
import { useRouter } from "next/navigation"

export default function ResultPage(){
    const router= useRouter()
    
    return(
        <div>
            <h2>ACA VA LA SEARCH</h2>
            <button onClick={()=>router.push("/detail")}>Va al detail</button>
        </div>
    )
}