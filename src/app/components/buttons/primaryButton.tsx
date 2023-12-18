'use client';
import React from 'react';
import { PrimaryButtonProps } from '../interfaces';

function PrimaryButton(props: PrimaryButtonProps) {
    const {title, onClickfunction} = props;
  return (
    <div>
        <button onClick={onClickfunction} className='bg-blue-600 text-white rounded-2xl px-3 py-2 w-auto h-auto hover:scale-110'>
            {title}
        </button>
    </div>
  )
}

export default PrimaryButton;