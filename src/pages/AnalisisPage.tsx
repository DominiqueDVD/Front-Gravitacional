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

  return (
    <div>
      <ProjectProvider>
        <AnalisisPrincipal />
      </ProjectProvider>
    </div>
  );
};

export default AnalisisModelo;
