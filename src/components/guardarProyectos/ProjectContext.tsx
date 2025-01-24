import React, { createContext, useContext, useState } from "react";
import { Project } from "../../types/types";

export const ProjectContext = createContext<{
  project: Project;
  updateProject: (key: keyof Project, value: any) => void;
} | null>(null);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [project, setProject] = useState<Project>({
    name: "",
    description: "",
    userId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    coordinates: [],
    coordinatesCenter: { lat: 0, lng: 0 },
    thumbnail: "",
    lineas: {},
    malla: {},
    laderas: {},
    suelos: {},
    matriz: {},
    arJson: {},
    genJson: {},
    lineasJson: {},
  });

  const updateProject = (key: keyof Project, value: any) => {
    setProject((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <ProjectContext.Provider value={{ project, updateProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject debe ser usado dentro de ProjectProvider");
  }
  return context;
};
