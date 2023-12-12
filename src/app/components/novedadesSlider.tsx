'use client';

import { Carousel } from 'flowbite-react';
import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@/Redux/hooks';
import { getDiscountProducts } from '@/Redux/Actions';

function NovedadesSlicer() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const filterByDiscount = () => {
    getDiscountProducts(dispatch)
    router.push("/resultPage")
  }

  return (
    <div className="h-56 sm:h-50 xl:h-80 2xl:h-96 w-10/12 mx-auto">
      <Carousel slide={true}>
        <button className="w-full h-full" onClick= {filterByDiscount}>
          <img className= "object-fit w-full h-full" src="https://www.hnosperez.com/blog/wp-content/uploads/2015/01/mega-descuentos-categoria.jpg" alt="..." />
        </button>
        <button className="w-full h-full" onClick={()=>router.push("/resultPage")}>
          <img className= "object-fit w-full h-full" src="https://d22fxaf9t8d39k.cloudfront.net/67697c6f30030fd50ff940047889495611a0ca3ab3421f8fa8eab98a7df8b47676932.jpeg" alt="..." />
        </button>
        <button className="w-full h-full" onClick={()=>router.push("/resultPage")}>
          <img className= "object-fit w-full h-full"src="https://pbs.twimg.com/media/BexnS4bCMAA6YUm.png:large" alt="..." />
        </button>
      </Carousel>
    </div>
  );
}
export default NovedadesSlicer;