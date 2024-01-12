import { useState, useEffect } from "react";
import {v4 as UUIDV4} from 'uuid';
import { useProduct } from "@/context/CartContext";
import { ProductInterface } from "../interfaces";

export const useCart=()=>{
    const {products, total, totalProducts, addProduct, deleteProduct, deleteAllProducts} = useProduct()
    // const [products, setProducts]= useState([])
    const [badgeCount, setBadgeCount]= useState(0)
    // const [storageProducts, setStorageProductos]= useLocalStorage("products",[])

    // useEffect(()=>{

    // },[storageProducts])

    // const setNewProduct = (product: ProductInterface) => {
    //     const id = UUIDV4();
    //     let cart = [...storageProducts];
    //     const { name, price, quantity, image } = product;
    //     let productIndex = cart.findIndex((element) => element.name === name);
    
    //     if (productIndex === -1) {
    //         setStorageProductos([...storageProducts, { id, name, price, quantity, image }]);
    //     } else {
    //         cart[productIndex].quantity += quantity;  // Corregir esta línea
    //         setStorageProductos([...cart]);
    //     }
    // }
    const setNewProduct = (product: ProductInterface) => {
        const id = UUIDV4();
        addProduct(product);
        
    }
    
    //lo traemos desde el contexto
    const quitarUno = (id: string)=>{
        deleteProduct(id);
    }

    //lo traemos desde el contexto
    const deteleAllProducts=()=>{
        setStorageProductos()
    }

    const totalPrice= storageProducts.reduce((acc,product)=>{
        return Math.round((acc + product.price * product.quantity)*100)/100
    },0)

    const badgeCounter=()=>{
        let count=0
        storageProducts.forEach((element) => {
            count += element.quantity
        });
        setBadgeCount(count)
    }

    return {
        badgeCount,
        storageProducts,
        deleteProduct,
        deteleAllProducts,
        addProduct,
        totalPrice,
        badgeCounter
    }

}