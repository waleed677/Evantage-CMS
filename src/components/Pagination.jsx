import React from 'react'
import ReactPaginate from 'react-paginate';

const Pagination = ({ totalPages, onPageChange }) => {
  return (
    <ReactPaginate
    breakLabel={<span className="mr-4">...</span>}
    pageCount={totalPages}
    pageRangeDisplayed={5}
    marginPagesDisplayed={2}
    onPageChange={(selected) => onPageChange(selected.selected + 1)}
    containerClassName="flex items-center justify-center mt-8 mb-4"
    pageClassName="block border- border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md mr-4"
    activeClassName="bg-purple-500 text-white"
    previousLabel={
        <span className='w-10 h-10 flex items-center justify-center rounded-md mr-8'>Previous</span>
    }
    nextLabel={
        <span className='w-10 h-10 flex items-center justify-center rounded-md ml-8'>Next</span>
    }
  />
  )
}

export default Pagination