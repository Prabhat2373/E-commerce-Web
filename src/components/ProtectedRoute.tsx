import React from 'react'
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children }: any) => {
    const location = useLocation();
    function getCookie() {
        var arrayb = document.cookie.split(";");
        for (const item of arrayb) {
            if (item.startsWith("jwt=")) {
                return item.substr(6);
            }
        }
    }

console.log(getCookie()?.length)
    if (getCookie()?.length === 0 || getCookie() === undefined) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children
};

export default ProtectedRoute;