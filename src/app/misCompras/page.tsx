"use client"
import { useParams } from "next/navigation"
import { useEffect } from "react"

export default function ComprasUsuario(){

    const params = useParams()
    const {id} = params 

    useEffect(()=>{
        
    })
    

    return(
        <div>
            <p>ACA VAN LAS COMPRAS </p>
        </div>
    )
}