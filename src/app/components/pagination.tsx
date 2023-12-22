//CODIGO A INSERTAR DONDE SE UTILICE LA PAGINACION

// const [currentPage, setCurrentPage] = useState(1);

// const recordsPerPage = 10; 
// const lastIndex = currentPage * recordsPerPage;
// const firstIndex = lastIndex - recordsPerPage;
// const dataShow = displayedProducts.slice(firstIndex, lastIndex);
// <Pagination data={displayedProducts} recordsPerPage={recordsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>

'use client';

import React from 'react';
import { PaginationProps } from './interfaces';

function Pagination(props: PaginationProps) {
    const {data, recordsPerPage, currentPage, setCurrentPage} = props;
    
    const npage = Math.ceil(data.length / recordsPerPage);
    const numbers: number[] = [];
        for (let i = 1; i <= npage; i++) {
        numbers.push(i);
    }
    const prevPage = () => {
        if(currentPage !== 1) {
        setCurrentPage(currentPage - 1)
        }
    }; 

    const nextPage = () => {
        if(currentPage !== npage) {
        setCurrentPage(currentPage + 1)
        }
    };

    const changePage = (id: number) => {
        setCurrentPage(id);
      };

  return (
    
    <div className="flex items-center justify-center my-6 space-x-4">
        <button
             type="button"
            onClick={prevPage}
            // className="w-24 text-white bg-blue-600 hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            className="text-xl bg-yellow-200 hover:bg-yellow-300 text-black font-normal py-2 px-4 rounded-full"
        >
            Anteriores
        </button>
        {
            numbers.map((n, i) => (
             <div className='text-black flex items-center'>
                <button
                    key={i}
                    onClick={() => changePage(n)}
                    className={`text-red mx-2 ${currentPage === n ? 'font-bold' : ''}`}
                >
                    {n}
                </button>
            </div>
                ))
        }
        <button
            type="button"
            onClick={nextPage}
            // className="w-24 text-white bg-blue-600 hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            className="text-xl bg-yellow-200 hover:bg-yellow-300 text-black font-normal py-2 px-4 rounded-full"
        >
            Siguientes
        </button>
    </div>  
  )
}

export default Pagination;