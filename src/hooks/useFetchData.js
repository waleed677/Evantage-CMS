import { useState, useEffect } from 'react';

const useFetchData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  useEffect(() => {
    const fetchAssetData = async () => {
      try {
        const authUser = localStorage.getItem('authenticated');
        const siteCd ='MSW';
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const apiUrl = `http://evantage.ddns.net/react_web/get_assetmasterTableData.php?site_cd=${siteCd}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchAssetData();
  }, []); 

  return { data, loading, error, currentPage, setCurrentPage };
};

export default useFetchData;
