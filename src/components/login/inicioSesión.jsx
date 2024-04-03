import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import "../../styles/inicioSesión.css";

function InicioSesión() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailLogin = () => {
    // Aquí puedes agregar la lógica para iniciar sesión con email y contraseña
    console.log("Iniciar sesión con email:", email, "Contraseña:", password);
    setIsLoggedIn(true);
  };

  const handleGoogleLogin = (response) => {
    console.log(response);
    // Aquí puedes realizar cualquier lógica adicional que necesites para el inicio de sesión con Google
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
            className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} password-icon`}
            onClick={handleTogglePasswordVisibility}
          />
        </div>
        <br /><br />
        <button className="loginButton" onClick={handleEmailLogin}>Acceder</button>
        <br /><br />
        <div className="botonGoogle">
          <GoogleLogin
            clientId="876703133488-3391b4edgncgv88rvpttbfdob8qc45b2.apps.googleusercontent.com"
            buttonText="Continuar con Google"
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLogin}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <br />
        <br />
        <p>¿No tienes una cuenta? <a href="#">Regístrate aquí</a>.</p>
      </div>
    </div>
  );
}

export default InicioSesión;
