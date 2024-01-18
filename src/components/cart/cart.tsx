import React, {useState} from "react";
import { useRouter } from "next/navigation";
import { CartInterface, CartProps } from "../interfaces";
import { useSession } from "next-auth/react";

const Cart: React.FC<CartProps> = ({ isOpen, setIsOpen, onClose }) =>{
    const router= useRouter();
    const [productos, setProductos] = useState(() => {
      const productosEnJSON = localStorage.getItem('allProducts');
      return productosEnJSON ? JSON.parse(productosEnJSON) : [];
    });
   
    const renderedProductIds = new Set();
    const { data: session } = useSession();
    const user : any = session?.user;

    const deleteOneProduct = (product: CartInterface) => {
      const findProdIndex = productos.findIndex((prod: CartInterface) => prod.id === product.id);
  
      if (findProdIndex !== -1) {
        const updatedProducts = [...productos];
        updatedProducts.splice(findProdIndex, 1);
  
        setProductos(updatedProducts);
        localStorage.setItem('allProducts', JSON.stringify(updatedProducts));
      }
    };

    const decrementOne = (product: CartInterface) => {
    const productosLS = localStorage.getItem('allProducts');
    
      if(productosLS){
        const parsedProducts: CartInterface[] = JSON.parse(productosLS)
        const findProd = parsedProducts.find(prod => product.id == prod.id);

      if(findProd){
        findProd.quantity -= 1;
        localStorage.setItem('allProducts', JSON.stringify(parsedProducts))
      }
    }
    }

    const deleteAll = () => {
      setProductos([]);
      localStorage.removeItem('allProducts');
    }
  

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
                        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                          Carrito de compras
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button onClick={onClose} type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                            X
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="mt-0.5 text-sm text-gray-500 ml-20">Los productos en SALE no tienen cambio</p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        {productos.length > 0 ? (
                            productos.map((product: CartInterface) => (
                                    <div key={product.id}>
                                    <img src={product.image} alt="image product" width={100} height={100} className="object-cover" />
                                    <h1 onClick={() => router.push("/productDetail")}>{product.name}</h1>
                                    <h1>{product.price}</h1>
                                    <h1>{product.description}</h1>
                                    <h1>Cantidad: {product.quantity}</h1>
                                    <button onClick={() => deleteOneProduct(product)}>Eliminar</button>
                                    </div>
                                )
                            )
                            ) : (
                                <h1 className="text.black">No tienes agregado ningún producto al carrito, wey</h1>
                            )
                            }
                            <h1>cantidad total: {productos.length}</h1>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <button onClick={()=>router.push(`/pasarelaPagos/${user.user.id}`)} className="flex items-center justify-center rounded-md border border-transparent bg-yellow-200 px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-yellow-300 ">
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
      );
    };
    
    export default Cart;