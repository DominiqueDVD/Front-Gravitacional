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
            <button className="btn btn-light" id="toggle-sidebar-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                <i className="fas fa-bars"></i>
            </button>

            <div className="offcanvas offcanvas-start bg-gradient-primary" data-bs-scroll="true" tabIndex={-1} id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div className="offcanvas-header" data-bs-theme="dark">
                    <img src={logoBlanco} alt="Logo" width="150" height="auto" className="d-inline-block align-text-top" />
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className='d-flex flex-column'>
                        <a href="#" className='text-light'>Inicio</a>
                        <a href="#" className='text-light'>Perfil</a>
                        <a href="#" className='text-light'>Mis proyectos</a>
                    </div>

                </div>
            </div>
        </nav>
    );
}

export default MainSidebar;
