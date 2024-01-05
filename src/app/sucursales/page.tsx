"use client";
import React from "react";

export default function Sucursales() {

    const locales=[
        {name:"Buenos Aires - Mar del Plata",direccion:"Güemes 2620"},
        {name:"Buenos Aires - Bahía Blanca",direccion:"Alsina 232"},
        {name:"Buenos Aires - Balcarce",direccion:"Calle 19 Nro. 621"},
        {name:"Neuquén - San Martín de los Andes",direccion:"Av. San Martín 820"},
        {name:"Neuquén", direccion:"Av. Argentina 197"},
        {name:"Mendoza",direccion:"Espejo 62"},
        {name:"Caba - Palermo",direccion:"Av. Córdoba 5369"},
        {name:"Caba - Recoleta",direccion:"Paraná 780"},
        {name:"Gran Buenos Aires - Avellaneda",direccion:"Gral. Güemes 897"},
        {name:"Gran Buenos Aires - Morón",direccion:"Av. Rivadavia 18001"},
        {name:"Córdoba capital",direccion:"Rosario de Santa Fe 165"},
        {name:"San Juan capital",direccion:"Entre Ríos Sur 107"},
        {name:"Santa Fe - Rosario",direccion:"Corrientes 946"},
        {name:"Tierra del Fuego - Ushuaia",direccion:"Av. San Martín 823"},
        {name:"Corrientes capital",direccion:"Av. Raúl Alfonsín 3525"},
    ];

    return (
        <div className="grid grid-cols-3 gap-4">
            {locales.map((local, index) => (
                <div key={index} className="flex flex-col items-center mb-4 p-4 ">
                    <img src="/ubicacion.png" alt="Ubicación" className="w-4 h-4 mb-2" />
                    <p className="text-3sm font-bold mb-1">{local.name}</p>
                    <p className="text-3xs">{local.direccion}</p>
                </div>
            ))}
        </div>
    );
}