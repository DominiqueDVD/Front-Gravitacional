import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import InicioSesiónGoogle from "./inicioSesiónGoogle.tsx";
import "../../styles/inicioSesión.css";

function Contraseña() {
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
        <h1 className="titleInicio">Crear nueva contraseña</h1>
        <br />
   
        <div className="inputContainer passwordContainer">
          <label htmlFor="password">Nueva contraseña</label>
          <input
            id="newPassword"
            type={showPassword ? "text" : "newPassword"}
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
     
        <div className="inputContainer passwordContainer">
          <label htmlFor="password">Repite la contraseña</label>
          <input
            id="repeatPassword"
            type={showPassword ? "text" : "repeatPassword"}
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
       
        <button className="loginButton" onClick={handleEmailLoginWithEmailAndPassword}>
          Crear nueva contraseña
        </button>
        <br />
        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
       
        <br />
        <p>
          ¿Ya tienes una cuenta? <a href="/">Inicia sesión aquí</a>.
        </p>
        <p>
          ¿No tienes una cuenta? <a href="/CrearCuenta">Regístrate aquí</a>.
        </p>
      </div>
    </div>


       
   </div>
   
  );
}

export default Contraseña;
