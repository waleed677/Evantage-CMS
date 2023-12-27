import React, {useState, useEffect} from 'react'
import Pagination from './Pagination';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import TableCell from './TableCell';


const Table = ({assetsList, assetsHeader,  loading}) => {
    const itemsPerPage = 100;
    const [currentPage, setCurrentPage] = useState(1);
    const [displayedData, setDisplayedData] = useState([]);

//   useEffect(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const currentData = assets.slice(startIndex, endIndex);
//     setDisplayedData(currentData);
//   }, [assets, currentPage]);

//   const totalPages = Math.ceil(assets.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <p className='block mx-auto text-2xl text-center'>Loading...</p>;
  }

 

  return (
    <>

    <table className="border border-separate rounded-lg  border-slate-400  mx-auto mt-8 ">
    <thead>
    
      <tr className="p-5">
      {assetsHeader.slice(0,12).map((header, index) => (
      <th key={index} className="border border-slate-300 p-2">
        {header?.Header}
      </th> 
    ))}
      </tr>
    </thead>
    <tbody>
   
       {assetsList.map((asset, index) => (
        <tr key={index}>
           {[...Array(12).keys()].map((i) => (
            <TableCell key={i} value={asset[`col${i + 1}`]}/>
           ))}
        
        </tr>
      ))} 
    </tbody>
  </table>

  {/* <div className="mt-6">
    <Pagination totalPages={totalPages} onPageChange={handlePageChange}/>
  </div> */}
  </>
  )
}

export default Table