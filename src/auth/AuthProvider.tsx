import React, { useContext, createContext, useState, useEffect } from "react";
import type { AuthResponse, AccessTokenResponse, User } from "../types/types";
import { API_URL } from "../auth/constants.ts";

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => {},
    saveUser: (userData: AuthResponse) => {},
    getRefreshToken: () => {},
    getUser: () => ({} as User | undefined),
    signOut: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuhenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string>("");
    const [user, setUser] = useState<User>();

    useEffect(() => {
        checkAuth();
    }, []);

    async function requestNewAccessToken(refresToken: string) {
        try {
            const response = await fetch(`${API_URL}/refresh-token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${refresToken}`,
                },
            });

            if (response.ok) {
                const json = await response.json() as AccessTokenResponse;
                if (json.error) {
                    throw new Error(json.error);
                }
                return json.body.accessToken;
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async function getUserInfo(accessToken: string) {
        try {
            const response = await fetch(`${API_URL}/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const json = await response.json();
                if (json.error) {
                    throw new Error(json.error);
                }
                return json.body;
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async function checkAuth() {
        if (accessToken) {
            // Aquí puedes agregar lógica adicional si es necesario
        } else {
            const token = getRefreshToken();
            if (token) {
                const newAccessToken = await requestNewAccessToken(token);
                if (newAccessToken) {
                    const userInfo = await getUserInfo(newAccessToken);
                    if (userInfo) {
                        saveSessionInfo(userInfo, newAccessToken, token);
                    }
                }
            }
        }
    }

    function signOut(){
        setIsAuhenticated(false);
        setAccessToken("");
        setUser(undefined);
        localStorage.removeItem("token");
    }


    function saveSessionInfo(userInfo: User, accessToken: string, refreshToken: string) {
        setAccessToken(accessToken);
        localStorage.setItem("token", refreshToken);
        setIsAuhenticated(true);
        setUser(userInfo);
    }

    function getAccessToken() {
        return accessToken;
    }

    function getRefreshToken(): string | null {
        const tokenData = localStorage.getItem("token");
        if (tokenData) {
            try {
                const token = JSON.parse(tokenData);
                return token;
            } catch (error) {
                console.error("Error parsing token data:", error);
                localStorage.removeItem("token");
                return null;
            }
        }
        return null;
    }

    function saveUser(userData: AuthResponse) {
        saveSessionInfo(
            userData.body.user,
            userData.body.accessToken,
            userData.body.refreshToken,
        );
    }
     function getUser(){
        return user;
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken, getUser, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
