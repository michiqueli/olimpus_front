'use client';

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { ProductInterface } from '@/components/interfaces';
import createProduct from '@/components/requests/createProduct';
import getAllTypes from '@/components/requests/getAllTypes';
import getSubtypesByTypeId from '@/components/requests/getSubtypesByTypeId';
import FormButton from '@/components/buttons/fornButton';



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
    SubtypeId: 30,
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
      const subtypesData = await getSubtypesByTypeId(typeId);
      setSubtypes(subtypesData)
      console.log(subtypesData)
    } catch (error) {
      console.error('Error al obtener subtipos', error);
    }
  }
  

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
            <FormButton title='Crear Producto.'/>
        </form>
    </div>
  )
}

export default CreateProductForm;
