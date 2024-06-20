import React, { useState, useEffect } from "react";
import "../styles/analisisModelo.css";
import OpenTopography from "../components/openTopography/OpenTopography";
// import EosTest from "./EosTest.jsx";
import EosRequestComponent from "../components/eos/EosRequestComponent";
import VistaModelo3D from "./VistaModelo3D";
import MapaPoligono from "./MapaPoligono";
import { calcularCentroide } from "../components/googleEarth/puntos";
import { createProject, updateProject } from '../services/ProjectService';

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Project {
  coordinates: Coordinate[];
  // id?: string;
  // name: string;
  // description: string;
  // userId: string;
  // createdAt?: string;
  // updatedAt?: string;
  // thumbnail: string;

  // Otros campos del proyecto
}

const AnalisisModelo: React.FC<{ project: Project }> = ({ project }) => {
  const initialCoordinates = project?.coordinates || [];
  const [view, setView] = useState("poligono");
  const [coordinates, setCoordinates] = useState<Coordinate[]>(initialCoordinates);
  const [coordenadasValidas, setCoordenadasValidas] = useState<boolean>(false);
  const [centroide, setCentroide] = useState<Coordinate>();

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

  const handleGuardarProyecto = () => {
    console.log("Guardar proyecto");
    project.coordinates = coordinates;
    createProject(project);
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={() => handleViewChange("poligono")}>
        Polígono
      </button>
      {coordenadasValidas && (
        <div>
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
      <div id="containerGeneral">
        {view === "poligono" && (
          <div id="seccion1" className="secciones full-width">
            <MapaPoligono coordinates={coordinates} actualizarCoordenadas={actualizarCoordenadas} />
          </div>
        )}
        {view === "vista3D" && (
          <div id="seccion2" className="secciones full-width">
            {coordinates && coordinates.length > 0 ? (
              <VistaModelo3D coordinates={coordinates} />
            ) : (
              <div>Cargando datos...</div> // Podrías mostrar un spinner u otro indicador aquí
            )}
          </div>
        )}
        {coordenadasValidas && (
          <div>
            {view === "vistaOpenTP" && (
              <div id="seccion3" className="secciones full-width">
                <OpenTopography coordinates={coordinates} />
              </div>
            )}
            {view === "vistaEOS" && (
              <div id="seccion4" className="secciones full-width">
                <EosRequestComponent coordinates={coordinates} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalisisModelo;