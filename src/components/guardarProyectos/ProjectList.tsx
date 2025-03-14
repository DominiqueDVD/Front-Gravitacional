import React, { useEffect, useState } from "react";
import { getProjects, Project } from "../../services/ProjectService";
import Loader from "../usabilidad/Loader";
import BuscadorJson from "./BuscadorJson";

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Error buscando proyectos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h2 className="text-center">Lista de proyectos</h2>
          <div className="container text-center">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
              {projects.map((project) => (
                <div key={project.id} className="p-1 col">
                  <div className="card p-1 h-100">
                    <h3 className="bg-gravi-blue">{project.name}</h3>
                    <p>{project.description}</p>
                    {/* <p>{project.coordinates[0][0].lat}, {project.coordinates[0][0].lng}</p> */}
                    <img src={project.thumbnail} alt={project.name} />
                    <p className="form-text">{project._id}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
