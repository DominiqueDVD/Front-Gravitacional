import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AAIGrid3DProps {
  aaiGridData: string;
}

const parseAAIGrid = (aaiGridData: string) => {
  const lines = aaiGridData.trim().split('\n');
  const header = lines.slice(0, 6);
  const data = lines.slice(6);

  const ncols = parseInt(header[0].split(' ')[1], 10);
  const nrows = parseInt(header[1].split(' ')[1], 10);
  const xllcorner = parseFloat(header[2].split(' ')[1]);
  const yllcorner = parseFloat(header[3].split(' ')[1]);
  const cellsize = parseFloat(header[4].split(' ')[1]);

  const values = data.flatMap(line => line.trim().split(/\s+/).map(Number));

  return { ncols, nrows, xllcorner, yllcorner, cellsize, values };
};

const AAIGrid3D: React.FC<AAIGrid3DProps> = ({ aaiGridData }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { ncols, nrows, cellsize, values } = parseAAIGrid(aaiGridData);

    // Configurar la escena, cámara y renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Crear la geometría del terreno
    const geometry = new THREE.PlaneGeometry(ncols * cellsize, nrows * cellsize, ncols - 1, nrows - 1);
    const vertices = geometry.attributes.position.array;

    for (let i = 0; i < values.length; i++) {
      vertices[i * 3 + 2] = values[i]; // Asignar la altura (z) del terreno
    }

    geometry.computeVertexNormals();

    // Crear un material para el terreno
    const material = new THREE.MeshStandardMaterial({ color: 0x556b2f, wireframe: false });

    // Crear la malla y agregarla a la escena
    const terrain = new THREE.Mesh(geometry, material);
    terrain.rotateX(-Math.PI / 2);
    scene.add(terrain);

    // Agregar una luz a la escena
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 10).normalize();
    scene.add(light);

    camera.position.z = 100;

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Limpiar el renderizador al desmontar el componente
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [aaiGridData]);

  return <div ref={mountRef}></div>;
};

export default AAIGrid3D;
