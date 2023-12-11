'use client';

import { Carousel } from 'flowbite-react';
import { useRouter } from 'next/navigation';

function NovedadesSlicer() {
  const router = useRouter()
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slide={true}>
        <button className="w-full h-full" onClick={()=>router.push("/search")}>
        <img className= "object-fit w-full h-full" src="https://www.hnosperez.com/blog/wp-content/uploads/2015/01/mega-descuentos-categoria.jpg" alt="..." />
        </button>
        <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
      </Carousel>
    </div>
  );
}
export default NovedadesSlicer;