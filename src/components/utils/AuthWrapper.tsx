import React from 'react'

const AuthWrapper = ({ children }: any) => {
    let isAuthorized = true;
    if (!isAuthorized) {
        return <></>
    }
    return children
}

export default AuthWrapper