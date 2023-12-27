import React from 'react'

const MainLayout = ({children} = props) => {




  return (
    <div className=" flex justify-center overflow-x-hidden overflow-y-auto bg-gray-100">
  <div className="max-w-screen-xl w-full p-6">
        {children}
  </div>
</div>

  )
}

export default MainLayout