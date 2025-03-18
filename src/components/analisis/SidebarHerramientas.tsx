import React, { useState } from "react";
import RhinoViewer from "../rhinoCompute/RhinoViewer";
import SelectSuelos from "../suelos/selectSuelos";
import MapaPoligono from "../maps/MapaPoligono";

const SidebarHerramientas = () => {
  const [activeTab, setActiveTab] = useState<string>("poligono");

  const renderContent = () => {
    switch (activeTab) {
      case "poligono":
        return (
          <div>
            <h1 className="text-center">Selección de terreno</h1>
            <MapaPoligono />
          </div>
        );
      case "herramienta1":
        return (
          <div>
            <h1 className="text-center">Zonas vulnerables</h1>
          </div>
        );
      case "herramienta2":
        return (
          <div>
            <h1 className="text-center">Cálculo de flujo</h1>
          </div>
        );
      case "herramienta3":
        return (
          <div>
            <h1 className="text-center">Diseño Hidrológico</h1>
            <RhinoViewer />
          </div>
        );
      case "herramienta4":
        return (
          <div>
            <h1 className="text-center">Plantaciones con retención hídrica</h1>
            <SelectSuelos />
          </div>
        );
      case "proximamente":
        return (
          <div>
            <h1 className="text-center">Próximamente</h1>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <aside>
      <div
        className="offcanvas offcanvas-start bg-gravi-blue"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex={-1}
        id="herramientasSidebar"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
            Selección de Herramientas
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <nav>
            <button
              className={`flex-sm-fill text-sm-center nav-link btn w-100 bg-gravi-green ${
                activeTab === "poligono" ? "active" : ""
              }`}
              type="button"
              onClick={() => setActiveTab("poligono")}
            >
              Selección de terreno
            </button>
            <hr />
            {/* <div>
              <button
                className="btn text-white w-100 dropdown-toggle"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseAnalisisGeografico"
                aria-expanded="false"
                aria-controls="collapseAnalisisGeografico"
              >
                <strong>Análisis Geográfico</strong>
              </button>
              <div className="collapse" id="collapseAnalisisGeografico">
                <div>
                  <nav>
                    <button
                      className={`flex-sm-fill text-sm-center nav-link dropdown-item ${
                        activeTab === "herramienta1" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("herramienta1")}
                    >
                      Zonas vulnerables
                    </button>
                    <button
                      className={`text-sm-center nav-link dropdown-item ${
                        activeTab === "herramienta2" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("herramienta2")}
                    >
                      Cálculo de flujo
                    </button>
                  </nav>
                </div>
              </div>
            </div>
            <hr /> */}
            <div>
              <button
                className="btn text-white w-100 dropdown-toggle"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseIngenieriaConceptual"
                aria-expanded="false"
                aria-controls="collapseIngenieriaConceptual"
              >
                <strong>Ingeniería Conceptual</strong>
              </button>
              <div className="collapse" id="collapseIngenieriaConceptual">
                <div>
                  <nav>
                    <button
                      className={`flex-sm-fill text-sm-center nav-link dropdown-item ${
                        activeTab === "herramienta1" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("herramienta3")}
                    >
                      Diseño Hidrológico
                    </button>
                    <button
                      className={`text-sm-center nav-link dropdown-item ${
                        activeTab === "herramienta2" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("herramienta4")}
                    >
                      Plantaciones con retención hídrica
                    </button>
                  </nav>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <button
                className="btn text-white w-100 dropdown-toggle"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseIngenieriaDetalles"
                aria-expanded="false"
                aria-controls="collapseIngenieriaDetalles"
              >
                <strong>Ingeniería de Detalles</strong>
              </button>
              <div className="collapse" id="collapseIngenieriaDetalles">
                <div>
                  <nav>
                    <button
                      className={`flex-sm-fill text-sm-center nav-link dropdown-item ${
                        activeTab === "proximamente" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("proximamente")}
                    >
                      Trazado de drenajes
                    </button>
                    <button
                      className={`text-sm-center nav-link dropdown-item ${
                        activeTab === "proximamente" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("proximamente")}
                    >
                      Trazado de canales
                    </button>
                    <button
                      className={`text-sm-center nav-link dropdown-item ${
                        activeTab === "proximamente" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("proximamente")}
                    >
                      Trazado de caminos
                    </button>
                    <button
                      className={`text-sm-center nav-link dropdown-item ${
                        activeTab === "proximamente" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("proximamente")}
                    >
                      Optimización de alcantarillas
                    </button>
                    <button
                      className={`text-sm-center nav-link dropdown-item ${
                        activeTab === "proximamente" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("proximamente")}
                    >
                      Tranques y embalses
                    </button>
                    <button
                      className={`text-sm-center nav-link dropdown-item ${
                        activeTab === "proximamente" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("proximamente")}
                    >
                      Movimiento de tierras
                    </button>
                  </nav>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <button
                className="btn text-white w-100 dropdown-toggle"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseEjecucion"
                aria-expanded="false"
                aria-controls="collapseEjecucion"
              >
                <strong>Ejecución y seguimiento</strong>
              </button>
              <div className="collapse" id="collapseEjecucion">
                <div>
                  <nav>
                    <button
                      className={`flex-sm-fill text-sm-center nav-link dropdown-item ${
                        activeTab === "proximamente" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("proximamente")}
                    >
                      Modelos de SOC
                    </button>
                  </nav>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <button
                className="btn text-white w-100 dropdown-toggle"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseVisualizacionAR"
                aria-expanded="false"
                aria-controls="collapseVisualizacionAR"
              >
                <strong>Visualización AR</strong>
              </button>
              <div className="collapse" id="collapseVisualizacionAR">
                <div>
                  <nav>
                    <button
                      className={`flex-sm-fill text-sm-center nav-link dropdown-item ${
                        activeTab === "proximamente" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("proximamente")}
                    >
                      Visualización AR
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default SidebarHerramientas;
