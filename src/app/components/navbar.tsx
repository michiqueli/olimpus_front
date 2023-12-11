'use client';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const NavBar: React.FC = () => {
  const router = useRouter();
  return (
  <div className="bg-black w-[100%]">
    <div className="flex justify-between items-center p-4">
      <div className="flex items-center">
        <img src="https://i.ibb.co/BrF41j4/zeus-1.png" alt="" className="w-10 h-10 p-1 bg-white rounded-lg ml-2" />
        <p className="text-white hidden lg:inline font-serif text-2xl ml-4">Olimpus</p>
      </div>
      <input type="text" className="block sm:w-60 md:w-80 lg:w-3/5 h-10 p-3 pl-4 rounded-lg bg-gray-300 focus:outline-none" />
      <div className="flex">
        <button onClick={() => signIn()}>
          <img src="https://i.ibb.co/X22nzYG/user.png" alt="" className="w-10 h-10 p-1 bg-white rounded-lg mr-4" />
        </button>
        <img src="https://i.ibb.co/h8rNp7y/shopping.png" alt="" className="w-10 h-10 p-1 bg-white rounded-lg mr-2" />
      </div>
    </div>
  </div>
  )
}

export default NavBar;