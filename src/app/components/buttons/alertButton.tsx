import React from 'react';
import { AlertButtonProps } from '../interfaces';

function AlertButton(props: AlertButtonProps) {
  
  const {title, onClickfunction} = props;
  
  return (
    <div>
        <button onClick={onClickfunction} className='bg-red-600 text-white rounded-2xl px-3 py-2 w-auto h-auto hover:scale-110'>
            {title}
        </button>
    </div>
  )
}

export default AlertButton