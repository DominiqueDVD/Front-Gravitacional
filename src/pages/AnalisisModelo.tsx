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
  // console.log(coordinates);

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





  const loadbalancer = () => {
    const myHeaders = new Headers();
    myHeaders.append("RhinoComputeKey", "gravitacional");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "absolutetolerance": 0.001,
      "angletolerance": 1,
      "modelunits": "Millimeters",
      "dataversion": 8,
      "algo": "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",
      "pointer": null,
      "cachesolve": false,
      "values": [],
      "warnings": [],
      "errors": []
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    fetch("http://rhino-compute-loadbalancer-824415098.us-east-1.elb.amazonaws.com/io", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div className="compute-buttons">
        <ModelViewer />
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
      </div>

      <ModelViewer />
      <button className="btn btn-primary" onClick={() => handleViewChange("poligono")}>
        Polígono
      </button>
      <button className="btn btn-primary" onClick={() => loadbalancer()}>
        Probar Rhino Compute
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

        {coordenadasValidas && (
          <div>
            {view === "vista3D" && (
              <div id="seccion2" className="secciones full-width">
                <VistaModelo3D />
              </div>
            )}
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

      <div className="project-form">
        <input 
          type="text" 
          name="name" 
          value={project.name} 
          onChange={handleInputChange} 
          placeholder="Nombre del proyecto" 
        />
        <input 
          type="text" 
          name="description" 
          value={project.description} 
          onChange={handleInputChange} 
          placeholder="Descripción del proyecto" 
        />
      </div>
    </div>
  );
};

export default AnalisisModelo;
