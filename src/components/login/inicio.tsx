import React, { useState } from "react";
import { useAuth } from "../../auth/AuthProvider.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { Navigate, useNavigate } from "react-router-dom";
import InicioSesiónGoogle from "./inicioSesiónGoogle.tsx";
import "../../styles/inicioSesión.css";

import { API_URL } from "../../auth/constants.ts";
import { AuthResponse, AuthResponseError } from "../../types/types.ts";

import LoginButton from "./LoginButton.js";
import SignUpButton from "./SignUpButton.js";

import { useAuth0 } from "@auth0/auth0-react"

import Loader from '../usabilidad/Loader.jsx';

function Inicio() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();
  const [errorResponse, setErrorResponse] = useState<string>('');

  const { user, isAuthenticated, isLoading } = useAuth0();

  const goTo = useNavigate();

  console.log(isAuthenticated, user?.name, user?.email);

  const handleLogout = () => {
    if (isLoggedIn) {
      googleLogout();
      setIsLoggedIn(false);
    }
  };

  const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailLoginWithEmailAndPassword = () => {

    // Lógica para iniciar sesión con email y contraseña
    setIsLoggedIn(true);
  };
  async function handleInicioSesion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // if (!email || !password) {
    //   alert("Por favor, completa todos los campos.");
    //   return;
    // }

    // // Verificar el formato del correo electrónico
    // if (!/\S+@\S+\.\S+/.test(email)) {
    //   alert("Por favor, ingresa un correo electrónico válido.");
    //   return;
    // }

    // // Validar la contraseña
    // const hasUpperCase = /[A-Z]/.test(password);
    // const hasNumber = /[0-9]/.test(password);
    // const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);

    // if (!hasUpperCase || !hasNumber || !hasSpecialChar || password.length < 8) {
    //   let errorMessage = "La contraseña debe cumplir los siguientes requisitos:\n";
    //   errorMessage += "- Al menos una mayúscula\n";
    //   errorMessage += "- Al menos un número\n";
    //   errorMessage += "- Al menos un carácter especial\n";
    //   errorMessage += "- Tener al menos 8 caracteres";

    //   alert(errorMessage);
    //   return;
    // }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);

        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
        }
      } else {
        const json = (await response.json()) as AuthResponseError;

        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);

    }
    if (auth.isAuthenticated) {
      goTo("/Dashboard");
    }
  };

  if (isAuthenticated) {
    goTo("/Dashboard");
  }
  if (isLoading) {
    return <div><Loader/></div>;
}
  return (
    <div>
      <div className="containerInicio">
        <div className="inicio">
          
          <h1 className="titleInicio">Inicia sesión con tu cuenta</h1>
          <br />
          {/* {
            !!errorResponse && <div className="errorMessage">
              {errorResponse}
            </div>
          }
          <form className="form" onSubmit={handleInicioSesion}>
            <div className="inputContainer">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="inputContainer passwordContainer">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"
                  } password-icon`}
                onClick={handleTogglePasswordVisibility}
              />
            </div>
            <br />
            <p>
              <a href="/CambiarContraseña">¿Olvidaste tu contraseña?</a>
            </p>
            <button className="loginButton" onClick={handleEmailLoginWithEmailAndPassword}>
              Acceder
            </button>
          </form>
          <br />

          <br />
          <InicioSesiónGoogle />
          <br />

          <p>
            ¿No tienes una cuenta? <a href="/CrearCuenta">Regístrate aquí</a>.
          </p> */}

          <LoginButton />
          <br/>
          <br/>
          <SignUpButton />
        </div>
      </div>



    </div>

  );
}

export default Inicio;
