import React from 'react'
import AdminAccess from '../hooks/Admin_acess'
import { Navigate } from 'react-router-dom'

export default function AdminRoutes({children}) {
  const isAdmin = AdminAccess();
console.log("Admin access:", isAdmin);

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace={true} />; // Redirect to dashboard if not admin, replace true to prevent going back to admin page after logout
  }

  return (

      children
  )
}
