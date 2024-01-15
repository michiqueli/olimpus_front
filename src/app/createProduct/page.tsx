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
  // TYPES SUBTYPES METRICS
  const [types, setTypes] = useState<any[]>([]);
  const [subtypes, setSubtypes] = useState<any[]>([]);
  const [metric, setMetrics] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<number>(0);
  const [selectedSubtype, setSelectedSubtype] = useState<string>(''); 
  const [isSubtypeSelected, setIsSubtypeSelected] = useState<boolean>(false);
  const [selectedMetric, setSelectedMetric] = useState<number>(0);
  
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
    setSelectedType(typeId);
    setSelectedSubtype('');
    setIsSubtypeSelected(false);
    setSelectedMetric(0);
  }

  const handleSubTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subtypeName = e.target.value
    setSelectedSubtype(subtypeName);
    setIsSubtypeSelected(true);
    setSelectedMetric(0)
    try {
      const response = await getMetrics(subtypeName);
      setMetrics(response)
    } catch (error) {
      console.error('Error al obtener subtipos', error);
    }
  }

  const handleMetricChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const metricId = e.target.value
    setSelectedMetric(Number(metricId))
    setProduct({ ...product, SubtypeId: Number(metricId) });
  }

  console.log(product);

  // IMAGE
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file){
      setImageFile(file);
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
      console.log(imageFile);
      if(imageFile){
        const formData = new FormData();
        formData.append('file', imageFile);
        console.log(formData);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        if (response.ok){
          const imageData = await response.json();
          setProduct({ ...product, image: imageData.url });
        } else {
          console.error('Error al subir la imagen');
          return;
        }
      }
      await createProduct(product);
      alert(`Producto cargado exitosamente: "${product.name}"`)
      router.push('/')
    } catch (error) {
      console.error('Error al crear el producto', error);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center my-4'>
      <div className='flex flex-col items-center h-full w-3/12 bg-gray-100 mx-2 border border-gray-300 rounded-lg shadow'>
        <form onSubmit={handleSubmit} className='flex flex-col items-center h-full w-10/12 mb-6'>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white'>Nuevo producto</h1>
          </div>
          <div className='flex-col justify-start w-full'>
            <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Nombre:</label>
            <input
              placeholder='Nombre/s'
              type='text'
              name='name'
              onChange={onChange}
              value={product.name}
              className='text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-start py-2 w-full focus:outline-none'
            />
          </div>
          <div className='flex-col justify-start w-full'>
            <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Precio:</label>
            <input
              placeholder='Precio'
              type='number'
              name='price'
              onChange={onChange}
              value={product.price}
              className='text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-start py-2 w-full focus:outline-none'
            />
          </div>
          <div className='flex-col justify-start w-full'>
            <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Stock:</label>
            <input
              placeholder='Stock'
              name='stock'
              type='number'
              onChange={onChange}
              value={product.stock}
              className='text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-start py-2 w-full focus:outline-none'
            />
          </div>
          <div className='flex-col justify-start w-full'>
            <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Descripción:</label>
            <textarea
              placeholder='Descripción'
              name='description'
              onChange={onChange}
              value={product.description}
              className='text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-start py-2 w-full focus:outline-none'
            />
          </div>
          <div className='flex-col justify-start w-full'>
            <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Imagen:</label>
            <input
              type='file'
              name='file'
              accept='image/*'
              onChange={handleImageChange}
              className='text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-start py-2 w-full focus:outline-none'
            />
          </div>
          <div className='flex-col justify-start w-full'>
            <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Tipo de producto:</label>
            <select value={product.TypeId} onChange={handleTypeChange} className='text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-start py-2 w-full focus:outline-none'>
              <option value={0} disabled>Selecciona el tipo de producto</option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          {selectedType !== 0 &&(
            <div className='flex-col justify-start w-full'>
              <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Subtipo de producto:</label>
                <select value={selectedSubtype} onChange={handleSubTypeChange} className='text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-start py-2 w-full focus:outline-none'>
                  <option value='' disabled>Selecciona el Sub-tipo de producto</option>
                  {subtypes.map((subtype) => (
                    <option key={subtype.id} value={subtype.name}>{subtype.name}</option>
                  ))}
                </select>      
              </div>
          )}
          {isSubtypeSelected && selectedSubtype !== '' &&(
            <div className='flex-col justify-start w-full'>
              <label className="block mb-2 ml-2 text-sm font-medium dark:text-white">Medida del producto:</label>
                <select value={selectedMetric} onChange={handleMetricChange} className='text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-start py-2 w-full focus:outline-none'>
                  <option value={0} disabled>Selecciona la Medida del Producto</option>
                  {metric.map((metric) => (
                    <option key={metric.id} value={metric.id}>{metric.metric}</option>
                  ))}
                </select>     
            </div>
          )}
          <FormButton title='Crear Producto' />
        </form>
      </div>
    </div>
  )
}

export default CreateProductForm;
