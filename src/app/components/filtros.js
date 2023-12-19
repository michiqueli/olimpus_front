"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { getAllTypes, getTypes } from "@/Redux/Actions";
import { useEffect, useState } from "react";

export default function Filtered () {
    const dispatch=useAppDispatch();

    const initialState ={
        name:""
    };
    const allProducts=useAppSelector(state => state.products.Type);
    console.log("all",allProducts)
    const [estado,setEstado]=useState(initialState);
    console.log("estado",estado.name)

    useEffect(()=>{
        dispatch(getAllTypes)
    },[dispatch])

    const handleInputChange=(event)=>{
        const value=event.target.value
        console.log("value",value)
        setEstado({
            ...estado,name: event.target.value
        })
        // dispatch(getTypes(estado.name))
        // getTypes(estado.name, dispatch)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        getTypes(estado.name, dispatch)
      };


    return(
        // <div className="">
        //     <form onSubmit={(e) => handleSubmit(e)}>
        //         <label className="" htmlFor="ordenPorType">Types:</label>
        //         <select className="" id="ordenPorType" onChange={event=>handleInputChange(event)}>
        //             <option value="">Todos</option>
        //             <option value="calzado">Calzado</option>
        //             <option value="indumentaria">Indumentaria</option>
        //             <option value="accesorios">Accesorios</option>
        //             <option value="suplementos">Suplementos</option>
        //         </select>
        //         <button>filtrar</button>
        //     </form>
        //     </div>

        <div>
            <div className='' >
            <label className=''>Filter by products:</label>
                <select defaultValue={'default'} name="products" onChange={handleInputChange}>
                    <option disabled={true} value='default'>All</option>
                      {/* {allProducts.Type.name?.map(el => (  
                        console.log("productos",allProducts.name),     
                        <option key={el} value={el.name}>{el.name}</option>
                      ))} */}
                </select>
            </div>
        </div>
    )
}