'use client';
import React from 'react';
import { PrimaryButtonProps } from '../interfaces';

function PrimaryButton(props: PrimaryButtonProps) {
    const {title, onClickfunction} = props;
  return (
    <div>
        <button className='text-xl bg-yellow-200 hover:bg-yellow-300 text-black font-normal py-2 px-4 rounded-full'>
            {title}
        </button>
    </div>
  )
}

export default PrimaryButton;