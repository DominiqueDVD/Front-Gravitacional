import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import InicioSesiónGoogle from "./inicioSesiónGoogle.tsx";
import "../../styles/inicioSesión.css";

function Registro() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nombre, setNombre] = useState("");
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

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegistro = () => {
    if (!nombre || !email || !password) {
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

    if (!hasUpperCase || !hasNumber || !hasSpecialChar) {
            let errorMessage = "La contraseña debe cumplir los siguientes requisitos:\n";
            errorMessage += "- Al menos una mayúscula\n";
            errorMessage += "- Al menos un número\n";
            errorMessage += "- Al menos un carácter especial\n";
            errorMessage += "- Tener al menos 8 caracteres";
        
            alert(errorMessage);
            return;
          
    }

    // Lógica para registrar un nuevo usuario
    console.log("Nombre:", nombre);
    console.log("Email:", email);
    console.log("Contraseña:", password);

    // Simplemente establecemos isLoggedIn en true para simular que el usuario ha iniciado sesión después del registro
    setIsLoggedIn(true);
  };

  return (
    <div>
      <div className="containerInicio">
        <div className="inicio">
          <h1 className="titleInicio">Crea tu cuenta</h1>
          <br />
          <div className="inputContainer">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              placeholder=""
              value={nombre}
              onChange={handleNombreChange}
            />
          </div>

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
          <button className="loginButton" onClick={handleRegistro}>
            Acceder
          </button>
          <br />
          {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
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
