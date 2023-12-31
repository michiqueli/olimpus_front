'use client';
import { useRouter, usePathname } from "next/navigation";
import SearchBar from "./searchbar";
import GoBack from "./buttons/goBack";
import React from "react";

const NavBar: React.FC = () => {
  const router = useRouter();
  const path = usePathname();

  // Estado para controlar la visibilidad del menú desplegable
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  return (
    <div className="flex flex-col">
      <div className="bg-yellow-300 w-full h-28 flex justify-center items-center">
        <div className="flex justify-between items-center p-4 w-[95%]">
          <div className="flex items-center">
            <button onClick={() => router.push('/')}>
              <img src="/zeus.png" alt="" className="w-24 h-24 hover:scale-110" />
            </button>
          </div>
          <SearchBar />
          <div className="flex">
            <div className="relative">
              <button
                onClick={() => setDropdownVisible(!dropdownVisible)}
                className="flex items-center focus:outline-none"
              >
                <img src="/user.png" alt="" className="w-11 h-11 mr-6 hover:scale-110" />
              </button>
              {dropdownVisible && (
                <div className="absolute top-12 right-0 bg-white border border-gray-300 p-2 shadow-md rounded-md z-20">
                  <button
                    onClick={() => router.push('/userDetail/bb7f87f4-5ec6-4177-be68-9440ee3eb41b')}
                    className="font-bold block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
                  >
                    Mi Perfil
                  </button>
                  <button
                    onClick={() => router.push('/login')}
                    className="font-bold block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
                  >
                    Registrarse
                  </button>
                </div>
              )}
            </div>

            <button onClick={() => router.push('/cart')}>
              <img src="/shopping.png" alt="" className="w-11 h-11 hover:scale-110" />
            </button>
          </div>
        </div>
      </div>
      <div className="my-2 ml-2">
        {path !== '/' ? <GoBack title='← Volver atrás'/> : ''}
      </div>
    </div>
  );
};


export default NavBar;
