'use client';

import React, { useState } from 'react'
import PrimaryButton from './buttons/primaryButton';
import Field from './field';

function CreateProductForm() {
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        brand: '',
        category: '',
        description: '',

    })

    const onChange = (e: React.FormEvent) => {
        const property = (e.target as HTMLInputElement).name;
        const value = (e.target as HTMLInputElement).value;
    
        setProduct({ ...product, [property]: value });
      };
    
    const handleSubmit = () => {
        //REQUEST CREACION PRODUCTO
    }
  return (
    <div className='flex flex-col justify-center items-center my-4'>
        <form onSubmit={handleSubmit} className='flex flex-col items-center h-full w-3/12'>
            <Field
            placeholder='Nombre/s'
            name='name'
            onChange={onChange}
            value={product.name}
            />
            <Field
            placeholder='Precio'
            name='price'
            onChange={onChange}
            value={product.price}
            />
            <Field
            placeholder='Marca'
            name='brandp'
            onChange={onChange}
            value={product.brand}
            />
            <Field
             placeholder='Categoría'
             name='category'
             onChange={onChange}
             value={product.category}
            />
            <textarea
                placeholder='Descripción'
                name='description'
                onChange={onChange}
                value={product.description}
                className='text-black rounded-3xl border border-cyan-400 mb-3 text-center py-2 w-full'
            />
            <PrimaryButton title='Crear producto'/>
        </form>
    </div>
  )
}

export default CreateProductForm;