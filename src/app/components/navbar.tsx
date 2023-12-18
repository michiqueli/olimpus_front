'use client';
import { useRouter, usePathname } from "next/navigation";
import SearchBar from "./searchbar";
import GoBack from "./buttons/goBack";

const NavBar: React.FC = () => {
  const router = useRouter();
  const path = usePathname();
  
  return (
  <div className="bg-yellow-300 w-full flex justify-center items-center">
    <div className="flex justify-between items-center p-4 w-[80%]">
      <div className="flex items-center">
        <button onClick={() => router.push('/')}>
          <img src="/zeus.png" alt="" className="w-10 h-10 p-1 bg-white rounded-lg ml-2" />
        </button>
        <p className="text-white hidden lg:inline font-serif text-2xl ml-4">Olimpus</p>
      </div>
      <SearchBar />
      <div className="flex">
        <button onClick={() => router.push('/login')}>
          <img src="https://i.ibb.co/X22nzYG/user.png" alt="" className="w-10 h-10 p-1 bg-white rounded-lg mr-4" />
        </button>
        <button onClick={() => router.push('/cart')}>
          <img src="https://i.ibb.co/h8rNp7y/shopping.png" alt="" className="w-10 h-10 p-1 bg-white rounded-lg mr-2" />
        </button>
      </div>
      {path !== '/' ? <GoBack title='Volver atrás'/> : ''}
    </div>
  </div>
  )
}

export default NavBar;