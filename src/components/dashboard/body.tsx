import React from 'react';
import MainContent from './mainContent.tsx';
import '../../styles/dashboard/sb-admin-2.min.css'

import '../../styles/dashboard/dashboard.css'
import img1 from '../../assets/isotipo_blanco2.png'
import img2 from '../../assets/Logo_blanco.png'
function Body() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Dashboard</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        
        
      </head>
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
              <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Login Screens:</h6>
                  <a className="collapse-item" href="login.html">Login</a>
                  <a className="collapse-item" href="register.html">Register</a>
                  <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                  <div className="collapse-divider"></div>
                  <h6 className="collapse-header">Other Pages:</h6>
                  <a className="collapse-item" href="404.html">404 Page</a>
                  <a className="collapse-item" href="blank.html">Blank Page</a>
                </div>
              </div>
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
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Custom Components:</h6>
                  <a className="collapse-item" href="buttons.html">Buttons</a>
                  <a className="collapse-item" href="cards.html">Cards</a>
                </div>
              </div>
            </li>
            {/* Nav Item - Utilities Collapse Menu 
            <li className="nav-item">
              <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                <i className="fas fa-fw fa-wrench"></i>
                <span>Sesión</span>
              </a>
              <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Custom Utilities:</h6>
                  <a className="collapse-item" href="utilities-color.html">Colors</a>
                  <a className="collapse-item" href="utilities-border.html">Borders</a>
                  <a className="collapse-item" href="utilities-animation.html">Animations</a>
                  <a className="collapse-item" href="utilities-other.html">Other</a>
                </div>
              </div>
            </li>*/}
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
        {/* Logout Modal*/}
        <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
              <div className="modal-footer">
                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                <a className="btn btn-primary" href="/">Logout</a>
              </div>
            </div>
          </div>
        </div>
        {/* Bootstrap core JavaScript
        <script src="../../components/dashboard/vendor/jquery/jquery.min.js"></script>
        <script src="../../components/dashboard/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        {/* Core plugin JavaScript*
        <script src="../../components/dashboard/vendor/jquery-easing/jquery.easing.min.js"></script>
        {/* Custom scripts for all pages*
        <script src="../dashboard/scripts/sb-admin-2.min.jsx"></script>
        {/* Page level plugins 
        <script src="../../components/dashboard/vendor/chart.js/Chart.min.js"></script>
        {/* Page level custom scripts 
        <script src="../dashboard/scripts/demo/chart-area-demo.js"></script>
        <script src="../dashboard/scripts/demo/chart-pie-demo.js"></script>*/}
      </body>
    </html>
  );
}

export default Body;
