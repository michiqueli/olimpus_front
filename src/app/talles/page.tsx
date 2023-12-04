'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function talles() {
  const router = useRouter();
  return (
    <div className='w-12 h-12 text-black hover:bg-blue-500 '>
      <h3 className='border-spacing-3 text-gray-600'>Talles</h3>
      <button onClick={() => router.push('/ropa')} className='bg-red-500 hover:bg-blue-500'>Botón</button>
    </div>
  )
}

export default talles