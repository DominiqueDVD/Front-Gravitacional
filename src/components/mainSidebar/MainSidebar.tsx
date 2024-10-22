import React from 'react';
// import '../../styles/dashboard/sb-admin-3.min.css';
// import '../../styles/dashboard/dashboard.css';
import logoBlanco from '../../assets/Logo_blanco.png'
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import './mainSidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Para que funcione el offcanvas y otros componentes JS


function MainSidebar() {
    const { isLoading } = useAuth0();
    const goTo = useNavigate();

    return (
        <nav>
            <button className="btn btn-outline-dark" id="toggle-sidebar-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                <span className="navbar-toggler-icon text-black"></span>
            </button>

            <div className="offcanvas offcanvas-start bg-gradient-primary" data-bs-scroll="true" tabIndex={-1} id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Gravitacional</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <a href="#">Inicio</a>
                    <a href="#">Perfil</a>
                    <a href="#">Mis proyectos</a>
                </div>
            </div>
        </nav>
    );
}

export default MainSidebar;
