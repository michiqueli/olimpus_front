"use client";
import { useDispatch, useSelector} from "react-redux";
import { useState } from "react";
import {orderByName, orderByPrice, filterByProduct} from '../../Redux/Actions'

export default function Filtered (){
    const dispatch=useDispatch();
    const allProducts=useSelector((state) => state.products)
    const [selectedProduct, setSelectedProduct] = useState('');
    
    const handleProducthange = async (e) => {
        const product = e.target.value;
        setSelectedProduct(product);
        try {
            await dispatch(filterByProduct(product));
        } catch (error) {
            console.error(error);
        }
    };

    const handleOrderName = (event) => {
        dispatch(orderByName(event.target.value));
    };

    const handleOrderPrice = (event) => {
        dispatch(orderByPrice(event.target.value));
    };

    return(
        <div>
            <div className='' >
            <label className=''>Filter by products:</label>
                <select defaultValue={'default'} name="products" onChange={handleProducthange}>
                    <option disabled={true} value='default'>All</option>
                      {allProducts?.map(el => (       
                        <option key={el} value={el}>{el}</option>
                      ))}
                </select>
        </div>

        <div  className='' >
                <label className=''>Order by name</label>
                <select onChange={(event) => handleOrderName(event)}>
                    <option value="Ascendente">A-Z</option>
                    <option value="Descendente">Z-A</option>
                </select>
       </div>

       <div  className='' >
                <label className=''>Order by price</label>
                <select onChange={(event) => handleOrderPrice(event)}>
                    <option value="Ascendente">A-Z</option>
                    <option value="Descendente">Z-A</option>
                </select>
            </div>
        </div>
    )

}