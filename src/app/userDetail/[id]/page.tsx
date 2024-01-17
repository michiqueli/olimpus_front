"use client";
import React, { useEffect } from "react";
import { getUsersById } from "@/Redux/Actions";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { useParams } from "next/navigation";
import { getUsers } from "@/Redux/sliceUsers";
import { useRouter } from "next/navigation";

export default function UserDetail() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = useParams();

  const usuarios=useAppSelector(getUsers);


  useEffect(() => {
    getUsersById(id, dispatch);
  }, [dispatch]);

  return (
    <div className="mr-96 flex items-start justify-center h-screen">
      <div className="flex flex-col rounded-lg bg-cover w-96 bg-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row" style={{ backgroundImage: 'url("/tarjetaDeUsuario1.jpg")' }}>
        <div className="flex flex-col justify-start p-6">

          {usuarios && (
            <div>
              <h5 className="mb-4 text-2xl font-medium text-neutral-800 dark:text-neutral-50">{usuarios.name}</h5>
              <p className="font-bold mb-4 text-base text-neutral-600 dark:text-neutral-200" style={{ lineHeight: "1.5" }}>Email: {usuarios.email}</p>
              <p className="font-bold mb-4 text-base text-neutral-600 dark:text-neutral-200" style={{ lineHeight: "1.5" }}>Street: {usuarios.street}</p>
              <p className="font-bold mb-4 text-base text-neutral-600 dark:text-neutral-200" style={{ lineHeight: "1.5" }}>Zip Code: {usuarios.zipCode}</p>
            </div>
          )}
        </div>
      </div>

      {usuarios && (
        <button
          onClick={() => router.push(`/reviews/${usuarios.id}`)}
          style={{ marginTop: "1rem" }}
          className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Mis compras 🛒
        </button>
      )}
    </div>
  );
}
