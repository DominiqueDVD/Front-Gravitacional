import React, { useState } from 'react';
import { createProject, Project } from '../../services/ProjectService';

const ProjectForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [coordinates, setCoordinates] = useState(''); // Asumiendo que es una cadena JSON
  const [thumbnail, setThumbnail] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newProject: Project = {
      name,
      description,
      userId,
      coordinates: JSON.parse(coordinates), // Conversión de JSON string a array
      thumbnail,
    };

    try {
      const savedProject = await createProject(newProject);
      console.log('Proyecto guardado:', savedProject);
      // Aquí puedes añadir lógica para redireccionar o actualizar la UI
    } catch (error) {
      console.error('Error guardando el proyecto:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-5">
        <div>
          <label>Nombre del proyecto:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>ID de usuario:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Coordenadas (JSON):</label>
          <input
            type="text"
            value={coordinates}
            onChange={(e) => setCoordinates(e.target.value)}
            required
          />
        </div>
        <div>
          <label>URL de miniatura:</label>
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary m-3">Guardar proyecto</button>
      </form>
    </div>

  );
};

export default ProjectForm;
