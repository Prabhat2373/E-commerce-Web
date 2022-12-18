import React from 'react'
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { useGetCurrentUserQuery } from '../Services/rtk/services/test';

const ProtectedRoute = ({ children }: any) => {
    // const user = useSelector((state: any) => state.user);
    let isLoggedIn = false
    const { data: user } = useGetCurrentUserQuery('')
    let location = useLocation();
    console.log("AUTH",user);
    if (user?.payload?.lenght > 0 || user?.payload?.[0]?.name !== undefined) isLoggedIn = true;
    console.log(isLoggedIn)

    if (isLoggedIn === false) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children
};

export default ProtectedRoute;