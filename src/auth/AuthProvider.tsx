import React from "react";
import { useContext, createContext, useState, useEffect } from "react";

interface AuthProviderProps{
    children: React.ReactNode;
}
//dejo los estados con true para poder visualizar las demás rutas
const AuthContext = createContext(
{
    isAuthenticated: true,
}
)
export function AuthProvider ({children}: AuthProviderProps){
    const [isAuthenticated, setIsAuhenticated] = useState (true);
    return (
        <AuthContext.Provider value = {{isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );

}
export const useAuth = () => useContext(AuthContext);