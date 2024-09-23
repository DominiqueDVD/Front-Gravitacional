import React, { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { fetchJson } from "../services/layersService";

const LayersApp: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const currentMeshRef = useRef<THREE.Mesh | null>(null);
  const raycasterRef = useRef<THREE.Raycaster | null>(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  // Función para cargar un layer desde un archivo JSON
  const loadLayer = useCallback((file: string) => {
    const scene = sceneRef.current;
    const currentMesh = currentMeshRef.current;

    // Limpiar el mesh actual si existe
    if (currentMesh && scene) {
      scene.remove(currentMesh);
      currentMesh.geometry.dispose();

      if (Array.isArray(currentMesh.material)) {
        currentMesh.material.forEach((material) => material.dispose());
      } else {
        currentMesh.material.dispose();
      }

      currentMeshRef.current = null;
    }

    fetchJson(file)
      .then((data) => {
        createMesh(data);
      })
      .catch((error) => {
        console.error("Error fetching JSON:", error);
      });
  }, []);

  // Función para crear un mesh en la escena de Three.js
  const createMesh = useCallback((data: any) => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(data.vertices.length * 3);

    // Convertir los vértices
    for (let i = 0; i < data.vertices.length; i++) {
      vertices[i * 3] = data.vertices[i][0];
      vertices[i * 3 + 1] = data.vertices[i][2];
      vertices[i * 3 + 2] = -data.vertices[i][1];
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

    // Convertir los colores
    const colors = new Float32Array(data.colors.flat().map((c: number) => c / 255));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Convertir los índices
    const indices = new Uint32Array(data.faces.flat());
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    // Crear el material y el mesh
    const material = new THREE.MeshBasicMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
    });

    const newMesh = new THREE.Mesh(geometry, material);
    if (scene) {
      scene.add(newMesh);
      currentMeshRef.current = newMesh;
      if (camera) fitCameraToMesh(newMesh);
    }
  }, []);

  // Ajustar la cámara para encajar el mesh
  const fitCameraToMesh = useCallback((mesh: THREE.Mesh) => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;

    if (!scene || !camera) return;

    const box = new THREE.Box3().setFromObject(mesh);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const aspect = (window.innerWidth - 80) / window.innerHeight;

    camera.left = -maxDim * aspect / 2;
    camera.right = maxDim * aspect / 2;
    camera.top = maxDim / 2;
    camera.bottom = -maxDim / 2;

    camera.position.set(center.x + maxDim, center.y + maxDim, center.z + maxDim);
    camera.lookAt(center);

    camera.updateProjectionMatrix();
    if (controlsRef.current) {
      controlsRef.current.target.copy(center);
    }
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!rendererRef.current || !cameraRef.current || !currentMeshRef.current || !raycasterRef.current) return;

    const rect = rendererRef.current.domElement.getBoundingClientRect();
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const intersects = raycasterRef.current.intersectObject(currentMeshRef.current);

    const tooltip = tooltipRef.current;
    if (tooltip) {
        if (intersects.length > 0) {
            const point = intersects[0].point;
            tooltip.style.display = "block";
            tooltip.style.left = `${event.clientX + 15}px`;
            tooltip.style.top = `${event.clientY + 15}px`;
            tooltip.innerHTML = `X: ${point.x.toFixed(2)}<br>Y: ${point.y.toFixed(2)}<br>Z: ${point.z.toFixed(2)}`;
        } else {
            tooltip.style.display = "none"; // Ocultar el tooltip si no hay intersección
        }
    }
}, []);



  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.OrthographicCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;

    const init = () => {
      // Crear la escena
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xeeeeee);
      sceneRef.current = scene;

      // Crear la cámara
      const aspect = (window.innerWidth - 80) / window.innerHeight;
      camera = new THREE.OrthographicCamera(-200 * aspect, 200 * aspect, 200, -200, 0.1, 10000);
      camera.position.set(300, 300, 300);
      camera.lookAt(0, 0, 0);
      cameraRef.current = camera;

      // Crear el renderer
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth - 80, window.innerHeight);
      rendererRef.current = renderer;

      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }

      // Agregar controles orbitales
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.screenSpacePanning = false;
      controls.maxPolarAngle = Math.PI / 2;
      controlsRef.current = controls;

      // Agregar luces
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      // Cargar layer por defecto
      loadLayer("mesh.json");

      animate();
      window.addEventListener("mousemove", handleMouseMove);
    };


    const animate = () => {
      requestAnimationFrame(animate);
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    init();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, [handleMouseMove]);

  return (
    <div className="mesh" style={{ display: "flex" }}>
      <div
        id="controls"
        style={{
          width: "80px",
          padding: "10px",
          backgroundColor: "#f0f0f0",
          fontFamily: "Arial, sans-serif",
          fontSize: "10px",
        }}
      >
        <h3>Layers</h3>
        <button onClick={() => loadLayer("mesh.json")}>Load mesh.json</button>
        <button onClick={() => loadLayer("Amesh.json")}>Load Amesh.json</button>
      </div>
      <div
        ref={containerRef}
        style={{ width: 'calc(100% - 80px)', height: '100vh' }} // Establecer el tamaño del contenedor
      />
      <div ref={containerRef} />
      <div
        ref={tooltipRef}
        className="tooltip"
        style={{
          display: "none",
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          padding: "5px",
          borderRadius: "5px",
          fontSize: "10px",
          pointerEvents: "none",
          zIndex: 10, // Asegurar que el tooltip esté por encima del canvas
        }}
      />

    </div>
  );
};

export default LayersApp;
