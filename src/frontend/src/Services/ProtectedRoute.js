import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export const ProtectedRoute = () => {
    const auth = localStorage.getItem("loggedin")
    return auth ? <Outlet /> : <Navigate to={"/login"} />

}
