'use client';

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { ProductInterface } from '@/components/interfaces';
import createProduct from '@/components/requests/createProduct';
import getAllTypes from '@/components/requests/getAllTypes';
import getSubtypesByTypeId from '@/components/requests/getSubtypesByTypeId';
import getMetrics from '@/components/requests/getMetrics';
import FormButton from '@/components/buttons/fornButton';

interface Subtype {
  id: number,
  name: string,
  metric: string,
  TypeId: number
}



function CreateProductForm() {
  const router = useRouter();
  const [product, setProduct] = useState<ProductInterface>({
    name: '',
    price: 0,
    stock: 0,
    description: '',
    image: '',
    discount: 0,
    isActive: true,
    TypeId: 0,
    SubtypeId: 0,
  })
  // TYPES
  const [types, setTypes] = useState<any[]>([]);
  const [subtypes, setSubtypes] = useState<any[]>([]);
  const [metric, setMetrics] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const typesData = await getAllTypes();
        setTypes(typesData)
      } catch (error) {
        console.error('Error al obtener tipos de productos', error);
      }
    }
    fetchTypes();
  }, []);

  const handleTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const typeId = parseInt(e.target.value, 10);
    setProduct({ ...product, TypeId: typeId });

    try {
      const response = await getSubtypesByTypeId(typeId);
      const uniqueNamesSet = new Set<string>();
      const uniqueSubtypes = response.filter((subtype: Subtype) => {
        if (!uniqueNamesSet.has(subtype.name)) {
          uniqueNamesSet.add(subtype.name);
          return true;
        }
        return false;
      });

      setSubtypes(uniqueSubtypes);
    } catch (error) {
      console.error('Error al obtener subtipos', error);
    }
  }

  const handleSubTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subtypeName = e.target.value
    try {
      const response = await getMetrics(subtypeName);
      setMetrics(response)
    } catch (error) {
      console.error('Error al obtener subtipos', error);
    }
  }

  const handleMetricChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const metricId = e.target.value
    setProduct({ ...product, SubtypeId: Number(metricId) });

  }

  console.log(product)

  // RESTO DEL FORM
  const onChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    console.log('Producto actualizado:', { ...product, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct(product);
      alert(`Producto cargado exitosamente: "${product.name}"`)
      router.push('/')
    } catch (error) {
      console.error('Error al crear el producto', error);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center my-4'>
      <form onSubmit={handleSubmit} className='flex flex-col items-center h-full w-3/12'>
        <input
          placeholder='Nombre/s'
          type='text'
          name='name'
          onChange={onChange}
          value={product.name}
          className='text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-start py-2 w-full focus:outline-none'
        />
        <input
          placeholder='Precio'
          type='number'
          name='price'
          onChange={onChange}
          value={product.price}
          className='text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-start py-2 w-full focus:outline-none'
        />
        <input
          placeholder='Stock'
          name='stock'
          type='number'
          onChange={onChange}
          value={product.stock}
          className='text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-start py-2 w-full focus:outline-none'
        />
        <textarea
          placeholder='Descripción'
          name='description'
          onChange={onChange}
          value={product.description}
          className='text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-start py-2 w-full focus:outline-none'
        />
        <input
          placeholder='Imagen'
          type='text'
          name='image'
          onChange={onChange}
          value={product.image}
          className='text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-start py-2 w-full focus:outline-none'
        />
        <select value={product.TypeId} onChange={handleTypeChange} className='text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-start py-2 w-full focus:outline-none'>
          <option value={0} disabled>Selecciona el tipo de producto</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
        <select onChange={handleSubTypeChange} className='text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-start py-2 w-full focus:outline-none'>
          <option value={0} disabled>Selecciona el Sub-tipo de producto</option>
          {subtypes.map((subtype) => (
            <option key={subtype.id} value={subtype.name}>{subtype.name}</option>
          ))}
        </select>
        <select value={product.SubtypeId} onChange={handleMetricChange} className='text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-start py-2 w-full focus:outline-none'>
          <option value={0} disabled>Selecciona la Medida del Producto</option>
          {metric.map((metric) => (
            <option key={metric.id} value={metric.id}>{metric.metric}</option>
          ))}
        </select>
        <FormButton title='Crear Producto.' />
      </form>
    </div>
  )
}

export default CreateProductForm;
