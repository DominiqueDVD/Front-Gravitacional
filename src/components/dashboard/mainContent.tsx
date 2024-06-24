import React, { useEffect, useState } from 'react';
import '../../styles/dashboard/sb-admin-2.min.css';
import '../../styles/dashboard/dashboard.css';
import img3 from '../../assets/dashboard/undraw_profile.svg';
import img7 from '../../assets/dashboard/iso-2.png';
import { useAuth } from '../../auth/AuthProvider.tsx';
import { API_URL } from '../../auth/constants.ts';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth0 } from "@auth0/auth0-react";

import LogoutButton from '../login/LogoutButton.tsx';

import Loader from '../usabilidad/Loader.tsx';

import UserRoles from '../login/UserRoles.tsx';

import RequestComponent from '../eos/RequestComponent.tsx';
import ProjectForm from '../guardarProyectos/ProjectForm';

function MainContent() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const auth = useAuth();
    const goTo = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [projectName, setProjectName] = useState('');

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleProjectNameChange = (event) => {
        setProjectName(event.target.value);
    };

    const handleCreateProject = () => {
        if (projectName.trim()) {
            // Aquí puedes manejar el nombre del proyecto (por ejemplo, guardarlo en algún estado global)
            // Luego redirigir a la página de polígono
            goTo('/poligono');
        }
    };

    const navigateEosTest = () =>{
        goTo('/EosTest');
    }

    if (isLoading) {
        return <div><Loader /></div>;
    }

    return (
        <div>
            {/*<!-- Main Content -->*/}
            <div>
                {/* {isAuthenticated && (
                    <UserRoles />
                )} */}
            </div>
            {/* <ProjectForm /> */}
            
            <div id="content">
            
           <br />
                <button className='btn btn-primary' onClick={navigateEosTest}>EOS Test</button>
                <button className='btn btn-primary' onClick={() => goTo('/OpenTopography')}>OpenTopography</button>

                <div className="container-fluid">
                    {/*<!-- Page Heading -->*/}
                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <div></div>
                        <div className='buttonspanel'>
                            <button onClick={handleOpenModal} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                <i className="fas fa-plus fa-sm text-white-50"></i> Nuevo proyecto
                            </button>
                            <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                <i className="fas fa-download fa-sm text-white-50"></i> Generar reporte
                            </a>
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
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
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
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold ">Lorem Ipsum</h6>
                                </div>
                                {/*<!-- Card Body -->*/}
                                <div className="card-body">
                                    <div className="chart-pie pt-4 pb-2">
                                        <canvas id="myPieChart"></canvas>
                                    </div>
                                    <div className="mt-4 text-center small">
                                        <span className="mr-2"></span>
                                        <span className="mr-2"></span>
                                        <span className="mr-2"></span>
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
                                <div className="card-body"></div>
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
                                    <div className="text-center"></div>
                                    Si necesitas más información sobre nuestros servicios puedes escribirnos al correo <a target="_blank" rel="nofollow" href="mailto:contacto@gravitacional.cl">contacto@gravitacional.cl</a> o visita nuestra página web  <a target="_blank" rel="nofollow" href="https://gravitacional.cl/">gravitacional.cl</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<!-- /.container-fluid -->*/}
            </div>
            {/*<!-- End of Main Content -->*/}

            {showModal && (
                <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Nuevo Proyecto</h5>
                                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del proyecto"
                                    value={projectName}
                                    onChange={handleProjectNameChange}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={handleCloseModal}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={handleCreateProject}>Crear Proyecto</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MainContent;
