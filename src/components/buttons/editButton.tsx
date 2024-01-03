import React from 'react';
import { EditButtonProps } from '../interfaces';
import { useRouter } from 'next/navigation';

function EditButton(props: EditButtonProps) {
  const router = useRouter();
    const {title, route} = props;
  return (
    <div>
        <button onClick={() => router.push(route)}
        className='bg-yellow-600 text-white rounded-2xl px-3 py-2 w-auto h-auto hover:scale-110'>
            {title}
        </button>
    </div>
  )
}

export default EditButton