import React, { useEffect, useState } from 'react'
import '../../styles/dashboard/sb-admin-2.min.css'

import '../../styles/dashboard/dashboard.css'
import img3 from '../../assets/dashboard/undraw_profile.svg'
import img7 from '../../assets/dashboard/iso-2.png'
import { useAuth } from '../../auth/AuthProvider.tsx'
import { API_URL } from '../../auth/constants.ts'
import { useNavigate } from 'react-router-dom'

import { useAuth0 } from "@auth0/auth0-react"

import LogoutButton from '../login/LogoutButton.js'

import Loader from '../usabilidad/Loader.jsx';

function MainContent() {

    const { user, isAuthenticated, isLoading } = useAuth0();

    

    const auth = useAuth();
    const goTo = useNavigate();
    // async function handleSignOut(e: React.MouseEvent<HTMLAnchorElement>) {
    //     e.preventDefault();

    //     try {
    //         const response = await fetch(`${API_URL}/signout`, {
    //             method: "DELETE",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${auth.getRefreshToken()}`,
    //             },
    //         });

    //         if (response.ok) {
    //             auth.signOut();
    //             goTo("/");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    
    if (isLoading) {
        return <div><Loader/></div>;
    }
    return (
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



                        {/*<!-- Nav Item - Alerts -->*/}
                        <li className="nav-item dropdown no-arrow mx-1">
                            <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-bell fa-fw"></i>
                                {/*<!-- Counter - Alerts -->*/}
                                <span className="badge badge-danger badge-counter">3+</span>
                            </a>
                            {/*<!-- Dropdown - Alerts -->*/}

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

                        </li>

                        <div className="topbar-divider d-none d-sm-block"></div>

                        {/*<!-- Nav Item - User Information -->*/}
                        <li className="nav-item dropdown no-arrow">
                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user?.name || ""}</span>
                                <img className="img-profile rounded-circle"
                                    src={user?.picture} /> 
                                {/* <button onClick={handleSignOut}>Cerrar Sesión</button> */}
                                <LogoutButton />
                            </a>
                            {/*<!-- Dropdown - User Information -->*/}

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
                                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: "20%" }}
                                            aria-valuenow={20}
                                            aria-valuemin={0}
                                            aria-valuemax={100}></div>
                                    </div>
                                    <h4 className="small font-weight-bold">Proyecto Terreno 1.2<span
                                        className="float-right">20%</span></h4>
                                    <div className="progress mb-4">
                                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: "20%" }}
                                            aria-valuenow={20}
                                            aria-valuemin={0}
                                            aria-valuemax={100}></div>
                                    </div>
                                    <h4 className="small font-weight-bold">Proyecto Terreno 1.5<span
                                        className="float-right">20%</span></h4>
                                    <div className="progress mb-4">
                                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: "20%" }}
                                            aria-valuenow={20}
                                            aria-valuemin={0}
                                            aria-valuemax={100}></div>
                                    </div>
                                    <h4 className="small font-weight-bold">Proyecto Terreno 2 <span
                                        className="float-right">40%</span></h4>
                                    <div className="progress mb-4">
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: "40%" }}
                                            aria-valuenow={30}
                                            aria-valuemin={0}
                                            aria-valuemax={100}></div>
                                    </div>
                                    <h4 className="small font-weight-bold">Proyecto Terreno 3<span
                                        className="float-right">60%</span></h4>
                                    <div className="progress mb-4">
                                        <div className="progress-bar" role="progressbar" style={{ width: "60%" }}
                                            aria-valuenow={60}
                                            aria-valuemin={0}
                                            aria-valuemax={100}></div>
                                    </div>
                                    <h4 className="small font-weight-bold">Proyecto Terreno 4 <span
                                        className="float-right">80%</span></h4>
                                    <div className="progress mb-4">
                                        <div className="progress-bar bg-info" role="progressbar" style={{ width: "80%" }}
                                            aria-valuenow={80}
                                            aria-valuemin={0}
                                            aria-valuemax={100}></div>
                                    </div>
                                    <h4 className="small font-weight-bold">Proyecto Terreno 5 <span
                                        className="float-right">Completo!</span></h4>
                                    <div className="progress">
                                        <div className="progress-bar bg-success" role="progressbar" style={{ width: "100%" }}
                                            aria-valuenow={100}
                                            aria-valuemin={0}
                                            aria-valuemax={100}></div>
                                    </div>

                                </div>
                            </div>


                        </div>

                        <div className="col-lg-6 mb-4">
                            {/*<!-- Approach -->*/}
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold ">Información</h6>
                                </div>
                                <div className="card-body" style={{ display: "flex" }}>
                                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: "50%", objectFit: "contain" }}
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
                                    Si necesitas más información sobre nuestros servicios puedes escribirnos al correo <a target="_blank" rel="nofollow" href="mailto:contacto@gravitacional.cl">contacto@gravitacional.cl</a> o visita nuestra página web  <a target="_blank" rel="nofollow" href="https://gravitacional.cl/">gravitacional.cl</a>
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