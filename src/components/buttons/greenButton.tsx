import React from 'react';
import { AlertButtonProps } from '../interfaces';

function GreenButton(props: AlertButtonProps) {
  
  const {title, onClickfunction} = props;
  
  return (
    <div>
        <button onClick={onClickfunction} className='bg-green-600 text-white rounded-2xl px-2 py-1 w-auto h-auto hover:scale-110'>
            {title}
        </button>
    </div>
  )
}

export default GreenButton;