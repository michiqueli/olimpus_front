"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  getTypes,
  getSubTypes,
  getMetrics,
  orderByPrice,
  reset,
  orderByPrices,
} from "@/Redux/Actions";
import { useState } from "react";
import { getProducts } from "@/Redux/sliceProducts";

export default function Filtered() {
  const dispatch = useAppDispatch();

  const initialState = {
    name: "",
  };
  const allProducts = useAppSelector(getProducts);

  const [estado, setEstado] = useState(initialState);
  const [subtyState, setSubtyState] = useState("");
  const [filteredSubtypes, setFilteredSubtypes] = useState([]);
  const [filteredMetrics, setFilteredMetrics] = useState([]);

  const handleInputChange = (event) => {
    const selectedCategory = event.target.value;

    setEstado((prevEstado) => {
      // Usar el estado anterior para obtener el valor actualizado
      const nuevoEstado = { ...prevEstado, name: selectedCategory };
      // Actualizar el estado
      return nuevoEstado;
    });

    const filteredSubtypes = allProducts
      .filter((product) => product.Type.name === selectedCategory)
      .map((product) => product.Subtype.name);

    const uniqueSubtypes = [...new Set(filteredSubtypes)];
    setFilteredSubtypes(uniqueSubtypes);

    // También obtén las métricas relacionadas con la categoría seleccionada
    const filteredMetrics = allProducts
      .filter((product) => product.Type.name === selectedCategory)
      .map((product) => product.Subtype.metric);

    const uniqueMetrics = [...new Set(filteredMetrics)];
    setFilteredMetrics(uniqueMetrics);

    if (selectedCategory === "todos") {
      dispatch(reset);
    } else {
      getTypes(selectedCategory, dispatch);
    }
  };

  const handleInputSubtypes = (event) => {
    const value = event.target.value;
    const filteredMetrics = allProducts
      .filter((product) => product.Subtype.name == value)
      .map((product) => product.Subtype.metric);

    const uniqueMetrics = [...new Set(filteredMetrics)];
    setFilteredMetrics(uniqueMetrics);
    setSubtyState(value);

    setEstado((prevEstado) => {
      const nuevoEstado = { ...prevEstado, name: value };
      return nuevoEstado;
    });
    getSubTypes(value, dispatch);
  };

  const handleInputMetrics = (event, subtyState) => {
    const value = event.target.value;

    setEstado((prevEstado) => {
      const nuevoEstado = { ...prevEstado, name: value };
      return nuevoEstado;
    });

    getMetrics(subtyState, value, dispatch);
  };

  const handleOrderByPrice = async (event) => {
    const order = event.target.value;
    let ascending;

    if (order === "desc") {
      ascending = false;
    } else {
      ascending = true;
    }

    const selectedSubtype = estado.name;

    const productos = allProducts.filter(
      (product) => product.Subtype.name === selectedSubtype
    );

    if (
      selectedSubtype === "Indumentaria" ||
      selectedSubtype === "todos" ||
      selectedSubtype === "Calzado" ||
      selectedSubtype === "Equipamiento" ||
      selectedSubtype === "Suplementos" ||
      selectedSubtype === "Accesorios"
    ) {
      const filteredProducts = allProducts.filter(
        (product) =>
          product.Type.name === selectedSubtype || selectedSubtype === "todos"
      );

      const ordenar = filteredProducts.sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;

        if (ascending) {
          return priceA - priceB;
        } else {
          return priceB - priceA;
        }
      });
      orderByPrices(ordenar, dispatch);
    } else if (productos.length > 0) {
      const filteredProducts = allProducts.filter(
        (product) => product.Subtype.name === selectedSubtype
      );

      const ordenar = filteredProducts.sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;

        if (ascending) {
          return priceA - priceB;
        } else {
          return priceB - priceA;
        }
      });
      orderByPrices(ordenar, dispatch);
    }
  };

  return (
    <div className="flex space-x-4 mb-10 w-[98%] content-center">
      <div className="flex-grow w-4 h-4">
        <label className="">Categorías:</label>
        <select
          className="text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-start py-2 w-full focus:outline-none"
          defaultValue={"default"}
          name="products"
          onChange={(event) => handleInputChange(event)}
        >
          <option value="todos">Todos</option>
          {[...new Set(allProducts.map((el) => el.Type.name))].map(
            (typeName) => (
              <option key={typeName} value={typeName}>
                {typeName}
              </option>
            )
          )}
        </select>
      </div>

      <div className="flex-grow w-4 h-4">
        <label className="">Producto:</label>
        <select
          className="text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-start py-2 w-full focus:outline-none"
          defaultValue={"default"}
          name="subtypes"
          onChange={(event) => handleInputSubtypes(event)}
        >
           <option>Seleccione Subcategoria</option>
          {filteredSubtypes.map((typeName) => (
            <option key={typeName} value={typeName}>
              {typeName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-grow w-4 h-4">
        <label className="">Medida:</label>
        <select
          className="text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-start py-2 w-full focus:outline-none"
          defaultValue={"default"}
          name="metrics"
          onChange={(event) => handleInputMetrics(event, subtyState)}
        >
          <option>Seleccione Medida</option>
          {filteredMetrics.map((metric) => (
            <option key={metric} value={metric}>
              {metric}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-grow w-4 h-4">
        <label className="">Ordenar:</label>
        <select
          className="text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-start py-2 w-full focus:outline-none"
          name="price"
          onChange={(event) => handleOrderByPrice(event)}
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>
    </div>
  );
}
