'use client';

import React, {useState} from "react";
import { createContext, useContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CartProviderProps, CreateContextProps, CartInterface } from "@/components/interfaces";

export const CartContext = createContext<CreateContextProps | undefined>(undefined);

export const useProduct = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useProduct debería estar siendo usado dentro de un provider');
  return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [contextProducts, setContextProducts] = useState<CartInterface[]>(() => {
    const productosEnJSON = localStorage.getItem('allProducts');
    return productosEnJSON ? JSON.parse(productosEnJSON) : [];
  });

  const [total, setTotal] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const addProduct = (product: CartInterface) => {
    let updatedProducts: CartInterface[] = [];
    const existingProductIndex = contextProducts.findIndex((p: CartInterface) => p.id === product.id);

    if (existingProductIndex !== -1) {
      contextProducts[existingProductIndex].quantity += 1;
      updatedProducts = contextProducts;
    } else {
      updatedProducts = [...contextProducts, { ...product, quantity: 1 }];
    }

    localStorage.setItem('allProducts', JSON.stringify(updatedProducts));

    setContextProducts(updatedProducts);
    setTotal((prevTotal) => prevTotal + product.price);
    setTotalProducts((prevTotal) => prevTotal + 1);
  };


  const deleteProduct = (productos: CartInterface[], id: string) => {
    const indexProduct = productos.findIndex((product) => product.id === id);
  
    if (indexProduct !== -1) {
      const productToRemove = contextProducts[indexProduct];
      const newContextProducts = [...contextProducts];
      newContextProducts.splice(indexProduct, 1);
      setContextProducts(newContextProducts);
  
      setTotalProducts((prevTotal) => prevTotal - 1);
  
      if (typeof total !== 'undefined') {
        setTotal((prevTotal) => prevTotal - productToRemove.price);
      }
    }
  };
  
  const deleteAllProducts = () => {
    setContextProducts([]);
    setTotal(0);
    setTotalProducts(0);
  }

  return (
    <CartContext.Provider value={{ contextProducts, total, totalProducts, addProduct, deleteProduct, deleteAllProducts }}>
      {children}
    </CartContext.Provider>
  );
};
