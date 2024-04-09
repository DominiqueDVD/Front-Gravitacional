import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import Inicio from "./inicio.tsx";
import "../../styles/inicioSesión.css";

function InicioSesiónGoogle() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    if (isLoggedIn) {
      googleLogout();
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
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
       
    
    </div>
  );
}
export default InicioSesiónGoogle;
