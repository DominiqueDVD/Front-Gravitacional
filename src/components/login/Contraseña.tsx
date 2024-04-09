import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import InicioSesiónGoogle from "./inicioSesiónGoogle.tsx";
import "../../styles/inicioSesión.css";

function Contraseña() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleLogout = () => {
    if (isLoggedIn) {
      googleLogout();
      setIsLoggedIn(false);
    }
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleCreateNewPassword = () => {
    // Verificar que las contraseñas coincidan antes de continuar
    if (newPassword !== repeatPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
  
    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    // Verificar si la contraseña cumple con los requisitos
    if (!passwordRegex.test(newPassword)) {
      let errorMessage = "La contraseña debe cumplir los siguientes requisitos:\n";
      errorMessage += "- Al menos una mayúscula\n";
      errorMessage += "- Al menos un número\n";
      errorMessage += "- Al menos un carácter especial\n";
      errorMessage += "- Tener al menos 8 caracteres";
  
      alert(errorMessage);
      return;
    }
  
    // Lógica para crear la nueva contraseña
    console.log("Nueva contraseña:", newPassword);
    setIsLoggedIn(true);
  };
  return (
    <div className="containerInicio">
      <div className="inicio">
        <h1 className="titleInicio">Crear nueva contraseña</h1>
        <br />

        <div className="inputContainer passwordContainer">
          <label htmlFor="newPassword">Nueva contraseña</label>
          <input
            id="newPassword"
            type={showNewPassword ? "text" : "password"}
            placeholder=""
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <i
            className={`fa ${
              showNewPassword ? "fa-eye-slash" : "fa-eye"
            } password-icon`}
            onClick={handleToggleNewPasswordVisibility}
          />
        </div>

        <div className="inputContainer passwordContainer">
          <label htmlFor="repeatPassword">Repite la contraseña</label>
          <input
            id="repeatPassword"
            type={showRepeatPassword ? "text" : "password"}
            placeholder=""
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
          />
          <i
            className={`fa ${
              showRepeatPassword ? "fa-eye-slash" : "fa-eye"
            } password-icon`}
            onClick={handleToggleRepeatPasswordVisibility}
          />
        </div>
        <br />

        <button className="loginButton" onClick={handleCreateNewPassword}>
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
  );
}

export default Contraseña;
