import { useState, useEffect } from "react";
import { v4 as UUIDV4 } from "uuid";

export const useCart = () => {
  const [products, setProducts] = useState([]);
  const [badgeCount, setBadgeCount] = useState(0);
  const [storageProducts, setStorageProductos] = useLocalStorage(
    "products",
    []
  );

  useEffect(() => {}, [storageProducts]);

  const addProduct = (product) => {
    const id = UUIDV4();
    let cart = [...storageProducts];
    const { name, price, quantity, image } = product;
    let productIndex = cart.findIndex((element) => element.name === name);

    if (productIndex === -1) {
      setStorageProductos([
        ...storageProducts,
        { id, name, price, quantity, image },
      ]);
    } else {
      cart[productIndex].quantity += quantity; // Corregir esta línea
      setStorageProductos([...cart]);
    }
  };

  const deleteProduct = (id) => {
    const productFilter = storageProducts.filter((pr) => {
      if (pr.id !== id) {
        return pr;
      }
    });
    setStorageProductos(productFilter);
  };

  const deteleAllProducts = () => {
    setStorageProductos();
  };

  const totalPrice = storageProducts.reduce((acc, product) => {
    return Math.round((acc + product.price * product.quantity) * 100) / 100;
  }, 0);

  const badgeCounter = () => {
    let count = 0;
    storageProducts.forEach((element) => {
      count += element.quantity;
    });
    setBadgeCount(count);
  };

  return {
    badgeCount,
    storageProducts,
    deleteProduct,
    deteleAllProducts,
    addProduct,
    totalPrice,
    badgeCounter,
  };
};
