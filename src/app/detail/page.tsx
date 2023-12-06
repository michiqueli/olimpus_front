"use client"
import { useRouter } from "next/navigation"
export default function Detail(){
    const router = useRouter()
    return(
        <div>
            <h2>ACA VA DETAIL </h2>
            <button onClick={()=>router.push("/search")}>va a search</button>
        </div>
    )
}