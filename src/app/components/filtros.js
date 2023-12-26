"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { getTypes, getSubTypes, getMetrics, orderByPrice} from "@/Redux/Actions";
import { useState } from "react";
import { getProducts } from "@/Redux/sliceProducts";

export default function Filtered() {
  const dispatch = useAppDispatch();

  const initialState = {
    name: ""
  };
  const allProducts = useAppSelector(getProducts);
   
  const [estado, setEstado] = useState(initialState);
  const [filteredSubtypes, setFilteredSubtypes] = useState([]);
  const [filteredMetrics, setFilteredMetrics] = useState([]);


  const handleInputChange = (event) => {
    const selectedCategory = event.target.value;
        
    const filteredSubtypes = allProducts
      .filter(product => product.Type.name === selectedCategory)
      .map(product => product.Subtype.name);

    const uniqueSubtypes = [...new Set(filteredSubtypes)];
      setFilteredSubtypes(uniqueSubtypes);

      // También obtén las métricas relacionadas con la categoría seleccionada
    const filteredMetrics = allProducts
      .filter(product => product.Type.name === selectedCategory)
      .map(product => product.Subtype.metric);

    const uniqueMetrics = [...new Set(filteredMetrics)];
      setFilteredMetrics(uniqueMetrics);

    getTypes(selectedCategory, dispatch);
  };

  const handleInputSubtypes = (event) => {

    const value = event.target.value;
      setEstado((prevEstado) => {
        // Usar el estado anterior para obtener el valor actualizado
        const nuevoEstado = { ...prevEstado, name: value };
          // Actualizar el estado
          return nuevoEstado;
      });   
      getSubTypes(value,dispatch)
    };

  const handleInputMetrics = (event) => {

    const value = event.target.value;
    setEstado((prevEstado) => {
      // Usar el estado anterior para obtener el valor actualizado
      const nuevoEstado = { ...prevEstado, name: value };
      // Actualizar el estado
        return nuevoEstado;
    });   
    getMetrics(value,dispatch)
  };

      
  //const handleOrderByPrice = async (event) => {
  //   const order = event.target.value;
  //   let sortedProducts;

  //   if (order === 'desc') {
  //     sortedProducts = [...allProducts].reverse(); // Hacer una copia antes de revertir
  //   } else {
  //     sortedProducts = [...allProducts]; // Hacer una copia para evitar modificar el estado directamente
  //   }

  //   orderByPrice(sortedProducts, dispatch);
  // };

  const handleOrderByPrice = async (event) => {
    const order = event.target.value;
    
    console.log(order)
    let ascending

    if (order === 'desc') {
      // Ordenar de forma descendente por precio
      ascending = false
    } else {
      // Ordenar de forma ascendente por precio
    ascending = true
    } 
    orderByPrice( ascending, dispatch);
  };

  
  return (
    <div className="flex space-x-4 mb-10">
      <div className="flex-grow w-4 h-4">
        <label className="">Filter by category:</label>
        <select className="w-full" defaultValue={'default'} name="products" onChange={event => handleInputChange(event)}>
          <option value='todos'>Todos</option>
          {[...new Set(allProducts.map(el => el.Type.name))].map(typeName => (
            <option key={typeName} value={typeName}>{typeName}</option>
          ))}
        </select>
      </div>
      
      <div className="flex-grow w-4 h-4">
        <label className="">Filter by products:</label>
        <select className="w-full" defaultValue={'default'} name="subtypes" onChange={event => handleInputSubtypes(event)}>
          <option value='todos'>Todos</option>
          {filteredSubtypes.map(typeName => (
            <option key={typeName} value={typeName}>{typeName}</option>
          ))}
        </select>
      </div>
      
      <div className="flex-grow w-4 h-4">
        <label className="">Filter by metric:</label>
        <select className="w-full" defaultValue={'default'} name="metrics" onChange={event => handleInputMetrics(event)}>
          <option value='todos'>Todos</option>
          {filteredMetrics.map(metric => (
            <option key={metric} value={metric}>{metric}</option>
          ))}
        </select>
      </div>
      
      <div className="flex-grow w-4 h-4">
        <label className="">Order by price:</label>
        <select className="w-full"  name="price" onChange={event => handleOrderByPrice(event)}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>
    </div>    
  );
}




