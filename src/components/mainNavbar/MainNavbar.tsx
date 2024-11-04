import React from 'react';
import logoBlanco from '../../assets/isotipo_blanco2.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import './mainNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function MainNavbar() {
    const { isLoading } = useAuth0();
    const goTo = useNavigate();
    const location = useLocation(); // Obtener la ubicación actual

    return (
        <nav className="navbar bg-gradient-primary fixed-top navbar-expand-lg" id="mainNavbar">
            <div className="container-fluid">
                <a className="navbar-brand text-light" href="/">
                    <img src={logoBlanco} alt="Logo" width="30" height="auto" className="d-inline-block align-text-top" />
                    Gravitacional
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" href="/">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${location.pathname === '/analisis' ? 'active' : ''}`} href="/analisis">Análisis</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${location.pathname === '/proyectos' ? 'active' : ''}`} href="/proyectos">Proyectos</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${location.pathname === '/tutoriales' ? 'active' : ''}`} href="/tutoriales">Tutoriales</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${location.pathname === '/herramientas' ? 'active' : ''}`} href="/herramientas">Herramientas</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`} href="/blog">Blog</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${location.pathname === '/foro' ? 'active' : ''}`} href="/foro">Foro</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default MainNavbar;