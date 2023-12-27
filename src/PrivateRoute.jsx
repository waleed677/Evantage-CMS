import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {

    let auth = localStorage.getItem('authenticated');
  return (
    auth != '' ? <Outlet/> : <Navigate to= '/' />
  )
}

export default PrivateRoute