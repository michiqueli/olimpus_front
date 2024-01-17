"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductById } from "@/Redux/sliceProducts";
import { Review, CartInterface } from "@/components/interfaces";
import Cart from "@/components/cart/cart";
import { useProduct } from "@/context/CartContext";

export default function ProductDetail() {
  const {contextProducts, deleteProduct, deleteAllProducts, addProduct} = useProduct()
  const params = useParams();
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    image: '',
    price: 0,
    discount: 0,
    reviews: [] as Review[],
    stock: 0,
    quantity: 0
  });
  
  const productID = params.id;
  

  const increment = (producto: CartInterface) => {
    setCount(count + 1);
    // addProduct(product)
    const productos = localStorage.getItem('products');
    const existingProduct = productos ? JSON.parse(productos).find((p: CartInterface) => p.id === producto.id) : undefined;
    
    if (existingProduct) {
      existingProduct.quantity += 1;
      
      
    localStorage.setItem('products', JSON.stringify([...contextProducts, existingProduct]));
    
  } else {
    const newProduct = { ...producto, quantity: 1 };

    // localStorage.setItem('products', JSON.stringify([...contextProducts, newProduct]));
   
  }

  
};

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
    deleteProduct(contextProducts, product.id)
    
  };

  function getAverageRating(): number {
    const totalRating = product.Reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / product.Reviews.length;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const productFind = await getProductById(productID);
        setProduct(productFind);
        console.log("p", productFind)
      } catch (error) {
        console.error(
          "Error en render componente de detalle producto",
          error
        );
      }
    }
    fetchData();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const handleAddToCart = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Cart isOpen={isOpen} setIsOpen={setIsOpen} onClose={onClose}/>
      <div>
        <div>
          <div className="flex flex-row justify-end bg-gray-50 ">
            <div className="flex items-center mb-10 mr-4">
              <img
                src={product.image}
                alt="image product"
                className="w-50 h-50 object-cover "
              />
            </div>
            <div>
              <div className="max-w-md mx-auto  mt-20 mr-80  ml-40 ">
                <h1 className="text-black text-6xl text-center ">
                  {product.name}
                </h1>
                <h2 className="text-black text-center text-lg mt-16">
                  {product.description}
                </h2>
                <div className="flex flex-col items-center justify-center flex-grow">
                  {/*div precio*/}
                  {product.discount ? (
                    <div>
                      <div className="flex flex-row align-middle text-center">
                        <h1 className="text-gray-600 text-xl line-through">
                          $ {product.price}
                        </h1>
                        <h1 className="text-sm text-lime-500 ml-2">
                          {product.discount}%
                        </h1>
                      </div>
                      <h1 className="text-lime-500 text-xl">
                        ${" "}
                        {product.price -
                          (product.price * product.discount) / 100}
                      </h1>
                    </div>
                  ) : (
                    <h1 className="text-lime-500 text-xl">${product.price}</h1>
                  )}
                </div>
              </div>
              <div className="flex items-center ml-40">
                <img
                  alt=""
                  src="/envio.png"
                  width={60}
                  height={60}
                  className="mt-20"
                />
                <h2 className="text-black text-lg ml-4 mt-20">
                  Envíos gratis a partir de $20.000
                </h2>
              </div>
              <div className="flex justify-between items-center ml-40 mt-10">
                <div className="text-lg">
                  <h2>Cantidad</h2>
                </div>

                {product.stock > 0 ? (
                  <h1 className="text-lg text-black mr-80">Stock: {product.stock}</h1>
                ) : (
                  <h1 className="text-xl text-red-600 ">Producto SIN stock</h1>
                )}
              </div>
              <div className="flex items-center mt-4 ml-40 text-lg border font-bold border-gray-300 w-5/12 p-4 rounded-full ">
                <button
                  onClick={decrement}
                  className="mr-20  bg-yellow-100 text-black  py-2 px-4 rounded-full"
                >
                  -
                </button>
                <p className="mr-20 font-normal "> {count}</p>
                <button
                  className="mr-20  bg-yellow-100 text-black  py-2 px-4 rounded-full"
                  onClick={() => increment(product)}
                >
                  +
                </button>
              </div>
              <button onClick={handleAddToCart} className="my-20 ml-60 text-xl bg-yellow-200 hover:bg-yellow-300 text-black font-normal py-2 px-4 rounded-full">
                Agregar al carrito
              </button>
            </div>
          </div>
          <div className="max-w-4xl mx-auto mt-4 flex">
            {/* Promedio de Valoración General */}
            {product.Reviews && product.Reviews.length > 0 && (
              <div className="mr-8">
                <h3 className="text-black font-bold text-lg">
                  Promedio de Valoración General:
                </h3>
                <div className="text-yellow-500 mb-2">
                  {Array.from({ length: Math.max(0, Math.round(getAverageRating())) }).map(
                    (_, i) => (
                      <span key={i} className="text-2xl">
                        ⭐
                      </span>
                    )
                  )}
                </div>
                <p className="text-gray-500 text-sm">
                  Promedio: {getAverageRating().toFixed(2)}%
                </p>
              </div>
            )}

            {/* Opiniones */}
            <div className="max-w-4xl mx-auto p-6 border  border-gray-300 rounded-md bg-gray-50">
              <h2 className="text-black font-bold text-center text-xl">Opiniones:</h2>
              {product.Reviews &&
                product.Reviews.map((review: Review, index) => (
                  <div key={index} className="mt-4 border-b border-gray-300 pb-4">
                    <div className="text-yellow-500 mb-2">
                      {Array.from({ length: Math.max(0, review.rating) }).map(
                        (_, i) => (
                          <span key={i} className="text-2xl">
                            ⭐
                          </span>
                        )
                      )}
                    </div>
                    <p className="text-black text-xl">{review.content}</p>
                    {/* Porcentaje de valoración en rango de 1 a 5 estrellas */}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
     
    </>
  )
}
            