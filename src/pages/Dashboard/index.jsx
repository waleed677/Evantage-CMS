import React from "react";
import Sidebar from "../../components/Sidebar";
import MainLayout from "../../components/MainLayout";
import Table from "../../components/Table";
import useFetchData from "../../hooks/useFetchData";
import Pagination from "../../components/Pagination";

const Dashboard = () => {
  const { data, loading, error, currentPage, setCurrentPage } = useFetchData();
  const itemsPerPage = 100;
  const assetsData = data?.data;

  return (
    <>
      <div className="flex h-screen bg-gray-100 justify-center">
        <div>
          <Sidebar />
        </div>
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          <MainLayout>
            <div className="mx-auto max-w-screen-xl  ml-5">
              <Table
                assetsList={assetsData?.result || []}
                assetsHeader={assetsData?.header || []}
                loading={loading}
                total
              />
              <div className="mt-6">
              <Pagination
                    totalPages={Math.ceil(data.total_count / itemsPerPage)}
                    currentPage={currentPage}
                    onPageChange={(selected) => setCurrentPage(selected)}
                  />
              </div>
            </div>
          </MainLayout>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
