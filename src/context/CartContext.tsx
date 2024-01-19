'use client';

import React, {useEffect, useState} from "react";
import { createContext, useContext } from "react";
import { CartProviderProps, CreateContextProps, CartInterface } from "@/components/interfaces";

export const CartContext = createContext<CreateContextProps | undefined>(undefined);

export const useProduct = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useProduct debería estar siendo usado dentro de un provider');
  return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [contextProducts, setContextProducts] = useState<CartInterface[]>([]);

  useEffect(() => {
    const item = localStorage.getItem('allProducts');
    if(item){
      const contextProducts = JSON.parse(item);
      if(contextProducts.length > 0) {
        setContextProducts(contextProducts);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('allProducts', JSON.stringify(contextProducts));
  })

  const [total, setTotal] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const addProduct = (product: CartInterface) => {
    let updatedProducts: CartInterface[] = [];
    const existingProductIndex = contextProducts.findIndex((p: CartInterface) => product.id === p.id);

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

  const deleteProduct = (id: string) => {
    const indexProduct = contextProducts.findIndex((product) => product.id === id);
  
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

  const decrementOne = (id: string) => {
      const updatedProduct = contextProducts.map((prod: CartInterface) => {
        if(prod.id == id && prod.quantity > 0) {
          return {...prod, quantity: prod.quantity - 1};
        }
        return prod
      })
      setContextProducts(updatedProduct);
      localStorage.setItem("allProducts", JSON.stringify(updatedProduct));
    }
  
  const deleteAllProducts = () => {
    setContextProducts([]);
    setTotal(0);
    setTotalProducts(0);
  }

  return (
    <CartContext.Provider value={{ contextProducts, total, totalProducts, addProduct, decrementOne, deleteProduct, deleteAllProducts }}>
      {children}
    </CartContext.Provider>
  );
};
