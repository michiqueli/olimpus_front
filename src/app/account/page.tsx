"use client";
import React from "react";
import { useSession } from "next-auth/react";

export default function UserDetail() {
  const {data: session} = useSession();

  return (
    <div className="mr-96 flex items-start justify-center h-screen">
      {/* Tarjeta de perfil del usuario */}
      <div className="flex flex-col rounded-lg bg-cover w-96 bg-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row" style={{ backgroundImage: 'url("/tarjetaDeUsuario1.jpg")' }}>
        <div className="flex flex-col justify-start p-6">
        {
            session?.user ? (
            <div>
              <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">{session?.user?.name}</h5>
              <p className=" font-bold mb-4 text-base text-neutral-600 dark:text-neutral-200">Email: {session?.user?.email}</p>
            </div>
            )
            :
            (
                ''
            )
        }
            
        </div>
      </div>
  
      {/* Contenedor de compras */}
      
    </div>
  );
  
}
