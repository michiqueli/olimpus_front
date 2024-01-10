'use client';

import { createContext, useContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ProductInterface, TaskProviderProps, CreateContextProps } from "@/components/interfaces";

export const CartContext = createContext<CreateContextProps | undefined>(undefined);

export const useProduct = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useProduct debería estar siendo usado dentro de un provider');
  return context;
};

export const CartProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [products, setProducts] = useLocalStorage<ProductInterface[]>('products', []);
  const [total, setTotal] = useLocalStorage<number>('totalPrice', 0);

  const addProduct = (product: ProductInterface) => {
    setProducts([...products, product]);
    setTotal((prevTotal) => prevTotal + product.price);
  };

  return (
    <CartContext.Provider value={{ products, setProducts, addProduct, total }}>
      {children}
    </CartContext.Provider>
  );
};
