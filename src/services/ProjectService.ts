import axios from 'axios';

// Define la URL base de la API
const API_URL = process.env.REACT_APP_BACKEND_URL;

export interface Project {
    id?: string;
    name: string;
    description: string;
    userId: string;
    createdAt?: string;
    updatedAt?: string;
    coordinates: number[][][];
    thumbnail: string;
}

// Función para obtener todos los proyectos
export const getProjects = async (): Promise<Project[]> => {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
};

// Función para crear un nuevo proyecto
export const createProject = async (project: Project): Promise<Project> => {
    const response = await axios.post(`${API_URL}/projects`, project);
    return response.data;
};

// Función para actualizar un proyecto existente
export const updateProject = async (id: string, project: Project): Promise<Project> => {
    const response = await axios.put(`${API_URL}/projects/${id}`, project);
    return response.data;
};

// Agregar más funciones como eliminar proyecto, obtener por ID, etc.

export const deleteProject = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/projects/${id}`);
};
