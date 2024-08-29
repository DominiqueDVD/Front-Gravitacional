import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const RhinoComputeComponent: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleCompute = async () => {
        try {
            const response = await fetch('http://localhost:3100/api/rhino/compute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            render3DModel(data);
        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
        }
    };

    const render3DModel = (data: any) => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Crear geometría a partir de los datos
        const geometry = new THREE.SphereGeometry(data.radius); // Ejemplo simple
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        camera.position.z = 5;

        const animate = function () {
            requestAnimationFrame(animate);
            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.01;
            renderer.render(scene, camera);
        };

        animate();
    };

    return (
        <div>
            <button onClick={handleCompute}>Compute Rhino Geometry</button>
            <div ref={containerRef}></div>
        </div>
    );
};

export default RhinoComputeComponent;