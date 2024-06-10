import React, { useEffect, useState } from 'react';
import { getProjects, Project } from '../../services/ProjectService';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error buscando proyectos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Lista de proyectos</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <img src={project.thumbnail} alt={project.name} />
            {/* Render other project details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
