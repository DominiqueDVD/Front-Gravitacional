import React, { useState, useEffect } from "react";
import "../styles/analisisModelo.css";
import OpenTopography from "../components/openTopography/OpenTopography";
import EosRequestComponent from "../components/eos/EosRequestComponent";
import VistaModelo3D from "./VistaModelo3D";
import MapaPoligono from "./MapaPoligono";
import { calcularCentroide } from "../components/googleEarth/puntos";
import { createProject, updateProject } from '../services/ProjectService';
import ModelViewer from "../components/rhinoCompute/ModelViewer";
import { useAuth0 } from "@auth0/auth0-react"
import AnalisisTerreno from "../components/analisis/AnalisisTerreno";

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Project {

  // id?: string;
  name: string;
  description: string;
  userId: string;
  coordinates: Coordinate[];
  thumbnail: string;
}

const AnalisisModelo: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [view, setView] = useState("poligono");
  const [coordinates, setCoordinates] = useState<Coordinate[]>([
    { lat: -36.6066, lng: -72.1034 },
    { lat: -36.6067, lng: -72.1035 },
    { lat: -36.6068, lng: -72.1036 },
  ]);
  const [coordenadasValidas, setCoordenadasValidas] = useState<boolean>(false);
  const [centroide, setCentroide] = useState<Coordinate>();

  const [project, setProject] = useState<Project>({
    name: "",
    description: "",
    userId: user?.sub || "", // Asignar un string vacío si user?.sub es undefined

    name: "Proyecto de prueba",
    description: "Descripción de prueba",
    userId: user?.sub || "",
    coordinates: coordinates,
    thumbnail: "https://drive.google.com/file/d/1J2V78gGG5JEnUwdmm8r4sdOGGigs0YE9/view?usp=sharing"
  });
  console.log(coordinates);

  useEffect(() => {
    if (coordinates.length > 0) {
      const nuevoCentroide = calcularCentroide(coordinates);
      setCentroide(nuevoCentroide);
    }
  }, [coordinates]);

  const actualizarCoordenadas = (nuevasCoordenadas: Coordinate[]) => {
    setCoordinates(nuevasCoordenadas);
    setCoordenadasValidas(true);
    const nuevoCentroide = calcularCentroide(nuevasCoordenadas);
    setCentroide(nuevoCentroide);
  };

  const handleLatLngChange = (newCentroide: Coordinate) => {
    console.log("Nuevo centroide desde VistaModelo3D:", newCentroide);
    setCentroide(newCentroide);
  };

  const handleViewChange = (viewName: string) => {
    setView(viewName);
  };

  const handleCoordinatesConfirm = (newCoordinates: Coordinate[]) => {
    setCoordinates(newCoordinates);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProject(prevProject => ({
      ...prevProject,
      [name]: value
    }));
  };

  const handleGuardarProyecto = () => {
    console.log("Guardar proyecto");
    project.coordinates = coordinates;
    createProject(project);
  }

  return (
    <div>
      <AnalisisTerreno />
      {/* <div className="compute-buttons">
        <div className="analisis-buttons">
          <button className="btn btn-primary" onClick={() => handleViewChange("poligono")}>
            Polígono
          </button>
          {coordenadasValidas && (
            <div className="herramientas-buttons">
              <button className="btn btn-primary" onClick={() => handleViewChange("vista3D")}>
                Vista 3D
              </button>
              <button className="btn btn-primary" onClick={() => handleViewChange("vistaOpenTP")}>
                Vista OpenTP
              </button>
              <button className="btn btn-primary" onClick={() => handleViewChange("vistaEOS")}>
                Vista EOS
              </button>
              <button className="btn btn-success" onClick={() => handleGuardarProyecto()}>Guardar proyecto</button>
            </div>
          )}
        </div>
      </div> */}

      {/* <div id="containerGeneral">
        {view === "poligono" && (
          <div id="seccion1" className="secciones full-width">
            <MapaPoligono />
          </div>
        )}

        {coordenadasValidas && (
          <div>
            {view === "vista3D" && (
              <div id="seccion2" className="secciones full-width">
                <VistaModelo3D />
              </div>
            )}
            {view === "vistaOpenTP" && (
              <div id="seccion3" className="secciones full-width">
                <OpenTopography />
              </div>
            )}
            {view === "vistaEOS" && (
              <div id="seccion4" className="secciones full-width">
                <EosRequestComponent />
              </div>
            )}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default AnalisisModelo;
