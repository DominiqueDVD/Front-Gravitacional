import React, { useState } from "react";
import { createProject } from "../../services/ProjectService";
import { Project } from "../../types/types";
import { useProject } from "./ProjectContext";

const ProjectForm: React.FC = () => {
  const { updateProject, project } = useProject();
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (field: string) => {
    updateProject(field, formData[field as keyof typeof formData]);
  };

  const isValidProject = (): boolean => {
    return !!project.name && !!project.userId && project.coordinates.length > 0;
  };

  const saveProject = async () => {
    if (!isValidProject()) {
      alert("Faltan datos para guardar el proyecto");
      return;
    }

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        alert("Proyecto guardado exitosamente");
      } else {
        console.error("Error al guardar el proyecto:", await response.text());
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label">
            Nombre del proyecto
          </label>
          <input
            id="inputName"
            type="text"
            className="form-control"
            aria-label="Nombre del proyecto"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={() => handleBlur("name")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="inputDescription" className="form-label">
            Descripción
          </label>
          <textarea
            id="inputDescription"
            className="form-control"
            aria-label="Descripción del proyecto"
            name="description"
            value={formData.description}
            onChange={handleChange}
            onBlur={() => handleBlur("description")}
          />
        </div>

        <button onClick={saveProject} className="btn btn-success">
          Guardar Proyecto
        </button>
      </form>

      <pre className="overflow-auto">{JSON.stringify(project, null, 2)};</pre>
    </div>
  );
};

export default ProjectForm;
