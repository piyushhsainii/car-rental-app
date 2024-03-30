"use client"
import React, { useState } from 'react'
import ReactPaginate from 'react-paginate';
import CarCard from './CarCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PaginatedItems = ({ itemsPerPage , data }:{ itemsPerPage:any , data:any}) => {
        const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    function Items({ currentItems }:{currentItems:any}) {
    return (
        <>
        {currentItems &&
            currentItems.map((item:any) => (
                <CarCard {...item} />
            ))}
        </>
    );
}
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event:any) => {
      const newOffset = (event.selected * itemsPerPage) % data.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

  return (
    < >
    <Items currentItems={currentItems} />
    <div className='flex'>
    <ReactPaginate
     className='font-semibold flex gap-5  '
     breakLabel="..."
     nextLabel={<ArrowRight width={17}/>}
     onPageChange={handlePageClick}
     pageRangeDisplayed={5}
     pageCount={pageCount}
     previousLabel={<ArrowLeft width={17}/>}
     renderOnZeroPageCount={null}
     />
    </div>
    </>
  )
}

export default PaginatedItems