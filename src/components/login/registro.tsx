import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import InicioSesiónGoogle from "./inicioSesiónGoogle.tsx";
import "../../styles/inicioSesión.css";
import { API_URL } from "../../auth/constants.ts";
import { AuthResponseError } from "../../types/types.ts";

function Registro() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorResponse, setErrorResponse] = useState<string>('');


  const auth = useAuth();
  const goTo = useNavigate();

  if (auth.isAuthenticated){
    return   <Navigate to = "/" />
  }

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

  const handleNombreChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUserName(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleRegistro(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    if (!username || !email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }
  
    // Verificar el formato del correo electrónico
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }
  
    // Validar la contraseña
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);
  
    if (!hasUpperCase || !hasNumber || !hasSpecialChar || password.length < 8) {
      let errorMessage = "La contraseña debe cumplir los siguientes requisitos:\n";
      errorMessage += "- Al menos una mayúscula\n";
      errorMessage += "- Al menos un número\n";
      errorMessage += "- Al menos un carácter especial\n";
      errorMessage += "- Tener al menos 8 caracteres";
    
      alert(errorMessage);
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/registrarse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
  
      if(response.ok){
        console.log("User created successfully");
        setErrorResponse("");
        goTo("/")
  
      } else {
        console.log("Something went wrong");
        const json = (await response.json()) as AuthResponseError;
  
        if (typeof json.body.error === 'string') {
          setErrorResponse(json.body.error);
        } else {
          setErrorResponse('Error desconocido');
        }
      }
  
    } catch (error){
      console.log(error);
    }
    if (auth.isAuthenticated){
      return <Navigate to="/" />
    }
  };
  

  return (
    <div>
   
      <div className="containerInicio">
        <div className="inicio">
          <h1 className="titleInicio">Crea tu cuenta</h1>
          <br />
          <form className="form" onSubmit={handleRegistro}>
          <div className="inputContainer">
            {
             !!errorResponse && <div className="errorMessage">
                {errorResponse}
             </div>
            }
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              placeholder=""
              value={username}
              onChange={(e)=>setUserName(e.target.value)}
            />
          </div>

          <div className="inputContainer">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder=""
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
        
          <div className="inputContainer passwordContainer">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder=""
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <i
              className={`fa ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              } password-icon`}
              onClick={handleTogglePasswordVisibility}
            />
          </div>
          <br />
          <button className="loginButton">
            Acceder
          </button>
          </form>
          <br />
          <br />
          <InicioSesiónGoogle/>
          <br />
        
          <p>
            ¿Ya tienes una cuenta? <a href="/">Inicia sesión aquí</a>.
          </p>
        </div>
      </div>
      
    </div>
  );
}

export default Registro;
