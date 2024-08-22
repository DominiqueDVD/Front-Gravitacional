import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import rhino3dm from 'rhino3dm';

const RhinoViewer = ({ meshData }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const rhino = rhino3dm();
    rhino.then((rhino) => {
      // Crear una escena de Three.js
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Deserializar los datos de la malla
      const meshObject = rhino.CommonObject.decode(JSON.parse(meshData.data));

      // Crear un material y geometría de Three.js a partir del objeto de Rhino
      const geometry = new THREE.BufferGeometry().fromGeometry(meshObject.toThreejs());
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
      const mesh = new THREE.Mesh(geometry, material);

      // Agregar la malla a la escena
      scene.add(mesh);

      camera.position.z = 5;

      // Animar la escena
      const animate = function () {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
      };

      animate();
    });

    return () => {
      rhino3dm().then((rhino) => rhino.delete());
    };
  }, [meshData]);

  return <canvas ref={canvasRef} />;
};

export default RhinoViewer;