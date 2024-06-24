import React from 'react';
import MainContent from './mainContent.tsx';
import '../../styles/dashboard/sb-admin-3.min.css'
import { useAuth } from '../../auth/AuthProvider.tsx'
import '../../styles/dashboard/dashboard.css'
import img2 from '../../assets/Logo_blanco.png'
import img3 from '../../assets/dashboard/undraw_profile.svg'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../auth/constants.ts'
function Body() {

  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSignOut(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });

      if (response.ok) {
        auth.signOut();
        goTo("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <html lang="en">

      <body id="page-top">

        {/* Page Wrapper */}
        <div id="wrapper">
          {/* Sidebar */}

          <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            {/* Sidebar - Brand */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/Dashboard">


              <div className="sidebar-brand-text mx-0" id="fuentes">Panel de Control Administrador</div>
            </a>
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/Dashboard">
              <div className="sidebar-brand-text mx-0" id="fuentes"><h5 style={{ fontSize: "12px" }}>Planificación territorial y gestión de agua lluvia</h5></div>


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
                <span>Proyectos </span>
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
              <div style={{ display: "flex", gap: "10px" }}>
                <a className="btn btn-success btn-sm" href="/blog">Ir a blog</a>
                <a className="btn btn-success btn-sm" href="/foro">Ir a Foro</a>

              </div>
              <br />
              <a className="btn btn-success btn-sm" href="/proyectos">Ver Proyectos</a>

            </div>

            <nav className="navbar navbar-expand  topbar mb-4">

              <ul className="navbar-nav ml-auto">

                <li className="nav-item dropdown no-arrow">
                  <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="mr-2 d-none d-lg-inlinel">{auth.getUser()?.username || ""}</span>
                    <img className="img-profile rounded-circle" src={img3} />
                    <button style={{ background: "#e57878", color: "white", borderRadius: "5px" }} onClick={handleSignOut}>Cerrar Sesión</button>
                  </a>
                </li>
              </ul>
            </nav>
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
