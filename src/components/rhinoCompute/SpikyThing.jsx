import React, { useState } from 'react';

const SpikyThing = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const data = {
        definition: 'BranchNodeRnd.gh',
        inputs: {
            Count: 10,
            Radius: 5,
            Length: 3
        }
    };

    const compute = async () => {
        const request = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        };

        const url = 'https://rhinoappserver-57ee79268c37.herokuapp.com/solve';

        try {
            const response = await fetch(url, request);

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            setResult(result);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Compute Spiky Thing</h2>
            <button onClick={compute}>Run Compute</button>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {result && (
                <div>
                    <h3>Result:</h3>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default SpikyThing;


// import React, { useState, useEffect } from 'react';
// import RhinoViewer from './RhinoViewer';
// import algo from './data'

// import React, { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';
// import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader'
// import rhino3dm from 'rhino3dm'

// function SpikyThing() {
//     const [meshData, setMeshData] = useState(null);

//     useEffect(() => {
//         const myHeaders = new Headers();
//         myHeaders.append("RhinoComputeKey", "gravitacional");
//         myHeaders.append("Content-Type", "application/json");

//         const loadIO = async () => {

//             try {
//                 const myHeaders = new Headers();
//                 myHeaders.append("RhinoComputeKey", "gravitacional");
//                 myHeaders.append("Content-Type", "application/json");

//                 const raw = JSON.stringify({
//                     "absolutetolerance": 0.001,
//                     "angletolerance": 1,
//                     "modelunits": "Millimeters",
//                     "dataversion": 8,
//                     "algo": algo,
//                     "pointer": null,
//                     "cachesolve": false,
//                     "values": [],
//                     "warnings": [],
//                     "errors": []
//                 });

//                 const requestOptions = {
//                     method: "POST",
//                     headers: myHeaders,
//                     body: raw,
//                     redirect: "follow"
//                 };

//                 fetch("http://rhino-compute-loadbalancer-824415098.us-east-1.elb.amazonaws.com/io", requestOptions)
//                     .then((response) => response.text())
//                     .then((result) => console.log(result))
//                     .catch((error) => console.error(error));

//                 // loadGeometry();
//             } catch (error) {
//                 console.error('Error al cargar entradas y salidas:', error);
//             }

//         }

//         // Función para cargar la geometría desde Rhino Compute
//         const loadGeometry = async () => {

//             const raw = JSON.stringify({
//                 "absolutetolerance": 0.001,
//                 "angletolerance": 1,
//                 "modelunits": "Millimeters",
//                 "dataversion": 7,
//                 "algo": null,
//                 "pointer": "md5_E1E7CE4C192A75F390CE260306FDFF7C",
//                 "cachesolve": true,
//                 "values": [
//                     {
//                         "ParamName": "Radius",
//                         "InnerTree": {
//                             "{0}": [
//                                 {
//                                     "type": "System.Double",
//                                     "data": "9.0"
//                                 }
//                             ]
//                         }
//                     },
//                     {
//                         "ParamName": "Count",
//                         "InnerTree": {
//                             "{0}": [
//                                 {
//                                     "type": "System.Double",
//                                     "data": "77.0"
//                                 }
//                             ]
//                         }
//                     },
//                     {
//                         "ParamName": "Length",
//                         "InnerTree": {
//                             "{0}": [
//                                 {
//                                     "type": "System.Double",
//                                     "data": "5.0"
//                                 }
//                             ]
//                         }
//                     }
//                 ],
//                 "warnings": [],
//                 "errors": []
//             });

//             const requestOptions = {
//                 method: "POST",
//                 headers: myHeaders,
//                 body: raw,
//                 redirect: "follow"
//             };

//             const fetchData = async () => {
//                 // Aquí se haría la solicitud al endpoint /grasshopper
//                 const response = await fetch("http://rhino-compute-loadbalancer-824415098.us-east-1.elb.amazonaws.com/grasshopper", requestOptions);
//                 const result = await response.json();

//                 // Aquí tomas el primer valor de la malla que recibes
//                 const meshData = result.values[0].InnerTree['{0}'][0];
//                 setMeshData(meshData);
//             };
//             fetchData();
//         }

//         loadIO();
//     }, []);

//     return (
//         <div>
//             {meshData ? <RhinoViewer meshData={meshData} /> : <p>Loading...</p>}
//         </div>
//     );
// }

// export default SpikyThing;