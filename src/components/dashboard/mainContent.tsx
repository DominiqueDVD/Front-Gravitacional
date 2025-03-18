import React from "react";
import "../../styles/dashboard/sb-admin-2.min.css";
import "../../styles/dashboard/dashboard.css";
import img7 from "../../assets/dashboard/iso-2.png";
import { useNavigate } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

import Loader from "../usabilidad/Loader.tsx";
import NoPagadas from "../herramientas/noPagadas.tsx";
import Pagadas from "../herramientas/pagadas.tsx";

function MainContent() {
  const { isLoading } = useAuth0();
  const goTo = useNavigate();

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div id="content">
        <br />
        <div className="container-fluid">
          {/*<!-- Page Heading -->*/}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <div className="buttonspanel">
              <a
                href="/analisis"
                className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
              >
                <i className="fas fa-plus fa-sm text-white-50"></i> Nuevo
                proyecto
              </a>

              {/* <a
                href="#"
                className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
              >
                <i className="fas fa-download fa-sm text-white-50"></i> Generar
                reporte
              </a> */}
            </div>
          </div>

          {/*<!-- Content Row -->*/}
          <div className="row">
            {/*<!-- Pie Chart -->*/}
            <div className="col-xl-4 col-lg-5">
              <div className="card shadow mb-4">
                {/*<!-- Card Header - Dropdown -->*/}
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold ">
                    Herramientas de Análisis Geográfico
                  </h6>
                </div>
                {/*<!-- Card Body -->*/}
                <div className="card-body">
                  <div className="chart-pie pb-2">
                    <NoPagadas />
                  </div>
                </div>
              </div>
            </div>

            {/*<!-- Area Chart -->*/}
            <div className="col-xl-8 col-lg-7">
              <div className="card shadow mb-4">
                {/*<!-- Card Header - Dropdown -->*/}
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold ">
                    Herramientas Específicas para la Gestión de Agua
                  </h6>
                </div>
                {/*<!-- Card Body -->*/}
                <div className="card-body">
                  <div className="chart-pie pb-2">
                    <Pagadas />
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
                <div className="card-body" style={{ display: "flex" }}>
                  <img
                    className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                    style={{ width: "50%", objectFit: "contain" }}
                  />
                  <p></p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-4">
              {/*<!-- Approach -->*/}
              {/* <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold ">Información</h6>
                                </div>
                                <div className="card-body" style={{ display: "flex" }}>
                                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: "50%", objectFit: "contain" }}
                                        src={img7} alt="..." />
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                </div>
                            </div> */}

              {/*<!-- Illustrations -->*/}
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold ">Contacto</h6>
                </div>
                <div className="card-body">
                  <div className="text-center"></div>
                  Si necesitas más información sobre nuestros servicios puedes
                  escribirnos al correo{" "}
                  <a
                    target="_blank"
                    rel="nofollow"
                    href="mailto:contacto@gravitacional.cl"
                  >
                    contacto@gravitacional.cl
                  </a>{" "}
                  o visita nuestra página web{" "}
                  <a
                    target="_blank"
                    rel="nofollow"
                    href="https://gravitacional.cl/"
                  >
                    gravitacional.cl
                  </a>
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
