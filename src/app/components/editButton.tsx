import React from 'react';
import { ButtonProps } from './interfaces';

function EditButton(props: ButtonProps) {
    const {title} = props;
  return (
    <div>
        <button className='bg-yellow-600 text-white rounded-2xl px-3 py-2 w-auto h-auto hover:scale-110'>
            {title}
        </button>
    </div>
  )
}

export default EditButton