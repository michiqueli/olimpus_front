import React from 'react';
import { ButtonProps } from '../interfaces';
import { useRouter } from 'next/navigation';

function GoBack(props: ButtonProps) {
    const {title} = props;
    const router = useRouter();
  return (
    <div>
        <button onClick={() => router.back()}
        className='bg-yellow-600 text-white rounded-2xl px-3 py-2 w-auto h-auto hover:scale-110'>
            {title}
        </button>
    </div>
  )
}

export default GoBack;