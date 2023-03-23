import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: any) => {
  const location = useLocation();
  const user = useSelector((state: any) => state.user.user);

  // console.log(getCookie()?.length)
  if (!user?.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
  
export default ProtectedRoute;
