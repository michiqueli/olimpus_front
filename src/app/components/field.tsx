import React from 'react';
import { FieldProps } from './interfaces';

function Field(props: FieldProps) {
    const {placeholder, name, onChange, value} = props;
  return (
    <div className='w-full'>
         <input
                placeholder={placeholder}
                type='text'
                name={name}
                onChange={onChange}
                value={value}
                className='text-black rounded-3xl border border-yellow-200 hover:border-yellow-300 mb-3 text-center py-2 w-full focus:outline-none'
            />
    </div>
  )
}

export default Field