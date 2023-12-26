"use client";
// import { useEffect, useState } from "react";
// import { getUsersById } from "@/Redux/Actions";
// import { useAppDispatch } from "@/Redux/hooks"
// import { useParams } from "next/navigation";

// export default function UserDetail() {
//   const dispatch = useAppDispatch();
//   const { id } = useParams();

//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     street: "",
//     zipCode:""
//   });

//   useEffect(() => {
//    getUsersById(id,dispatch)
//   }, [dispatch]);

//   return (
//     <div>
//       <h2>User Detail Page</h2>
//       <p>Name: {user.name}</p>
//       <p>Email: {user.email}</p>
//       <p>Street: {user.street}</p>
//       <p>zipCode: {user.zipCode}</p>
//     </div>
//   );
// }

"use client";
import React from "react";
import { useEffect, useState } from "react";
import {getUsersById} from "@/Redux/Actions"
import {useAppDispatch, useAppSelector} from "@/Redux/hooks"
import { useParams } from "next/navigation";
import { getUsers } from "@/Redux/sliceUsers";
import { Users } from "@/app/components/interfaces";

export default function UserDetail() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const usuarios=useAppSelector(getUsers)
  console.log("usuarios",usuarios)
  
  // const [user, setUser] = useState({
  //   email:"",
  //   password:"",
  //   street:"",
  //   zipCode:"",
  //   roleid:0,
  //   isActive:true,
  // });

  useEffect(()=>{
    getUsersById(id,dispatch)
  },[dispatch])

  return (
    <div className="flex flex-col rounded-lg bg-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row ml-96">
      <div className="flex flex-col justify-start p-6">
        {/* {Array.isArray(usuarios) && usuarios.map((typeUser: Users) => (
          console.log("UUU",usuarios),
          <div key={typeUser.id}>
            <p>{typeUser.name}</p>
            <p>{typeUser.email}</p>
            <p>{typeUser.street}</p>
            <p>{typeUser.zipCode}</p>
          </div>
        ))} */}

        
        <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
          hola
        </h5>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          description
        </p>
      </div>
    </div>
  );

}

