import React, { useEffect, useState } from 'react'
import '../../styles/dashboard/sb-admin-2.min.css'

import '../../styles/dashboard/dashboard.css'
import img2 from '../../assets/dashboard/undraw_posting_photo.svg'
import img3 from '../../assets/dashboard/undraw_profile.svg'
import img4 from '../../assets/dashboard/undraw_profile_1.svg'
import img5 from '../../assets/dashboard/undraw_profile_2.svg'
import img6 from '../../assets/dashboard/undraw_profile_3.svg'
import img7 from '../../assets/dashboard/iso-2.png'
import { useAuth } from '../../auth/AuthProvider.tsx'
import { API_URL } from '../../auth/constants.ts'


 function MainContent(){
    const auth = useAuth();
    async function handleSignOut(e: React.MouseEvent<HTMLAnchorElement>){
        e.preventDefault();

        try{
            const response = await fetch(`${API_URL}/signout`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getRefreshToken()}`,
                },
            });

            if(response.ok){
                auth.signOut();
            }
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div>
    {/*<!-- Main Content -->*/}
        <div id="content">

           {/* {/*<!-- Topbar -->*/}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

           {/*<!-- Sidebar Toggle (Topbar) -->*/}    
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>

              
              <h1 className="h3 mb-1 text-gray-800" id='tituloPrincipal'>PLANIFICACIÓN TERRITORIAL Y GESTION DE AGUA LLUVIA </h1>
             {/* {/*<!-- Topbar Navbar -->*/}  
                <ul className="navbar-nav ml-auto">

               {/*<!-- Nav Item - Search Dropdown (Visible Only XS) -->*/}      
                    <li className="nav-item dropdown no-arrow d-sm-none">
                        <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-search fa-fw"></i>
                        </a>
                 {/* */}       {/*<!-- Dropdown - Messages -->*/}
                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                            aria-labelledby="searchDropdown">
                            <form className="form-inline mr-auto w-100 navbar-search">
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light border-0 small"
                                        placeholder="Search for..." aria-label="Search"
                                        aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>

                    {/*<!-- Nav Item - Alerts -->*/}
                    <li className="nav-item dropdown no-arrow mx-1">
                        <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-bell fa-fw"></i>
                            {/*<!-- Counter - Alerts -->*/}
                            <span className="badge badge-danger badge-counter">3+</span>
                        </a>
                        {/*<!-- Dropdown - Alerts -->*/}
                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="alertsDropdown">
                            <h6 className="dropdown-header">
                                Alerts Center
                            </h6>
                            <a className="dropdown-item d-flex align-items-center" href="#">
                                <div className="mr-3">
                                    <div className="icon-circle bg-primary">
                                        <i className="fas fa-file-alt text-white"></i>
                                    </div>
                                </div>
                                <div>
                                    <div className="small text-gray-500">December 12, 2019</div>
                                    <span className="font-weight-bold">A new monthly report is ready to download!</span>
                                </div>
                            </a>
                            <a className="dropdown-item d-flex align-items-center" href="#">
                                <div className="mr-3">
                                    <div className="icon-circle bg-success">
                                        <i className="fas fa-donate text-white"></i>
                                    </div>
                                </div>
                                <div>
                                    <div className="small text-gray-500">December 7, 2019</div>
                                    $290.29 has been deposited into your account!
                                </div>
                            </a>
                            <a className="dropdown-item d-flex align-items-center" href="#">
                                <div className="mr-3">
                                    <div className="icon-circle bg-warning">
                                        <i className="fas fa-exclamation-triangle text-white"></i>
                                    </div>
                                </div>
                                <div>
                                    <div className="small text-gray-500">December 2, 2019</div>
                                    Spending Alert: We've noticed unusually high spending for your account.
                                </div>
                            </a>
                            <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                        </div>
                    </li>

                    {/*<!-- Nav Item - Messages -->*/}
                    <li className="nav-item dropdown no-arrow mx-1">
                        <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-envelope fa-fw"></i>
                            {/*<!-- Counter - Messages -->*/}
                            <span className="badge badge-danger badge-counter">7</span>
                        </a>
                        {/*<!-- Dropdown - Messages -->*/}
                        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="messagesDropdown">
                            <h6 className="dropdown-header">
                                Message Center
                            </h6>
                            <a className="dropdown-item d-flex align-items-center" href="#">
                                <div className="dropdown-list-image mr-3">
                                    <img className="rounded-circle" src={img4}
                                        alt="..." />
                                    <div className="status-indicator bg-success"></div>
                                </div>
                                <div className="font-weight-bold">
                                    <div className="text-truncate">Hi there! I am wondering if you can help me with a
                                        problem I've been having.</div>
                                    <div className="small text-gray-500">Emily Fowler · 58m</div>
                                </div>
                            </a>
                            <a className="dropdown-item d-flex align-items-center" href="#">
                                <div className="dropdown-list-image mr-3">
                                    <img className="rounded-circle" src={img5}
                                        alt="..."/>
                                    <div className="status-indicator"></div>
                                </div>
                                <div>
                                    <div className="text-truncate">I have the photos that you ordered last month, how
                                        would you like them sent to you?</div>
                                    <div className="small text-gray-500">Jae Chun · 1d</div>
                                </div>
                            </a>
                            <a className="dropdown-item d-flex align-items-center" href="#">
                                <div className="dropdown-list-image mr-3">
                                    <img className="rounded-circle" src={img6}
                                        alt="..."/>
                                    <div className="status-indicator bg-warning"></div>
                                </div>
                                <div>
                                    <div className="text-truncate">Last month's report looks great, I am very happy with
                                        the progress so far, keep up the good work!</div>
                                    <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                </div>
                            </a>
                            <a className="dropdown-item d-flex align-items-center" href="#">
                                <div className="dropdown-list-image mr-3">
                                    <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                                        alt="..."/>
                                    <div className="status-indicator bg-success"></div>
                                </div>
                                <div>
                                    <div className="text-truncate">Am I a good boy? The reason I ask is because someone
                                        told me that people say this to all dogs, even if they aren't good...</div>
                                    <div className="small text-gray-500">Chicken the Dog · 2w</div>
                                </div>
                            </a>
                            <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                        </div>
                    </li>

                    <div className="topbar-divider d-none d-sm-block"></div>

                    {/*<!-- Nav Item - User Information -->*/}
                    <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{auth.getUser()?.username || ""}</span>
                            <img className="img-profile rounded-circle"
                                src={img3} />
                            <button onClick={handleSignOut}>Cerrar Sesión</button>
                        </a>
                        {/*<!-- Dropdown - User Information -->*/}
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown">
                            <a className="dropdown-item" href="#">
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                Profile
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                Settings
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                Activity Log
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Logout
                            </a>
                        </div>
                    </li>

                </ul>

            </nav>
            {/*<!-- End of Topbar -->*/}

            {/*<!-- Begin Page Content -->*/}
            <div className="container-fluid">

                {/*<!-- Page Heading -->*/}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <div>

                </div>
                    <div className='buttonspanel'>
                    <a href="/poligono" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                            className="fas fa-plus fa-sm text-white-50"></i> Nuevo proyecto </a>
                    <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                            className="fas fa-download fa-sm text-white-50"></i> Generar reporte</a>
                    </div>
               
                </div>

                {/*<!-- Content Row -->*/}
                <div className="row">

                    {/*<!-- Earnings (Monthly) Card Example -->*/}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-m font-weight-bold text-uppercase mb-1">
                                        Proyecto Terreno 1</div>
                                        <button>Ver Proyecto</button>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*<!-- Earnings (Monthly) Card Example -->*/}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-m font-weight-bold text-uppercase mb-1">
                                        Proyecto Terreno 2</div>
                                        <button>Ver Proyecto</button>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-m font-weight-bold text-uppercase mb-1">
                                        Proyecto Terreno 3</div>
                                        <button>Ver Proyecto</button>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-m font-weight-bold text-uppercase mb-1">
                                        Proyecto Terreno 4</div>
                                        <button>Ver Proyecto</button>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                 
                </div>

                {/*<!-- Content Row -->*/}

                <div className="row">

                    {/*<!-- Area Chart -->*/}
                    <div className="col-xl-8 col-lg-7">
                        <div className="card shadow mb-4">
                            {/*<!-- Card Header - Dropdown -->*/}
                            <div
                                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold ">Lorem Ipsum</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                        aria-labelledby="dropdownMenuLink">
                                        <div className="dropdown-header">Dropdown Header:</div>
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div>
                            </div>
                            {/*<!-- Card Body -->*/}
                            <div className="card-body">
                                <div className="chart-area">
                                    <canvas id="myAreaChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*<!-- Pie Chart -->*/}
                    <div className="col-xl-4 col-lg-5">
                        <div className="card shadow mb-4">
                            {/*<!-- Card Header - Dropdown -->*/}
                            <div
                                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold ">Lorem Ipsum</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                        aria-labelledby="dropdownMenuLink">
                                        <div className="dropdown-header">Dropdown Header:</div>
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div>
                            </div>
                            {/*<!-- Card Body -->*/}
                            <div className="card-body">
                                <div className="chart-pie pt-4 pb-2">
                                    <canvas id="myPieChart"></canvas>
                                </div>
                                <div className="mt-4 text-center small">
                                    <span className="mr-2">
                                 
                                    </span>
                                    <span className="mr-2">
                                        
                                    </span>
                                    <span className="mr-2">
                                        
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*<!-- Content Row -->*/}
                <div className="row">

                    {/*<!-- Content Column -->*/}
                    <div className="col-lg-6 mb-4">

                        {/*<!-- Project Card Example -->*/}
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold ">Proyectos</h6>
                            </div>
                            <div className="card-body">
                                <h4 className="small font-weight-bold">Proyecto Terreno 1<span
                                        className="float-right">20%</span></h4>
                                <div className="progress mb-4">
                                    <div className="progress-bar bg-danger" role="progressbar" style={{width: "20%"}}
                                        aria-valuenow={20}
                                        aria-valuemin={0} 
                                        aria-valuemax={100}></div>
                                </div>
                                <h4 className="small font-weight-bold">Proyecto Terreno 1.2<span
                                        className="float-right">20%</span></h4>
                                <div className="progress mb-4">
                                    <div className="progress-bar bg-danger" role="progressbar" style={{width: "20%"}}
                                        aria-valuenow={20}
                                        aria-valuemin={0} 
                                        aria-valuemax={100}></div>
                                </div>
                                <h4 className="small font-weight-bold">Proyecto Terreno 1.5<span
                                        className="float-right">20%</span></h4>
                                <div className="progress mb-4">
                                    <div className="progress-bar bg-danger" role="progressbar" style={{width: "20%"}}
                                        aria-valuenow={20}
                                        aria-valuemin={0} 
                                        aria-valuemax={100}></div>
                                </div>
                                <h4 className="small font-weight-bold">Proyecto Terreno 2 <span
                                        className="float-right">40%</span></h4>
                                <div className="progress mb-4">
                                    <div className="progress-bar bg-warning" role="progressbar" style={{width: "40%"}}
                                        aria-valuenow={30} 
                                        aria-valuemin={0} 
                                        aria-valuemax={100}></div>
                                </div>
                                <h4 className="small font-weight-bold">Proyecto Terreno 3<span
                                        className="float-right">60%</span></h4>
                                <div className="progress mb-4">
                                    <div className="progress-bar" role="progressbar" style={{width: "60%"}}
                                        aria-valuenow={60} 
                                        aria-valuemin={0} 
                                        aria-valuemax={100}></div>
                                </div>
                                <h4 className="small font-weight-bold">Proyecto Terreno 4 <span
                                        className="float-right">80%</span></h4>
                                <div className="progress mb-4">
                                    <div className="progress-bar bg-info" role="progressbar" style={{width: "80%"}}
                                        aria-valuenow={80}
                                        aria-valuemin={0} 
                                        aria-valuemax={100}></div>
                                </div>
                                <h4 className="small font-weight-bold">Proyecto Terreno 5 <span
                                        className="float-right">Completo!</span></h4>
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" style={{width: "100%"}}
                                       aria-valuenow={100} 
                                       aria-valuemin={0} 
                                       aria-valuemax={100}></div>
                                </div>
                                
                            </div>
                        </div>

                        {/*<!-- Color System 
                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <div className="card bg-primary text-white shadow">
                                    <div className="card-body">
                                        Primary
                                        <div className="text-white-50 small">#4e73df</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="card bg-success text-white shadow">
                                    <div className="card-body">
                                        Success
                                        <div className="text-white-50 small">#1cc88a</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="card bg-info text-white shadow">
                                    <div className="card-body">
                                        Info
                                        <div className="text-white-50 small">#36b9cc</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="card bg-warning text-white shadow">
                                    <div className="card-body">
                                        Warning
                                        <div className="text-white-50 small">#f6c23e</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="card bg-danger text-white shadow">
                                    <div className="card-body">
                                        Danger
                                        <div className="text-white-50 small">#e74a3b</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="card bg-secondary text-white shadow">
                                    <div className="card-body">
                                        Secondary
                                        <div className="text-white-50 small">#858796</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="card bg-light text-black shadow">
                                    <div className="card-body">
                                        Light
                                        <div className="text-black-50 small">#f8f9fc</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="card bg-dark text-white shadow">
                                    <div className="card-body">
                                        Dark
                                        <div className="text-white-50 small">#5a5c69</div>
                                    </div>
                                </div>
                            </div>
                        </div>-->*/}

                    </div>

                    <div className="col-lg-6 mb-4">
                            {/*<!-- Approach -->*/}
                            <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold ">Información</h6>
                            </div>
                            <div className="card-body" style={{display: "flex"}}>
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "50%", objectFit: "contain"}}
                                        src={img7} alt="..." />
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                             
                            </div>
                        </div>

                        {/*<!-- Illustrations -->*/}
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold ">Contacto</h6>
                            </div>
                            <div className="card-body">
                                <div className="text-center">
                                    
                                </div>
                                Si necesitas más información sobre nuestros servicios puedes escribirnos al correo <a  target="_blank" rel="nofollow" href="mailto:contacto@gravitacional.cl">contacto@gravitacional.cl</a> o visita nuestra página web  <a  target="_blank" rel="nofollow" href="https://gravitacional.cl/">gravitacional.cl</a>
                            </div>
                        </div>

                    

                    </div>
                </div>

            </div>
            {/*<!-- /.container-fluid -->*/}

        </div>
        {/*<!-- End of Main Content -->*/}
        </div>
    );
  }


export default MainContent