import React, { useEffect, useState } from 'react'
import '../../styles/dashboard/sb-admin-3.min.css'
import '../../styles/dashboard/dashboard.css'
import '../../styles/dashboard/adminDashboard.css'
import img3 from '../../assets/dashboard/undraw_profile.svg'
import img7 from '../../assets/dashboard/iso-2.png'
import { useAuth } from '../../auth/AuthProvider.tsx'
import { API_URL } from '../../auth/constants.ts'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import CommentForm from '../Foro/commentForm.tsx'
import CommentList from '../Foro/commentList.tsx'
import GridDePublicaciones from '../gridPublicaciones.tsx'

function MainContent() {
    const auth = useAuth();
    const goTo = useNavigate();
    const [posts, setPosts] = useState([]);
    const [foros, setForos] = useState([]);

    useEffect(() => {
        async function fetchForos() {
            try {
                const response = await axios.get(`${API_URL}/foro`);
                if (response.status === 200) {
                    setForos(response.data);
                } else {
                    console.error('Error fetching foros:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching foros:', error);
            }
        }

        fetchForos();
    }, []);

    const handleComentarioSubmit = async (id, comentario) => {
        try {
            await axios.post(`${API_URL}/foro/${id}/comentarios`, { contenido: comentario });
            fetchForos();
        } catch (error) {
            console.error('Error submitting comentario:', error);
        }
    };

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch(`${API_URL}/blog`);
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data.reverse());
                } else {
                    console.error('Error fetching posts:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }

        fetchPosts();
    }, []);

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

    const preguntas = foros.filter(foro => foro.tipo === 'pregunta');
    const comentarios = foros.filter(foro => foro.tipo === 'comentario');

    return (
        <div>
            {/*<!-- Main Content -->*/}
            <div id="content">
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                    </button>
                    <h1 className="h3 mb-1 text-gray-800" id='tituloPrincipal'>PLANIFICACIÓN TERRITORIAL Y GESTION DE AGUA LLUVIA</h1>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown no-arrow mx-1">
                            <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-bell fa-fw"></i>
                                <span className="badge badge-danger badge-counter">3+</span>
                            </a>
                        </li>
                        <li className="nav-item dropdown no-arrow mx-1">
                            <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-envelope fa-fw"></i>
                                <span className="badge badge-danger badge-counter">7</span>
                            </a>
                        </li>
                        <div className="topbar-divider d-none d-sm-block"></div>
                        <li className="nav-item dropdown no-arrow">
                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">{auth.getUser()?.username || ""}</span>
                                <img className="img-profile rounded-circle" src={img3} />
                                <button onClick={handleSignOut}>Cerrar Sesión</button>
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="container-fluid">
                    <div className='buttonspanel' style={{ justifyContent: "space-between" }}>
                        <h4 className='lastProyects'>Ultimos proyectos</h4>
                        <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                            <i className="fas fa-download fa-sm text-white-50"></i> Generar reporte
                        </a>
                    </div>
                    <br />
                    <div className="row">
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

                    <div className="row">
                        <div className="col-xl-8 col-lg-7">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold ">Últimas publicaciones</h6>
                                </div>
                                <div className="card-body">
                                    <div className="chart-area">
                                        <GridDePublicaciones posts={posts.slice(0, 8)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-5">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold ">Preguntas</h6>
                                </div>
                                <div className="card-body">
                                    <div className="chart-area">
                                        {preguntas.map((pregunta, index) => (
                                            <div key={index}>
                                                <h6>{pregunta.contenido}</h6>
                                                <CommentList comentarios={pregunta.comentarios.filter(comentario => comentario.tipo !== 'pregunta')} />
                                                <CommentForm onSubmit={(comentario) => handleComentarioSubmit(pregunta._id, comentario)} />
                                                <br />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 mb-4">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold ">Comentarios</h6>
                                </div>
                                <div className="card-body">
                                    <div className="chart-area">
                                        {comentarios.length > 0 ? (
                                            comentarios.map((comentario, index) => (
                                                <div key={index}>
                                                    <h6>{comentario.contenido}</h6>
                                                    <CommentList comentarios={comentario.comentarios} />
                                                    <CommentForm onSubmit={(comentario) => handleComentarioSubmit(comentario._id, comentario)} />
                                                </div>
                                            ))
                                        ) : (
                                            <p>No hay comentarios para mostrar.</p>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col-lg-6 mb-4">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold ">Información</h6>
                                </div>
                                <div className="chart-area">
                                    {/* Agrega contenido informativo aquí */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainContent;