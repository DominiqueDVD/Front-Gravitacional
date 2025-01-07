import React, { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// import algo from './data'
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader'
import Loader from '../usabilidad/Loader'
import { createProject } from '../../services/ProjectService';
import { Project } from '../../types/types';
import { Coordinate } from '../../types/types';
import ioReq from "./io_req.json"
import solveReq from "./solve_req.json"
import SceneConfig from './SceneConfig';
import { BoxHelper } from 'three';

const API_URL = process.env.REACT_APP_BACKEND_URL;
const RHINO_URL = process.env.REACT_APP_RHINO_COMPUTE_URL;
const RHINO_COMPUTE_KEY = process.env.REACT_APP_RHINO_COMPUTE_KEY;

const RhinoViewer = () => {
   // const [rhinoIoRes, setRhinoIoRes] = useState<string>(sessionStorage.getItem('rhino-io-res') || "");
   // const [rhinoSolveRes, setRhinoSolveRes] = useState<string>(sessionStorage.getItem('rhino-solve-res') || "");
   const [loadedObject, setLoadedObject] = useState<THREE.Object3D | null>(null);
   const [objetoListo, setObjetoListo] = useState(false);

   const [mensajeEstado, setMensajeEstado] = useState("");

   const [rhinoIoRes, setRhinoIoRes] = useState<string>("");
   const [rhinoSolveRes, setRhinoSolveRes] = useState<string>("");

   // const mountRef = useRef<HTMLDivElement>(null);

   const [isLoading, setIsLoading] = useState(true); // Estado de carga
   const [view, setView] = useState<"iso" | "top">("iso");

   const [coordenadas, setCoordenadas] = useState<string>(sessionStorage.getItem("coordenadas") || JSON.stringify([{ "lat": -36.6045, "lng": -72.1038 }, { "lat": -36.6067, "lng": -72.1078 }, { "lat": -36.6098, "lng": -72.1009 }]));
   const [centroide, setCentroide] = useState<string>(sessionStorage.getItem("centroide") || JSON.stringify({ "lat": -36.6066, "lng": -72.1034 }));

   const groupRef = useRef<THREE.Group>(null);;
   const ioReqContent = { ...ioReq.Content };
   const solveReqContent = { ...solveReq.content };

   // Configuración de la escena Three.js
   // const scene = new THREE.Scene();
   // scene.background = new THREE.Color(0.9, 0.9, 0.9);
   // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
   // const renderer = new THREE.WebGLRenderer({ antialias: true });

   // // Agregar luces
   // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Luz ambiental
   // scene.add(ambientLight);

   // const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Luz direccional
   // directionalLight.position.set(0, 0, 1000).normalize(); // Cambiado a (0, 0, 1000)
   // scene.add(directionalLight);

   // const pointLight = new THREE.PointLight(0xffffff, 1, 1500); // Luz puntual
   // pointLight.position.set(0, 0, 1000); // Cambiado a (0, 0, 1000)
   // scene.add(pointLight);

   // Configurar controles orbitales
   // const controls = new OrbitControls(camera, renderer.domElement);
   // controls.enableDamping = true; // para un movimiento más suave
   // controls.dampingFactor = 0.25;
   // controls.screenSpacePanning = false;

   // renderer.setSize(window.innerWidth, window.innerHeight);
   // renderer.setPixelRatio(window.devicePixelRatio);

   // if (mountRef.current) {
   //    mountRef.current.appendChild(renderer.domElement);
   // }

   const loader = new Rhino3dmLoader()
   loader.setLibraryPath('https://unpkg.com/rhino3dm@8.0.0-beta3/')

   // useEffect(() => {
   //    // Agregar el renderer al DOM
   //    if (mountRef.current) {
   //       mountRef.current.appendChild(renderer.domElement);
   //    }

   //    // Cleanup al desmontar el componente
   //    return () => {
   //       try {
   //          mountRef.current?.removeChild(renderer.domElement);
   //       } catch (e) {
   //          setMensajeEstado("Error al montar la escena.")
   //          console.log("Error al limpiar el renderer:", e);
   //       }
   //    };
   // });

   useEffect(() => {
      const timer = setTimeout(() => {
         const fetchIO = async () => {
            console.log(`Rhino IO Res ${rhinoIoRes}`)
            // if (!rhinoIoRes || rhinoIoRes == 'undefined' || rhinoIoRes == '' || rhinoIoRes == null) {

            setIsLoading(true);
            setMensajeEstado("Buscando entradas del archivo...");

            // console.log(`Rhino IO Res ${rhinoIoRes}`)
            const myHeaders = new Headers();
            myHeaders.append("RhinoComputeKey", RHINO_COMPUTE_KEY as string);
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify(ioReqContent);

            const requestOptions: RequestInit = {
               method: "POST",
               headers: myHeaders,
               body: raw,
               redirect: "follow"
            };

            let result1 = ""
            try {
               await fetch(`${RHINO_URL}/io`, requestOptions)
                  .then((response) => response.json())
                  .then((result) => result1 = JSON.stringify(result))
                  .catch((error) => console.error(error));

               console.log(`Resultado 1: ${result1}`);
               setRhinoIoRes(result1);
               // sessionStorage.setItem('rhino-io-res', result1);
               console.log(`Rhino IO Res ${rhinoIoRes}`)
               // if (rhinoIoRes && rhinoIoRes !== 'undefined' && rhinoIoRes !== '' && rhinoIoRes !== null) {
               //    loadGeometry();
               // }

            } catch (error) {
               setIsLoading(false);
               setMensajeEstado("Error al cargar entradas y salidas: " + error)
               console.error('Error al cargar entradas y salidas:', error);
            }
            // } else if (rhinoIoRes && rhinoIoRes !== 'undefined' && rhinoIoRes !== '' && rhinoIoRes !== null) {
            //    loadGeometry();
            // }
         }
         fetchIO();
      }, 3000);
      return () => clearTimeout(timer);
   }, []);

   useEffect(() => {
      // Función para cargar la geometría desde Rhino Compute
      const fetchGeometry = async () => {
         // if (!rhinoSolveRes || rhinoSolveRes == 'undefined' || rhinoSolveRes == '' || rhinoSolveRes == null) {
         if (rhinoIoRes) {
            setIsLoading(true);
            setMensajeEstado("Calculando geometría del terreno...");

            const myHeaders = new Headers();
            myHeaders.append("RhinoComputeKey", RHINO_COMPUTE_KEY as string);
            myHeaders.append("Content-Type", "application/json");

            // const raw = rhinoIoRes;
            // console.log(raw)
            // let coordenadas = sessionStorage.getItem("coordenadas");
            // let centroide = sessionStorage.getItem("centroide");

            // coordenadas = coordenadas && coordenadas.trim() !== "" ? coordenadas : "[{ lat: -36.6045, lng: -72.1038 },{ lat: -36.6067, lng: -72.1078 },{ lat: -36.6098, lng: -72.1009 },]";
            // centroide = centroide && centroide.trim() !== "" ? centroide : "{ lat: -36.6066, lng: -72.1034 }";

            console.log("Coordenadas: " + coordenadas);
            console.log("Centroide: " + centroide);
            if (!coordenadas || coordenadas.trim() == "") {
               console.log("Faltan las coordenadas");
               setIsLoading(false)
               setMensajeEstado("Ausencia de coordenadas")
               return;
            }
            if (!centroide || centroide.trim() == "") {
               console.log("Falta el centroide");
               setIsLoading(false)
               setMensajeEstado("Ausencia de centroide")
               return;
            }

            const cacheKey = JSON.parse(rhinoIoRes).CacheKey;

            // Recorre el array y busca los objetos con ParamName
            solveReqContent.values.forEach((value: any) => {
               if (value.ParamName === "coordinates") {
                  // Modifica el valor de "coordinates"
                  value.InnerTree["{0}"] = [
                     {
                        type: "System.String",
                        data: coordenadas,
                     },
                  ];
               } else if (value.ParamName === "coordinatesCenter") {
                  // Modifica el valor de "coordinatesCenter"
                  value.InnerTree["{0}"] = [
                     {
                        type: "System.String",
                        data: centroide,
                     },
                  ];
               }
            });

            const raw = JSON.stringify({
               "absolutetolerance": 0.01,
               "angletolerance": 1.0,
               "modelunits": "Meters",
               "dataversion": 8,
               "algo": null,
               "pointer": cacheKey,
               "cachesolve": true,
               "values": [
                  {
                     "ParamName": "Radius",
                     "InnerTree": {
                        "{0}": [
                           {
                              "type": "System.Double",
                              "data": "3"
                           }
                        ]
                     }
                  },
                  {
                     "ParamName": "Count",
                     "InnerTree": {
                        "{0}": [
                           {
                              "type": "System.Double",
                              "data": "10"
                           }
                        ]
                     }
                  },
                  {
                     "ParamName": "Length",
                     "InnerTree": {
                        "{0}": [
                           {
                              "type": "System.Double",
                              "data": "5"
                           }
                        ]
                     }
                  },
                  {
                     "ParamName": "projectId",
                     "InnerTree": {
                        "{0}": [
                           {
                              "type": "System.String",
                              "data": "1"
                           }
                        ]
                     }
                  },
                  {
                     "ParamName": "projectName",
                     "InnerTree": {
                        "{0}": [
                           {
                              "type": "System.String",
                              "data": "1"
                           }
                        ]
                     }
                  },
                  {
                     "ParamName": "projectDescription",
                     "InnerTree": {
                        "{0}": [
                           {
                              "type": "System.String",
                              "data": "1"
                           }
                        ]
                     }
                  },
                  {
                     "ParamName": "userId",
                     "InnerTree": {
                        "{0}": [
                           {
                              "type": "System.String",
                              "data": "1"
                           }
                        ]
                     }
                  },
                  {
                     "ParamName": "coordinatesCenter",
                     "InnerTree": {
                        "{0}": [
                           {
                              "type": "System.String",
                              "data": centroide
                           }
                        ]
                     }
                  },
                  {
                     "ParamName": "coordinates",
                     "InnerTree": {
                        "{0}": [
                           {
                              "type": "System.String",
                              "data": coordenadas
                           }
                        ]
                     }
                  },
                  {
                     "ParamName": "uso",
                     "InnerTree": {
                        "{0}": [
                           {
                              "type": "System.String",
                              "data": "Área pavimentada"
                           }
                        ]
                     }
                  },
                  {
                     "ParamName": "tipo",
                     "InnerTree": {
                        "{0}": [
                           {
                              "type": "System.String",
                              "data": "Suelo arcilloso"
                           }
                        ]
                     }
                  },
                  {
                     "ParamName": "humedad",
                     "InnerTree": {
                        "{0}": [
                           {
                              "type": "System.String",
                              "data": "Moderado"
                           }
                        ]
                     }
                  },
                  {
                     "ParamName": "infiltracion",
                     "InnerTree": {
                        "{0}": [
                           {
                              "type": "System.String",
                              "data": "arcilla arenosa"
                           }
                        ]
                     }
                  },
                  {
                     "ParamName": "almacenamiento",
                     "InnerTree": {
                        "{0}": [
                           {
                              "type": "System.String",
                              "data": "limo"
                           }
                        ]
                     }
                  }
               ],
               "warnings": [],
               "errors": []
            }

            );
            console.log("RAW: ");
            console.log(JSON.stringify(raw, null, '\t'));

            const requestOptions: RequestInit = {
               method: "POST",
               headers: myHeaders,
               body: raw,
               redirect: "follow"
            };

            let result2 = ""
            try {
               await fetch(`${RHINO_URL}/grasshopper`, requestOptions)
                  .then((response) => response.json())
                  .then((result) => result2 = JSON.stringify(result))
                  .catch((error) => console.error(error));

               setRhinoSolveRes(result2);
               console.log(result2);
               // sessionStorage.setItem('rhino-solve-res', result2);

               // if (rhinoSolveRes && rhinoSolveRes !== 'undefined' && rhinoSolveRes !== '' && rhinoSolveRes !== null) {
               //    collectResults();
               // }

            } catch (error) {
               console.error('Error al cargar la geometría:', error);
               setIsLoading(false);
               setMensajeEstado("Error al cargar la geometría" + error);
            }
            // } else if (rhinoSolveRes && rhinoSolveRes !== 'undefined' && rhinoSolveRes !== '' && rhinoSolveRes !== null) {
            //    collectResults();
            // }
         };
      }
      fetchGeometry();
   }, [rhinoIoRes]);

   useEffect(() => {
      const timer = setTimeout(() => {
         const fetchResults = async () => {
            console.log("Collect results")
            setIsLoading(true);
            setMensajeEstado("Generando la escena 3D...");

            try {
               fetch(`${API_URL}/rhino/compute`, {
                  method: 'POST',
                  headers: {
                     'Content-Type': 'application/json'
                  },
                  body: rhinoSolveRes
               })
                  .then(response => {
                     if (!response.ok) {
                        setIsLoading(false);
                        setMensajeEstado("Error en la respuesta: " + response.statusText + " " + response.status);
                        return response.json().then(err => {
                           throw new Error(err.message);
                        });
                     }
                     return response.arrayBuffer();  // Recibirlo como ArrayBuffer
                  })
                  .then(buffer => {
                     console.log('ArrayBuffer Length:', buffer.byteLength);  // Debería ser mayor que 0
                     console.log('Buffer: ', buffer);

                     // Usar loader.parse con el buffer
                     loader.parse(buffer, (object) => {
                        console.log(object)
                        setLoadedObject(object);
                        setObjetoListo(true);
                        setIsLoading(false);
                        setMensajeEstado("");

                        // scene.add(object);
                        // camera.position.set(0, 0, 1000);
                        // camera.rotation.y = Math.PI / 6;
                        // animate();
                        // renderer.render(scene, camera);
                     }, (error) => {
                        console.error('Error cargando el objeto 3DM:', error);
                        setIsLoading(false);
                        setMensajeEstado("Error cargando el objeto 3D: " + error.message)
                     });
                  })
                  .catch(error => console.error('Error:', error));
            } catch (error) {
               console.log(error);
               setIsLoading(false);
               setMensajeEstado("Error decodificando archivo: " + error);
            }
         }
         fetchResults();
      }, 3000);
      return () => clearTimeout(timer);
   }, [rhinoSolveRes]);

   const toggleView = () => setView((prev) => (prev === "iso" ? "top" : "iso"));

   // useEffect(() => {
   //    // Bucle de animación
   //    const animate = () => {
   //       // requestAnimationFrame(animate);
   //       // controls.update(); // Actualiza los controles
   //       renderer.render(scene, camera);
   //       console.log("Iniciando animación...");
   //       requestAnimationFrame(animate);
   //    };

   //    animate(); // Iniciar animación

   //    // Cleanup del ciclo de animación si es necesario
   //    return () => {
   //       console.log("Terminando animación...");
   //    };
   // });

   // loadIO();



   // const handleGuardarProyecto = () => {
   //    let proyecto;
   //    proyecto = processData(JSON.parse(rhinoSolveRes));
   //    createProject(proyecto);
   // }

   // const processData = (data: any) => {
   //    let coordenadas = JSON.parse(sessionStorage.getItem("coordenadas") ?? '{}');
   //    let datos: Project = {
   //       ID: "12345",
   //       name: "Proyecto de Prueba",
   //       description: "Este es un proyecto de prueba con datos placeholder.",
   //       userId: "user_001",
   //       createdAt: new Date(Date.now()),
   //       updatedAt: new Date(Date.now()),
   //       coordinates: coordenadas,
   //       coordinatesCenter: { lat: -36.6067, lng: -72.1035 },
   //       thumbnail: "https://via.placeholder.com/150", // Imagen de prueba
   //       lineas: data.values.find((item: any) => item.ParamName === "lines")?.InnerTree || { type: "LineString", data: [] },
   //       malla: data.values.find((item: any) => item.ParamName === "mesh")?.InnerTree || { type: "Mesh", data: [] },
   //       laderas: data.values.find((item: any) => item.ParamName === "hillsides")?.InnerTree || { type: "Polygon", data: [] },
   //       suelos: { type: "Soil", data: [] },
   //       matriz: { type: "Matrix", data: [[0, 1], [1, 0]] },
   //    };
   //    console.log(datos);
   //    return {
   //       datos
   //       // thumbnail: data.thumbnail || "https://via.placeholder.com/150", // Imagen predeterminada
   //       // lines: data.values.find((item: any) => item.ParamName === "lines")?.InnerTree || {},
   //       // mesh: data.values.find((item: any) => item.ParamName === "mesh")?.InnerTree || {},
   //       // climatic: data.values.find((item: any) => item.ParamName === "climatic")?.InnerTree || {},
   //       // soils: data.values.find((item: any) => item.ParamName === "soils")?.InnerTree || {},
   //       // matrix: data.values.find((item: any) => item.ParamName === "matrix")?.InnerTree || {},
   //       // json: data.values.find((item: any) => item.ParamName === "json")?.InnerTree || {},
   //       // content: data.values.find((item: any) => item.ParamName === "Content")?.InnerTree || {},
   //    };
   // };

   return (
      <div>
         {/* <div>
            {JSON.stringify(ioReqContent)}
         </div>
         {rhinoSolveRes ? (
            <button className='btn btn-success' onClick={handleGuardarProyecto}>Guardar proyecto</button>
         ) : <div></div>
         }
         {isLoading ? (
            <Loader />
         ) : (
            <div ref={mountRef} style={{ display: isLoading ? 'none' : 'block' }}>
            </div>
         )} */}
         {isLoading ? (
            <div>
               <Loader />
            </div>
         ) : (

            <Suspense>

               {objetoListo && (
                  <div>
                     <button className="btn btn-primary" onClick={toggleView}>
                        Cambiar a {view === "iso" ? "Vista de Planta" : "Vista Isométrica"}
                     </button>
                     <Canvas
                        orthographic={true}
                        camera={{ position: [500, 1000, 1000], zoom: 0.5 }}
                        style={{ width: window.innerWidth, height: window.innerHeight, minHeight: "400px" }}
                     >
                        <axesHelper args={[100]} />
                        <ambientLight intensity={5} />
                        <pointLight position={[0, 0, 2000]} />
                        {/* Configuración de la escena */}
                        <SceneConfig />

                        {/* Controles de órbita */}
                        {view == "iso" ? (
                           <OrbitControls
                              enableDamping={true}
                              dampingFactor={0.25}
                              minPolarAngle={0}
                              maxPolarAngle={Math.PI / 2}
                              enablePan={false}
                              enableRotate={true}
                              screenSpacePanning={false}
                              enableZoom={true} // Habilitar zoom
                              target={[0, 0, 0]}
                           />) : (
                           <OrbitControls
                              enableDamping={true}
                              dampingFactor={0.25}
                              minPolarAngle={0}
                              maxPolarAngle={0}
                              enablePan={false}
                              enableRotate={true}
                              screenSpacePanning={false}
                              enableZoom={true} // Habilitar zoom
                              target={[0, 0, 0]}
                           />
                        )
                        }

                        {/* Renderiza el objeto cuando esté cargado */}
                        {loadedObject && (
                           <group ref={groupRef} rotation={[Math.PI / 2, Math.PI, Math.PI]}>
                              <primitive object={loadedObject} />
                           </group>
                        )}
                     </Canvas>
                  </div>

               )}
            </Suspense>
         )
         }
         < h5 style={{ textAlign: "center" }}>{mensajeEstado}</h5>

         <div className='card p-3'>
            <h3>Coordenadas</h3>
            <table className='table'>
               <thead>
                  <tr>
                     <th>Latitud</th>
                     <th>Longitud</th>
                  </tr>
               </thead>
               <tbody>
                  {(JSON.parse(coordenadas) as Coordinate[]).map((coord, index) => (
                     <tr key={index}>
                        <td>{coord.lat}</td>
                        <td>{coord.lng}</td>
                     </tr>
                  ))}
               </tbody>
            </table>

            <h3>Centroide</h3>
            <table className='table'>
               <thead>
                  <tr>
                     <th>Latitud</th>
                     <th>Longitud</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>{JSON.parse(centroide).lat}</td>
                     <td>{JSON.parse(centroide).lng}</td>
                  </tr>

               </tbody>
            </table>
         </div>
      </div >
   );

};

export default RhinoViewer;