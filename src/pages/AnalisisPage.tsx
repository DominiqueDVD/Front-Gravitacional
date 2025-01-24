import React, { useState, useEffect } from "react";
import "../styles/analisisModelo.css";
import OpenTopography from "../components/openTopography/OpenTopography";
import EosRequestComponent from "../components/eos/EosRequestComponent";
import VistaModelo3D from "./VistaModelo3D";
import MapaPoligono from "../components/maps/MapaPoligono";
import { calcularCentroide } from "../components/googleEarth/puntos";
import { createProject, updateProject } from "../services/ProjectService";
import { useAuth0 } from "@auth0/auth0-react";
import AnalisisPrincipal from "../components/analisis/AnalisisPrincipal";
import { Coordinate, Project } from "../types/types";
import { ProjectProvider } from "../components/guardarProyectos/ProjectContext";

const AnalisisModelo = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  // const [view, setView] = useState("poligono");
  // const [coordinates, setCoordinates] = useState<Coordinate[]>([
  //   { lat: -36.6066, lng: -72.1034 },
  //   { lat: -36.6067, lng: -72.1035 },
  //   { lat: -36.6068, lng: -72.1036 },
  // ]);
  // const [coordenadasValidas, setCoordenadasValidas] = useState<boolean>(false);
  // const [centroide, setCentroide] = useState<Coordinate>();

  // const [project, setProject] = useState<Project>({
  //   ID: "12345",
  //   name: "Proyecto de Prueba",
  //   description: "Este es un proyecto de prueba con datos placeholder.",
  //   userId: "user_001",
  //   createdAt: new Date("2024-11-14T10:00:00Z"),
  //   updatedAt: new Date("2024-11-14T10:00:00Z"),
  //   coordinates: [
  //     { lat: -36.6066, lng: -72.1034 },
  //     { lat: -36.6067, lng: -72.1035 },
  //     { lat: -36.6068, lng: -72.1036 },
  //   ],
  //   coordinatesCenter: { lat: -36.6067, lng: -72.1035 },
  //   thumbnail: "https://via.placeholder.com/150", // Imagen de prueba
  //   lineas: { type: "LineString", data: [] }, // Representación genérica
  //   malla: { type: "Mesh", data: [] }, // Representación genérica
  //   laderas: { type: "Polygon", data: [] }, // Representación genérica
  //   suelos: { type: "Soil", data: [] }, // Representación genérica
  //   matriz: {
  //     type: "Matrix",
  //     data: [
  //       [0, 1],
  //       [1, 0],
  //     ],
  //   }, // Representación genérica
  // });

  // useEffect(() => {
  //   if (coordinates.length > 0) {
  //     const nuevoCentroide = calcularCentroide(coordinates);
  //     setCentroide(nuevoCentroide);
  //   }
  // }, [coordinates]);

  // const actualizarCoordenadas = (nuevasCoordenadas: Coordinate[]) => {
  //   setCoordinates(nuevasCoordenadas);
  //   setCoordenadasValidas(true);
  //   const nuevoCentroide = calcularCentroide(nuevasCoordenadas);
  //   setCentroide(nuevoCentroide);
  // };

  // const handleLatLngChange = (newCentroide: Coordinate) => {
  //   console.log("Nuevo centroide desde VistaModelo3D:", newCentroide);
  //   setCentroide(newCentroide);
  // };

  // const handleViewChange = (viewName: string) => {
  //   setView(viewName);
  // };

  // const handleCoordinatesConfirm = (newCoordinates: Coordinate[]) => {
  //   setCoordinates(newCoordinates);
  // };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setProject((prevProject) => ({
  //     ...prevProject,
  //     [name]: value,
  //   }));
  // };

  // const handleGuardarProyecto = () => {
  //   project.coordinates = coordinates;
  //   createProject(project);
  // };

  return (
    <div>
      <ProjectProvider>
        <AnalisisPrincipal />
      </ProjectProvider>
    </div>
  );
};

export default AnalisisModelo;
