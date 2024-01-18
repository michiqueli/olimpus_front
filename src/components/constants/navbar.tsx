"use client";
import { useRouter, usePathname } from "next/navigation";
import SearchBar from "./searchbar";
import GoBack from "../buttons/goBack";
import { useState } from "react";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Cart from "../cart/cart";
import { useProduct } from "@/context/CartContext";

const NavBar: React.FC = () => {
  const { data: session } = useSession();

  const { total } = useProduct();
  const user: any = session?.user;

  const router = useRouter();
  const path = usePathname();
  // Estado para controlar la visibilidad del menú desplegable
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  // Estado para abrir modal carrito
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);

  const handleCartClick = () => {
    openModal();
  };
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Cart isOpen={isOpen} setIsOpen={setIsOpen} onClose={onClose} />
      <div className="flex flex-col">
        <div className="bg-yellow-300 w-full h-28 flex justify-center items-center">
          <div className="flex justify-between items-center p-4 w-[95%]">
            <div className="flex items-center">
              <button onClick={() => router.push("/")}>
                <img
                  src="/zeus.png"
                  alt=""
                  className="w-24 h-24 hover:scale-110"
                />
              </button>
            </div>
            {user ? (
              <div>
                <h1 className="text-black">Bienvenido {user.user.name}</h1>
              </div>
            ) : (
              ""
            )}
            <SearchBar />
            <div className="flex">
              <div className="relative">
                <button
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    src="/user.png"
                    alt=""
                    className="w-11 h-11 mr-6 hover:scale-110"
                  />
                </button>
                {dropdownVisible && (
                  <div className="w-36 absolute top-12 right-0 bg-white border border-gray-300 p-3 shadow-md rounded-md z-20">
                    {session?.user ? (
                      <>
                        <button
                          onClick={() =>
                            router.push(`/userDetail/${user.user.id}`)
                          }
                          className="font-bold block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
                        >
                          Mi Perfil
                        </button>
                        <div>
                          {user.user.roleId === 1 || user.user.roleId === 2 ? (
                            <button 
                            onClick={() =>
                              router.push(`/adminDashboard/`)
                            }
                            className="font-bold block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none">
                              Admin
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                        <button
                          onClick={async () => {
                            await signOut({
                              callbackUrl: "/",
                            });
                          }}
                          className="font-bold block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
                        >
                          ¿Log-out?
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => router.push("/login")}
                        className="font-bold block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
                      >
                        ¿Log-in?
                      </button>
                    )}
                  </div>
                )}
              </div>
              <button onClick={handleCartClick}>
                <img
                  src="/shopping.png"
                  alt=""
                  className="w-11 h-11 hover:scale-110"
                />
              </button>
            </div>
            <h1 className="text-black">Total: {total}</h1>
          </div>
        </div>
        <div className="my-2 ml-2">
          {path !== "/" ? <GoBack title="← Volver atrás" /> : ""}
        </div>
      </div>
    </>
  );
};

export default NavBar;
