import React from 'react';
import { ButtonProps } from '../interfaces';
import { useRouter } from 'next/navigation';

function GoBack(props: ButtonProps) {
    const {title} = props;
    const router = useRouter();
  return (
    <div>
        <button onClick={() => router.back()}
        className='text-xl bg-yellow-200 hover:bg-yellow-300 text-black font-normal py-2 px-4 rounded-full'>
            {title}
        </button>
    </div>
  )
}

export default GoBack;