
"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { getTypes, getSubTypes, getMetrics} from "@/Redux/Actions";
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

    return (
        <div>
            <div className=''>
                <label className=''>Filter by products:</label>
                <select defaultValue={'default'} name="products" onChange={event => handleInputChange(event)}>
                    <option disabled={true} value='default'>Categorias</option>
                    <option disabled={true} value='todos'>Todos</option>
                    {[...new Set(allProducts.map(el => el.Type.name))].map(typeName => (
                        <option key={typeName} value={typeName}>{typeName}</option>
                    ))}
                </select>
            </div>

            <div className=''>
                <label className=''>Filter by subtypes:</label>
                <select defaultValue={'default'} name="subtypes" onChange={event => handleInputSubtypes(event)}>
                    <option disabled={true} value='todos'>Todos</option>
                    {filteredSubtypes.map(typeName => (
                        <option key={typeName} value={typeName}>{typeName}</option>
                    ))}
                </select>
            </div>

            <div className=''>
                <label className=''>Filter by metrics:</label>
                <select defaultValue={'default'} name="metrics" onChange={event => handleInputMetrics(event)}>
                    <option disabled={true} value='default'>Medidas</option>
                    {filteredMetrics.map(metric => (
                        <option key={metric} value={metric}>{metric}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}




