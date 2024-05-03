import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider.tsx";
import { useAuth0 } from "@auth0/auth0-react"

export default function PrivateRoute(){
    const isAuthenticated = useAuth0();
 

    return isAuthenticated ? <Outlet/> : <Navigate to = "/" />;
}
