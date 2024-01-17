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
  const [contextProducts, setProducts] = useLocalStorage<CartInterface[]>('products', []);
  const [total, setTotal] = useLocalStorage<number>('totalPrice', 0);
  const [totalProducts, setTotalProducts] = useLocalStorage<number>('totalProducts', 0);

  const addProduct = (product: CartInterface) => {
  const existingProduct = contextProducts.find(p => p.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
    // localStorage.setItem('products', JSON.stringify([...contextProducts, existingProduct]));
    setProducts([...contextProducts]);
  } else {
    const newProduct = { ...product, quantity: 1 };
    // localStorage.setItem('products', JSON.stringify([...contextProducts, newProduct]));
    setProducts([...contextProducts, newProduct]);
  }

  setTotal((prevTotal) => prevTotal + product.price);
  setTotalProducts((prevTotal) => prevTotal + 1);
};


  const deleteProduct = (productos: CartInterface[], id: string) => {
    const indexProduct = productos.findIndex((product) => product.id === id);
  
    if (indexProduct !== -1) {
      const productToRemove = contextProducts[indexProduct];
      const newContextProducts = [...contextProducts];
      newContextProducts.splice(indexProduct, 1);
      setProducts(newContextProducts);
  
      setTotalProducts((prevTotal) => prevTotal - 1);
  
      if (typeof total !== 'undefined') {
        setTotal((prevTotal) => prevTotal - productToRemove.price);
      }
    }
  };
  
  const deleteAllProducts = () => {
    setProducts([]);
    setTotal(0);
    setTotalProducts(0);
  }

  return (
    <CartContext.Provider value={{ contextProducts, total, totalProducts, addProduct, deleteProduct, deleteAllProducts }}>
      {children}
    </CartContext.Provider>
  );
};
