'use client';

import { Carousel } from 'flowbite-react';
import { useRouter } from 'next/navigation';

function CardSlider() {
  const router = useRouter()
  return (
    <div className="h-56 sm:h-50 xl:h-80 2xl:h-96 w-10/12 mx-auto">
        <div className='flex'>
            <h1 className='w-full'>Productos más populares:</h1>
        </div>
        <Carousel slide={true}>
            <div className="flex">
                <button className="w-1/3 h-full" onClick={()=>router.push("/productDetail/id")}>
                    <img className= "object-fit w-full h-full" src="https://iili.io/JTrJO57.png" alt="..." />
                </button>
                <button className="w-1/3 h-full" onClick={()=>router.push("/productDetail/id")}>
                    <img className= "object-fit w-full h-full" src="https://iili.io/JTrJNJS.png" alt="..." />
                </button>
                <button className="w-1/3 h-full" onClick={()=>router.push("/productDetail/id")}>
                    <img className= "object-fit w-full h-full"src="https://iili.io/JTrJjg2.png" alt="..." />
                </button>
                <button className="w-1/3 h-full" onClick={()=>router.push("/productDetail/id")}>
                    <img className= "object-fit w-full h-full" src="https://iili.io/JTrJtzg.png" alt="..." />
                </button>
                <button className="w-1/3 h-full" onClick={()=>router.push("/productDetail/id")}>
                    <img className= "object-fit w-full h-full" src="https://iili.io/JTrJDXa.png" alt="..." />
                </button>
                <button className="w-1/3 h-full" onClick={()=>router.push("/productDetail/id")}>
                    <img className= "object-fit w-full h-full"src="https://iili.io/JTrd3mX.png" alt="..." />
                </button>
            </div>
            <div className="flex">
                <button className="w-1/3 h-full" onClick={()=>router.push("/productDetail/id")}>
                    <img className= "object-fit w-full h-full" src="https://iili.io/JTrJO57.png" alt="..." />
                </button>
                <button className="w-1/3 h-full" onClick={()=>router.push("/productDetail/id")}>
                    <img className= "object-fit w-full h-full" src="https://iili.io/JTrJNJS.png" alt="..." />
                </button>
                <button className="w-1/3 h-full" onClick={()=>router.push("/productDetail/id")}>
                    <img className= "object-fit w-full h-full"src="https://iili.io/JTrJjg2.png" alt="..." />
                </button>
                <button className="w-1/3 h-full" onClick={()=>router.push("/productDetail/id")}>
                    <img className= "object-fit w-full h-full" src="https://iili.io/JTrJtzg.png" alt="..." />
                </button>
                <button className="w-1/3 h-full" onClick={()=>router.push("/productDetail/id")}>
                    <img className= "object-fit w-full h-full" src="https://iili.io/JTrJDXa.png" alt="..." />
                </button>
                <button className="w-1/3 h-full" onClick={()=>router.push("/productDetail/id")}>
                    <img className= "object-fit w-full h-full"src="https://iili.io/JTrd3mX.png" alt="..." />
                </button>
            </div>
      </Carousel>
    </div>
  );
}
export default CardSlider;