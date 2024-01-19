"use client";
import { useRouter, usePathname } from "next/navigation";
import SearchBar from "./searchbar";
import GoBack from "../buttons/goBack";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useProduct } from "@/context/CartContext";
import Swal from 'sweetalert2'

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const {contextProducts} = useProduct()
  const user: any = session?.user;
  const router = useRouter();
  const path = usePathname();
  // Estado para controlar la visibilidad del menú desplegable
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  
  const length = contextProducts.length;

  return (
    <main>
      
      
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
            {session?.user ? (
              <div>
                <h1 className="text-black">Bienvenido {user?.name}</h1>
              </div>
            ) : (
              <h1 className="text-black">Bienvenido {user?.user.name}</h1>
            )}
            <SearchBar />
            <div className="flex">
              <div className="relative">
                <button
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                  className="flex items-center focus:outline-none"
                >
                  {session?.user ? (
                    <img
                      src={user.user.image || "/usuario.png"}
                      alt="User"
                      className="w-11 h-11 mr-6 hover:scale-110"
                    />
                  ) : (
                    <img
                      src="/user.png"
                      alt="User"
                      className="w-11 h-11 mr-6 hover:scale-110"
                    />
                  )}
                </button>
                {dropdownVisible && (
                  <div className="w-36 absolute top-12 right-0 bg-white border border-gray-300 p-3 shadow-md rounded-md z-20">
                    {session?.user ? (
                      <>
                        <button
                          onClick={() => {
                            router.push(`/userDetail/${user?.user.id}`);
                            setDropdownVisible(!dropdownVisible);
                          }}
                          className="font-bold block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
                        >
                          Mi Perfil
                        </button>
                        <div>
                          {user?.user.roleId === 1 || user?.user.roleId === 2 ? (
                            <button
                              onClick={() => {
                                router.push(`/adminDashboard/`);
                                setDropdownVisible(!dropdownVisible);
                              }}
                              className="font-bold block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
                            >
                              Admin
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                        <button
                          onClick={ async () => {
                            Swal.fire({
                              position: "center",
                              icon: "error",
                              title: "Adios...",
                              text: "Ya no estaras logueado en Olimpus Shop",
                              showConfirmButton: false,
                              timer: 3500
                            });
                            setTimeout(async () => {
                              await signOut({
                                callbackUrl: "/"
                              });
                            }, 3500);                       
                          }}
                          className="font-bold block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
                        >
                          ¿Log-out?
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setDropdownVisible(!dropdownVisible);
                          router.push("/login");
                        }}
                        className="font-bold block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
                      >
                        ¿Log-in?
                      </button>
                    )}
                  </div>
                )}
              </div>
              <button onClick={() => router.push("/cart")}>
                <img
                  src="/shopping.png"
                  alt=""
                  className="w-11 h-11 hover:scale-110"
                />
              </button>
            <h1 className="text-black font-black ml-1">{length}</h1>
            </div>
          </div>
        </div>
        <div className="my-2 ml-2">
          {path !== "/" ? <GoBack title="← Volver atrás" /> : ""}
        </div>

    </main>
  );
};

export default NavBar;
