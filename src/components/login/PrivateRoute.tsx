import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider.tsx";

export default function PrivateRoute(){
    const auth = useAuth();
 

    return auth.isAuthenticated ? <Outlet/> : <Navigate to = "/" />;
}
