import React from 'react'
import { isAuthenticated } from '../utils/isAuthenticated'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoutes({children}) {
    if(!isAuthenticated()){
        return <Navigate to="/login" replace={true} /> //redirect to login page if not authenticated, replace true to prevent going back to protected page after login
    }
    return children;

}
