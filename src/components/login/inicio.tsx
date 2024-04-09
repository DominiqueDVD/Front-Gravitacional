import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import InicioSesiónGoogle from "./inicioSesiónGoogle.tsx";
import "../../styles/inicioSesión.css";

function Inicio() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogout = () => {
    if (isLoggedIn) {
      googleLogout();
      setIsLoggedIn(false);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailLoginWithEmailAndPassword = () => {
    // Lógica para iniciar sesión con email y contraseña
    console.log("Iniciar sesión con email:", email, "Contraseña:", password);
    setIsLoggedIn(true);
  };

  return (
   <div>
        <div className="containerInicio">
      <div className="inicio">
        <h1 className="titleInicio">Inicia sesión con tu cuenta</h1>
        <br />
   
        <div className="inputContainer">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder=""
            value={email}
            onChange={handleEmailChange}
          />
        </div>
     
        <div className="inputContainer passwordContainer">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder=""
            value={password}
            onChange={handlePasswordChange}
          />
          <i
            className={`fa ${
              showPassword ? "fa-eye-slash" : "fa-eye"
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
        <br />
        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        <br />
        <InicioSesiónGoogle/>
        <br />
        
        <p>
          ¿No tienes una cuenta? <a href="/CrearCuenta">Regístrate aquí</a>.
        </p>
      </div>
    </div>


       
   </div>
   
  );
}

export default Inicio;
