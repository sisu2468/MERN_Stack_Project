import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export const ProtectLogin = () => {

    const auth = localStorage.getItem("loggedin")
    return auth ? <Navigate to={"/profile"}/> : <Outlet/>

}
