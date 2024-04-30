import React from 'react';
import MainContent from './mainContent.tsx';
import '../../styles/dashboard/sb-admin-2.min.css'

import '../../styles/dashboard/dashboard.css'
import img2 from '../../assets/Logo_blanco.png'
function Body() {
  return (
    <html lang="en">
     
      <body id="page-top">

        {/* Page Wrapper */}
        <div id="wrapper">
          {/* Sidebar */}
          <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            {/* Sidebar - Brand */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/Dashboard">
             
              <div className="sidebar-brand-text mx-0" id="fuentes">Panel de Control </div>
            </a>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Dashboard */}
            <li className="nav-item active">
              <a className="nav-link" href="/Dashboard">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </a>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
          
        
            {/* Heading */}
            <div className="sidebar-heading">Proyectos</div>
            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                <i className="fas fa-fw fa-folder"></i>
                <span>Mis Proyectos </span>
              </a>
              
            </li>

              {/* Divider */}
              <hr className="sidebar-divider" />
          {/* Nav Item - Pages Collapse Menu */}
            {/* Heading */}
            <div className="sidebar-heading">Herramientas</div>
          <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                <i className="fas fa-fw fa-cog"></i>
                <span>Configuración</span>
              </a>
            
            </li>
            
            {/* Divider */}
            <hr className="sidebar-divider d-none d-md-block" />
            {/* Sidebar Toggler (Sidebar) */}
            <div className="text-center d-none d-md-inline">
              <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>
            {/* Sidebar Message */}
            <div className="sidebar-card d-none d-lg-flex">
              <img className="logoPanel2" src={img2} alt="..." />
              <br />
              <p className="text-center mb-2" >PLANIFICACIÓN TERRITORIAL Y GESTION DE AGUA LLUVIA ES UNA PLATAFORMA QUE TE PERMITE.......Y MUCHO MÁS!</p>
              <a className="btn btn-success btn-sm" href="/tutoriales">Ver tutoriales</a>
            </div>
          </ul>
          {/* End of Sidebar */}
          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
            <MainContent></MainContent>
            {/* Footer */}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Gravitacional Spa 2024</span>
                </div>
              </div>
            </footer>
            {/* End of Footer */}
          </div>
          {/* End of Content Wrapper */}
        </div>
        {/* End of Page Wrapper */}
        {/* Scroll to Top Button*/}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
        
      </body>
    </html>
  );
}

export default Body;
