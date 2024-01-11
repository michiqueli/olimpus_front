import { useRouter } from "next/navigation";
import { CartProps } from "../interfaces";
import { useProduct } from "@/context/CartContext";

const Cart: React.FC<CartProps> = ({ isOpen, setIsOpen, onClose }) =>{
    const router= useRouter()
    const {contextProducts, total, totalProducts, deleteAllProducts, deleteProduct} = useProduct();

    return(
        <>
        {isOpen && (
            <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <div className="pointer-events-auto w-screen max-w-md">
                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex-1 px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between">
                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Carrito de compras</h2>
                                <div className="ml-3 flex h-7 items-center">
                                <button onClick={onClose} type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">X</button>
                                </div>
                            </div>
                            
                        </div>
                            <div>
                            <p className="mt-0.5 text-sm text-gray-500 ml-20">Los productos en SALE no tienen cambio</p>
                            </div>
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                {
                                    contextProducts.length > 1 ? (

                                        contextProducts.map(product => (
                                            <div>
                                                <h1>{product.name}</h1>
                                                <h1>{product.price}</h1>
                                                <h1>{product.description}</h1>
                                            </div>
                                        ))
                                    )
                                    :
                                    <h1 className="text.black">No tenes agregado ningún producto al carrito wey</h1>
                                }
          
    


                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <button onClick={()=>router.push("")} className="flex items-center justify-center rounded-md border border-transparent bg-yellow-200 px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-yellow-300 ">
                                Iniciar compra
                                </button>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-black-500">
                                <button type="button" className="font-medium text-black-700 hover:text-yellow-300" onClick={()=>router.push("/catalogo")}>
                                Ver mas productos
                                <span aria-hidden="true"> &rarr;</span>
                                </button>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )}
        </> 
    )
}

export default Cart
