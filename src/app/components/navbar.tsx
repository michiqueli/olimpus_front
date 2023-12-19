'use client';
import { useRouter } from "next/navigation";
import SearchBar from "./searchbar";

const NavBar: React.FC = () => {
  const router = useRouter();
  return (
  <div className="bg-yellow-300 w-full h-28 flex justify-center items-center">
    <div className="flex justify-between items-center p-4 w-[95%]">
      <div className="flex items-center">
        <button onClick={() => router.push('/')}>
          <img src="/zeus.png" alt="" className="w-24 h-24 hover:scale-110" />
        </button>
      </div>
      <SearchBar />
      <div className="flex">
        <button onClick={() => router.push('/login')}>
          <img src="/user.png" alt="" className="w-11 h-11 mr-6 hover:scale-110" />
        </button>
        <button onClick={() => router.push('/cart')}>
          <img src="/shopping.png" alt="" className="w-11 h-11 hover:scale-110" />
        </button>
      </div>
    </div>
  </div>
  )
}

export default NavBar;