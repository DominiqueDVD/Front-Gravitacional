import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import "../../styles/inicioSesión.css";

function InicioSesión() {
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
        <br />
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
        <br />
        <button className="loginButton" onClick={handleEmailLoginWithEmailAndPassword}>
          Acceder
        </button>
        <br />
        <br />
        <div className="botonGoogle">
          <GoogleOAuthProvider clientId="876703133488-3391b4edgncgv88rvpttbfdob8qc45b2.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                setIsLoggedIn(true);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
            />
          </GoogleOAuthProvider>
          {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        </div>
        <br />
        <br />
        <p>
          ¿No tienes una cuenta? <a href="#">Regístrate aquí</a>.
        </p>
      </div>
    </div>
  );
}

export default InicioSesión;
